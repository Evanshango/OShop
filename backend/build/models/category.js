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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const section_1 = require("./section");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    section: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Section' },
    slug: {
        type: String
    },
    productCount: {
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
        }
    }
});
categorySchema.statics.build = (attrs) => (new Category(attrs));
categorySchema.statics.countCategories = function (sectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const ct = yield this.aggregate([
            {
                $match: {
                    section: sectionId
                }
            },
            {
                $group: {
                    _id: '$section',
                    nCount: { $sum: 1 },
                }
            }
        ]);
        if (ct.length > 0) {
            yield section_1.Section.findByIdAndUpdate(sectionId, {
                categoryCount: ct[0].nCount
            });
        }
        else {
            yield section_1.Section.findByIdAndUpdate(sectionId, {
                categoryCount: 0
            });
        }
    });
};
categorySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        this.set('slug', yield slugify_1.default(this.name, { lower: true }));
        next();
    });
});
categorySchema.post('save', function (doc, next) {
    // @ts-ignore
    this.constructor.countCategories(this.section);
    next();
});
categorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'section',
        select: 'name'
    });
    next();
});
const Category = mongoose_1.model('Category', categorySchema);
exports.Category = Category;
