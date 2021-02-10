import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import slugify from "slugify";

interface IProductAttrs {
    name: string
    price: number
    quantity: number
    category: string
    description: string
    offer?: string
    images: string[]
    createdBy: string
}

interface IProductDoc extends Document {
    name: string
    price: number
    slug: string
    quantity: number
    category: string
    description: string
    offer?: number
    images: string[]
    rating: number
    createdBy: string
}

interface IProductModel extends Model<IProductDoc> {
    build(attrs: IProductAttrs): IProductDoc
}

const productSchema = new Schema({
    name: {
        type: String, trim: true, required: true
    },
    price: {
        type: Number, required: true
    },
    quantity: {
        type: Number, required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String, required: true
    },
    images: [String],
    offer: {
        type: Number
    },
    rating: {
        type: Number, default: 0
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

productSchema.statics.build = (attrs: IProductAttrs) => (new Product(attrs))

productSchema.pre('save', async function (next: HookNextFunction) {
    // @ts-ignore
    this.set('slug', await slugify(this.name, {lower: true}))
    next()
})

const Product = model<IProductDoc, IProductModel>('Product', productSchema)

export {Product}
