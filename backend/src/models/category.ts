import {Document, HookNextFunction, Model, model, Schema} from "mongoose";
import slugify from "slugify";

interface ICategoryAttrs {
    name: string
}

interface ICategoryDoc extends Document {
    name: string
    slug: string
}

interface ICategoryModel extends Model<ICategoryDoc> {
    build(attrs: ICategoryAttrs): ICategoryDoc
}

const categorySchema = new Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    slug: {
        type: String
    },
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

categorySchema.pre('save', async function (next: HookNextFunction) {
    // @ts-ignore
    this.set('slug', await slugify(this.name, {lower: true}))
    next()
})

const Category = model<ICategoryDoc, ICategoryModel>('Category', categorySchema)

export {Category}