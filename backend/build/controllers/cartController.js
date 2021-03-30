"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.addToCart = exports.fetchCart = void 0;
const cart_1 = require("../models/cart");
const not_found_error_1 = require("../errors/not-found-error");
const not_authorized_error_1 = require("../errors/not-authorized-error");
const mongoose_1 = __importDefault(require("mongoose"));
const bad_request_error_1 = require("../errors/bad-request-error");
const fetchCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const cart = yield cart_1.Cart.findOne({ customer: user.id });
    returnUserCart(cart, res);
});
exports.fetchCart = fetchCart;
const runUpdate = (condition, updateData) => __awaiter(void 0, void 0, void 0, function* () { return cart_1.Cart.findOneAndUpdate(condition, updateData, { new: true }); });
const returnUserCart = (cart, res) => {
    let cartItems = {};
    if (cart) {
        cart.items.forEach((item) => {
            const { units, product: { name, id, images, finalPrice } } = item;
            cartItems[id] = {
                id, name, images, finalPrice, units
            };
        });
    }
    res.send(cartItems);
};
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { items, sync } = req.body;
    const existingItem = yield cart_1.Cart.findOne({ customer: user.id });
    if (existingItem) {
        let promiseArray = [];
        items.forEach((cartItem) => {
            const item = existingItem.items.find((ex) => ex.product.id === cartItem.id);
            let condition, update;
            if (item) {
                condition = { customer: user.id, 'items.product': cartItem.id };
                update = {
                    $set: {
                        'items.$': { product: cartItem.id, units: !sync ? item.units + cartItem.units : item.units }
                    }
                };
            }
            else {
                condition = { customer: user.id };
                update = {
                    $push: {
                        items: { product: cartItem.id, units: cartItem.units }
                    }
                };
            }
            promiseArray.push(runUpdate(condition, update));
        });
        yield Promise.all(promiseArray);
        returnUserCart(yield cart_1.Cart.findOne({ customer: user.id }), res);
    }
    else {
        let itemArray = [];
        items.map((item) => {
            const prod = { product: item.id, units: item.units };
            itemArray.push(prod);
        });
        const cart = cart_1.Cart.build({
            customer: user.id,
            items: itemArray
        });
        const newItem = yield cart.save();
        returnUserCart(yield cart_1.Cart.findById(newItem.id), res);
    }
});
exports.addToCart = addToCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
        throw new bad_request_error_1.BadRequestError('Invalid item ID');
    const existing = yield cart_1.Cart.findOne({ customer: user.id });
    if (!existing)
        throw new not_found_error_1.NotFoundError('Cart item not found');
    if (user.id != existing.customer)
        throw new not_authorized_error_1.NotAuthorizedError();
    const itemsArray = existing.items;
    const index = itemsArray.indexOf(existing.items.find((prod) => prod.product._id == req.params.id));
    if (index > -1) {
        itemsArray.splice(index, 1);
    }
    yield cart_1.Cart.findByIdAndUpdate(existing.id, { items: itemsArray }, { new: true });
    return res.send({ id: req.params.id });
});
exports.deleteCart = deleteCart;
