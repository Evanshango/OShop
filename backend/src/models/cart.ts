import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";

interface ICartAttrs {
    product: string
    units: number
    customer: string
}

interface ICartDoc extends Document {
    product: string,
    units: number
    customer: string
    createdAt: string
}

interface ICartModel extends Model<ICartDoc> {
    build(attrs: ICartAttrs): ICartDoc
}

const cartSchema = new Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    units: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.updatedAt
        }
    }
})

cartSchema.statics.build = (attrs: ICartAttrs) => (new Cart(attrs))

cartSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'customer',
        select: 'firstName lastName'
    }).populate({
        path: 'product'
    })
    next()
})

const Cart = model<ICartDoc, ICartModel>('Cart', cartSchema)

export {Cart}