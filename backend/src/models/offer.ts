import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";

interface IOfferAttrs {
    product: string
    expiresAt: Date
}

interface IOfferDoc extends Document {
    product: string
    expiresAt: Date
    createdAt: string
}

interface IOfferModel extends Model<IOfferDoc> {
    build(attrs: IOfferAttrs): IOfferDoc
}

const offerSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date, required: true
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

offerSchema.statics.build = (attrs: IOfferAttrs) => new Offer(attrs)

offerSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'product'
    })
    next()
})

const Offer = model<IOfferDoc, IOfferModel>('Offer', offerSchema)

export {Offer}