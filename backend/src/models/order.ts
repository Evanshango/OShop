import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import {ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS} from "../helpers/constants";

interface IOrderAttrs {
    customer: string
    amount: number
    phone: number
    items: [
        {
            product: string
            price: number
            units: number
            totalPrice: number
        }
    ]
    paymentStatus: PAYMENT_STATUS
    paymentMethod: PAYMENT_METHOD
}

interface IOrderDoc extends Document {
    customer: string,
    amount: number
    phone: number
    items: [
        {
            product: string
            price: number
            units: number
            totalPrice: number
        }
    ]
    paymentStatus: PAYMENT_STATUS
    paymentMethod: PAYMENT_METHOD
    createdAt: string
}

interface IOrderModel extends Model<IOrderDoc> {
    build(attrs: IOrderAttrs): IOrderDoc
}

const orderSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    address: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },
    phone: {
        type: Number, required: true
    },
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            price: {
                type: Number, required: true
            },
            units: {
                type: Number, required: true
            },
            totalPrice: {
                type: Number, required: true
            }
        }
    ],
    paymentStatus: {
        type: String,
        enum: Object.values(PAYMENT_STATUS), required: true
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PAYMENT_METHOD), required: true
    },
    orderStatus: [
        {
            type: {
                String,
                enum: Object.values(ORDER_STATUS),
                default: ORDER_STATUS.ORDERED
            },
            date: {
                type: Date
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ],
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

orderSchema.statics.build = (attrs: IOrderAttrs) => (new Order(attrs))

orderSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'customer',
        select: 'firstName lastName'
    }).populate({
        path: 'items.product',
        select: 'name images description createdBy'
    })
    next()
})

const Order = model<IOrderDoc, IOrderModel>('Order', orderSchema)

export {Order}