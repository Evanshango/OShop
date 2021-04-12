import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";

interface ICartAttrs {
    customer: string
    items: [
        {
            product: string
            units: number
        }
    ]
}

interface ICartDoc extends Document {
    customer: string
    items: [
        {
            product: string
            units: number
        }
    ]
}

interface ICartModel extends Model<ICartDoc> {
    build(attrs: ICartAttrs): ICartDoc
}

const cartSchema = new Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            units: {type: Number, default: 1},
            _id: false
        }
    ]
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
        path: 'items.product',
        select: 'images finalPrice name -category -createdBy'
    })
    next()
})

const Cart = model<ICartDoc, ICartModel>('Cart', cartSchema)

export {Cart}
