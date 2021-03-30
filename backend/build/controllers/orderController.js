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
exports.cancelOrder = exports.updateOrder = exports.addOrder = exports.fetchUserOrders = exports.fetchOrders = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bad_request_error_1 = require("../errors/bad-request-error");
const order_1 = require("../models/order");
const cart_1 = require("../models/cart");
const fetchOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.Order.find({});
    return res.send(orders);
});
exports.fetchOrders = fetchOrders;
const fetchUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const orders = yield order_1.Order.find({ customer: user.id }).sort('-createdAt');
    return res.send(orders);
});
exports.fetchUserOrders = fetchUserOrders;
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const { amount, items, address, paymentMethod, paymentStatus } = body;
    if (!mongoose_1.default.Types.ObjectId.isValid(address))
        throw new bad_request_error_1.BadRequestError('An address is required');
    const order = order_1.Order.build({ customer: user.id, address, amount, items, paymentMethod, paymentStatus });
    yield order.save();
    const toDelete = yield cart_1.Cart.findOne({ customer: user.id });
    if (toDelete) {
        yield cart_1.Cart.findByIdAndDelete(toDelete.id);
    }
    return res.send(yield order_1.Order.findById(order.id));
});
exports.addOrder = addOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateOrder = updateOrder;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.cancelOrder = cancelOrder;
