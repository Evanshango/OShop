import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import slugify from "slugify";

interface IProductAttrs {
    name: string
    price: number
    stock: number
    section: string
    brand: string
    description: string
    discount?: number
    images: string[]
    createdBy: string
}

interface IProductDoc extends Document {
    name: string
    price: number
    slug: string
    stock: number
    section: string
    brand: string
    description: string
    discount?: number
    images: string[]
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
    stock: {
        type: Number, required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String, required: true
    },
    images: [String],
    discount: {
        type: Number, default: 0
    },
    rating: {
        type: Number, default: 0
    },
    section: {type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.createdAt
            delete ret.updatedAt
        }
    }
})

productSchema.statics.build = (attrs: IProductAttrs) => (new Product(attrs))

productSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'section',
        select: 'name'
    })
    next()
})

productSchema.pre('save', async function (next: HookNextFunction) {
    // @ts-ignore
    this.set('slug', await slugify(this.name, {lower: true}))
    next()
})


const Product = model<IProductDoc, IProductModel>('Product', productSchema)

export {Product}
