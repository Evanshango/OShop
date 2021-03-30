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
exports.deleteProduct = exports.updateProduct = exports.fetchProduct = exports.addProduct = exports.fetchProducts = void 0;
const product_1 = require("../models/product");
const bad_request_error_1 = require("../errors/bad-request-error");
const file_handler_1 = require("../helpers/file-handler");
const not_found_error_1 = require("../errors/not-found-error");
const mongoose_1 = __importDefault(require("mongoose"));
const checkProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new bad_request_error_1.BadRequestError('Invalid product ID');
    return product_1.Product.findById(id);
});
const fetchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.Product.find({}).sort('-createdAt');
    res.send(products);
});
exports.fetchProducts = fetchProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, stock, section, category, discount, discountPrice, finalPrice, description, featured } = JSON.parse(JSON.stringify(req.body));
    if (!mongoose_1.default.Types.ObjectId.isValid(section))
        throw new bad_request_error_1.BadRequestError('Please select a section');
    if (!mongoose_1.default.Types.ObjectId.isValid(category))
        throw new bad_request_error_1.BadRequestError('Please select a category');
    if (req.files.length === 0)
        throw new bad_request_error_1.BadRequestError('Product images not found');
    const createdBy = req['user'].id;
    const images = yield file_handler_1.FileHandler.upload(req.files, name);
    const product = product_1.Product.build({
        name, price, stock, section, category, discount, discountPrice,
        finalPrice, description, images, createdBy, featured
    });
    yield product.save();
    const newProduct = yield product_1.Product.findById(product.id);
    return res.send(newProduct);
});
exports.addProduct = addProduct;
const fetchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield checkProduct(req);
    if (!product)
        throw new not_found_error_1.NotFoundError('Product');
    res.send(product);
});
exports.fetchProduct = fetchProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield checkProduct(req);
    if (!product)
        throw new not_found_error_1.NotFoundError('Product');
    const { price, discount, name, stock, featured, section, category, description } = req.body;
    const updateParams = { price, discount, name, stock, featured, section, description, category };
    const update = yield product_1.Product.findByIdAndUpdate(product.id, updateParams, { new: true, runValidators: true });
    console.log(update);
    return res.send(update);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield checkProduct(req);
    if (!product)
        throw new not_found_error_1.NotFoundError('Product');
    const result = yield file_handler_1.FileHandler.delete(product.images, product.name);
    if (Object.keys(result[0]).length === 0) {
        yield product_1.Product.findByIdAndDelete(product.id);
        return res.status(200).send({
            message: 'Product deleted'
        });
    }
    else {
        throw new bad_request_error_1.BadRequestError('An error occurred deleting the product');
    }
});
exports.deleteProduct = deleteProduct;
