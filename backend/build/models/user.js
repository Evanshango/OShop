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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const password_manager_1 = require("../helpers/password-manager");
const constants_1 = require("../helpers/constants");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String, required: true, unique: true, lowercase: true, trim: true
    },
    firstName: {
        type: String, required: true, trim: true
    },
    lastName: {
        type: String, required: true, trim: true
    },
    fullName: {
        type: String,
    },
    avatar: {
        type: String
    },
    verified: {
        type: Boolean, required: true
    },
    method: {
        type: String, enum: Object.values(constants_1.AUTH_METHOD), required: true
    },
    role: {
        type: String, enum: Object.values(constants_1.USER_ROLE), default: constants_1.USER_ROLE.USER
    },
    password: {
        type: String
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});
userSchema.statics.build = (attrs) => (new User(attrs));
userSchema.pre('save', function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const hashedPassword = yield password_manager_1.PasswordManager.toHash(this.get('password'));
            this.set('password', hashedPassword);
        }
        done();
    });
});
const User = mongoose_1.model('User', userSchema);
exports.User = User;
