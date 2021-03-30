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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../helpers/constants");
const addressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: { type: Number, required: true, trim: true },
    addressType: { type: String, enum: Object.values(constants_1.ADDRESS_TYPE), required: true },
    state: { type: String, required: true, trim: true },
    cityTown: { type: String, required: true, trim: true },
    postalCode: { type: Number, required: true, trim: true },
    name: { type: String, required: true, trim: true },
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
addressSchema.statics.build = (attrs) => (new Address(attrs));
addressSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'fullName email'
    });
    next();
});
const Address = mongoose_1.model('Address', addressSchema);
exports.Address = Address;
