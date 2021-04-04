import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import {Order} from "./order";
import {Cart} from './cart'
import {PAYMENT_STATUS} from "../helpers/constants";

interface IPaymentAttrs {
    order: string
    paymentRef: string
    payerEmail?: string
    payerId?: string
    payerName: string
    amount: string
    currency: string
    method: string
}

interface IPaymentDoc extends Document {
    order: string
    paymentRef: string
    payerEmail?: string
    payerId?: string
    payerName: string
    amount: string
    currency: string
    method: string
    createdAt: string
}

interface IPaymentModel extends Model<IPaymentDoc> {
    build(attrs: IPaymentAttrs): IPaymentDoc
}

const paymentSchema = new Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    paymentRef: {
        type: String, required: true
    },
    payerEmail: {
        type: String, required: true
    },
    payerId: {
        type: String
    },
    payerName: {
        type: String, required: true
    },
    amount: {
        type: String, required: true
    },
    currency: {
        type: String, required: true
    },
    method: {
        type: String, required: true
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

paymentSchema.statics.build = (attrs: IPaymentAttrs) => (new Payment(attrs))

paymentSchema.statics.deleteCart = async function (orderId, method) {
    let customer
    const order = await Order.findById(orderId)
    if (order) {
        customer = order.customer
        await Order.findByIdAndUpdate(order.id,
            {paymentMethod: method, paymentStatus: PAYMENT_STATUS.COMPLETED}, {new: true}
        )
    }

    const toDelete = await Cart.findOne({customer})
    if (toDelete) {
        await Cart.findByIdAndDelete(toDelete.id)
    }
}

paymentSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'order'
    })
    next()
})

paymentSchema.post('save', function (doc, next) {
    //@ts-ignore
    this.constructor.deleteCart(this.order, this.method)
    next()
})

const Payment = model<IPaymentDoc, IPaymentModel>('payment', paymentSchema)

export {Payment}