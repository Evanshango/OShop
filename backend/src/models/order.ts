import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import {ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS} from "../helpers/constants";
import {Product} from "./product";

interface IOrderAttrs {
    customer: string
    amount: number
    address: string
    items: [
        {
            product: string
            price: number
            units: number
            totalPrice: number
        }
    ]
    paymentStatus?: PAYMENT_STATUS
    paymentMethod?: PAYMENT_METHOD
    orderStatus?: ORDER_STATUS
}

interface IOrderDoc extends Document {
    id: string
    customer: string,
    amount: number
    address: string
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
    orderStatus: ORDER_STATUS
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
        type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true
    },
    amount: {
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
            },
            _id: false
        }
    ],
    paymentStatus: {
        type: String,
        enum: Object.values(PAYMENT_STATUS), required: true, default: PAYMENT_STATUS.PENDING
    },
    paymentMethod: {
        type: String,
        enum: Object.values(PAYMENT_METHOD)
    },
    orderStatus: {type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.ORDERED},
    isCompleted: {type: Boolean, default: false},

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
        select: 'fullName'
    }).populate({
        path: 'items.product',
        select: 'name images description createdBy'
    }).populate({
        path: 'address',
        select: '-user -createdAt'
    })
    next()
})

orderSchema.post('save', function (doc:Document, next: HookNextFunction){
    // @ts-ignore
    this.items.forEach(async (item: any) => {
        const prod = await Product.findById(item.product)
        if (prod){
            await Product.findByIdAndUpdate(prod.id, {stock: prod.stock - item.units})
        }
    })
    next()
})

const Order = model<IOrderDoc, IOrderModel>('Order', orderSchema)

export {Order}
