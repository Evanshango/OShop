import mongoose, {Document, HookNextFunction, Model, model, Schema} from "mongoose";
import slugify from "slugify";
import {Section} from "./section";

interface ICategoryAttrs {
    name: string
    section: string
}

interface ICategoryDoc extends Document {
    name: string
    slug: string
    productCount: number
}

interface ICategoryModel extends Model<ICategoryDoc> {
    build(attrs: ICategoryAttrs): ICategoryDoc
}

const categorySchema = new Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    section: {type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
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
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

categorySchema.statics.build = (attrs: ICategoryAttrs) => (new Category(attrs))

categorySchema.statics.countCategories = async function (sectionId) {
    const ct = await this.aggregate([
        {
            $match: {
                section: sectionId
            }
        },
        {
            $group: {
                _id: '$section',
                nCount: {$sum: 1},
            }
        }
    ])
    if (ct.length > 0) {
        await Section.findByIdAndUpdate(sectionId, {
            categoryCount: ct[0].nCount
        })
    } else {
        await Section.findByIdAndUpdate(sectionId, {
            categoryCount: 0
        })
    }
}

categorySchema.pre('save', async function (next: HookNextFunction) {
    // @ts-ignore
    this.set('slug', await slugify(this.name, {lower: true}))
    next()
})

categorySchema.post('save', function (doc, next) {
    // @ts-ignore
    this.constructor.countCategories(this.section)
    next()
})

categorySchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'section',
        select: 'name'
    })
    next()
})

const Category = model<ICategoryDoc, ICategoryModel>('Category', categorySchema)

export {Category}