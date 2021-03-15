import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import {ADDRESS_TYPE} from "../helpers/constants";

interface IAddressAttrs {
    user: string
    phone: string
    addressType: ADDRESS_TYPE
    state: string
    cityTown: string
    postalCode: number
    name: string
}

interface IAddressDoc extends Document {
    user: string
    phone: string
    addressType: ADDRESS_TYPE
    state: string
    cityTown: string
    postalCode: number
    name: string
    createdAt: string
}

interface IAddressModel extends Model<IAddressDoc> {
    build(attrs: IAddressAttrs): IAddressDoc
}

const addressSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    phone: {type: Number, required: true, trim: true},
    addressType: {type: String, enum: Object.values(ADDRESS_TYPE), required: true},
    state: {type: String, required: true, trim: true},
    cityTown: {type: String, required: true, trim: true},
    postalCode: {type: Number, required: true, trim: true},
    name: {type: String, required: true, trim: true},
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

addressSchema.statics.build = (attrs: IAddressAttrs) => (new Address(attrs))

addressSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'user',
        select: 'fullName'
    })
    next()
})

const Address = model<IAddressDoc, IAddressModel>('Address', addressSchema)

export {Address}