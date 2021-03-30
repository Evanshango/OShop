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
exports.Section = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const sectionSchema = new mongoose_1.Schema({
    name: {
        type: String, required: true, trim: true
    },
    slug: {
        type: String
    },
    categoryCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});
sectionSchema.statics.build = (attrs) => (new Section(attrs));
sectionSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        this.set('slug', yield slugify_1.default(this.name, { lower: true }));
        next();
    });
});
const Section = mongoose_1.model('Section', sectionSchema);
exports.Section = Section;
