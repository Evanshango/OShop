import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import {Order} from "./order";
import {Cart} from "./cart";
import {PAYMENT_METHOD, PAYMENT_STATUS} from "../helpers/constants";

interface IPaymentAttrs {
    order: string
    orderRandomId: string
    paymentRef?: string
    payerEmail?: string
    payerId?: string
    payerName?: string
    amount: string
    currency: string
    checkoutId?: string
    message?: string
    merchantId?: string
    method: string
}

interface IPaymentDoc extends Document {
    order: string
    orderRandomId: string
    paymentRef: string
    payerEmail?: string
    payerId?: string
    payerName: string
    amount: string
    currency: string
    checkoutId?: string
    message?: string
    merchantId?: string
    method: string
    createdAt: string
}

interface IPaymentModel extends Model<IPaymentDoc> {
    build(attrs: IPaymentAttrs): IPaymentDoc

    deleteOrderCart(orderId: string, method: string): void

    // deleteOrderCart(orderId: string, method: string): Promise<IPaymentDoc | null>
}

const paymentSchema = new Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    orderRandomId: {
        type: String, required: true
    },
    paymentRef: {
        type: String
    },
    payerEmail: {
        type: String
    },
    payerId: {
        type: String
    },
    payerName: {
        type: String
    },
    amount: {
        type: String, required: true
    },
    currency: {
        type: String, required: true
    },
    method: {
        type: String, required: true
    },
    merchantId: {
        type: String
    },
    checkoutId: {
        type: String
    },
    message: {
        type: String
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

paymentSchema.statics.deleteOrderCart = async (orderId: string, method: string) => {
    let customer
    let payMethod = method === PAYMENT_METHOD.MPESA ? PAYMENT_METHOD.MPESA : PAYMENT_METHOD.PAYPAL
    const order = await Order.findById(orderId)
    if (order) {
        customer = order.customer
        await Order.findByIdAndUpdate(order.id, {
                paymentStatus: PAYMENT_STATUS.COMPLETED, paymentMethod: payMethod
            }, {new: true}
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

const Payment = model<IPaymentDoc, IPaymentModel>('payment', paymentSchema)

export {Payment}
