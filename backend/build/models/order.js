"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../helpers/constants");
const product_1 = require("./product");
const orderSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    address: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Address', required: true
    },
    amount: {
        type: Number, required: true
    },
    items: [
        {
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
            price: {
                type: Number, required: true
            },
            units: {
                type: Number, required: true
            },
            totalPrice: {
                type: Number, required: true
            },
            _id: false
        }
    ],
    paymentStatus: {
        type: String,
        enum: Object.values(constants_1.PAYMENT_STATUS), required: true
    },
    paymentMethod: {
        type: String,
        enum: Object.values(constants_1.PAYMENT_METHOD), required: true
    },
    orderStatus: { type: String, enum: Object.values(constants_1.ORDER_STATUS), default: constants_1.ORDER_STATUS.ORDERED },
    isCompleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.updatedAt;
        }
    }
});
orderSchema.statics.build = (attrs) => (new Order(attrs));
orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'customer',
        select: 'fullName'
    }).populate({
        path: 'items.product',
        select: 'name images description createdBy'
    }).populate({
        path: 'address',
        select: '-user -createdAt'
    });
    next();
});
orderSchema.post('save', function (doc, next) {
    // @ts-ignore
    this.items.forEach((item) => __awaiter(this, void 0, void 0, function* () {
        const prod = yield product_1.Product.findById(item.product);
        if (prod) {
            yield product_1.Product.findByIdAndUpdate(prod.id, { stock: prod.stock - item.units });
        }
    }));
    next();
});
const Order = mongoose_1.model('Order', orderSchema);
exports.Order = Order;
