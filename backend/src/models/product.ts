import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import slugify from "slugify";

interface IProductAttrs {
    name: string
    price: number
    stock: number
    section: string
    category: string
    discount: number
    discountPrice: number
    finalPrice: number
    description: string
    images: string[]
    createdBy: string
}

interface IProductDoc extends Document {
    name: string
    price: number
    slug: string
    stock: number
    category: string
    discount: number
    discountPrice: number
    finalPrice: number
    description: string
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
    discountPrice: {
        type: Number, default: 0
    },
    finalPrice: {
        type: Number
    },
    rating: {
        type: Number, default: 0
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
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
        path: 'category',
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
