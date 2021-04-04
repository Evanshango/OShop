import {Document, model, Model, Schema} from "mongoose";

interface ISettingAttrs {
    coverImages: string[]
    contact: {
        email: string
        phone: number
        address: string
    }
}

interface ISettingDoc extends Document {
    coverImages: string[]
    contact: {
        email: string
        phone: number
        address: string
    },
    updatedAt: string
}

interface ISettingModel extends Model<ISettingDoc> {
    build(attrs: ISettingAttrs): ISettingDoc
}

const settingSchema = new Schema({
    coverImages: [String],
    contact: {
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true}
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

settingSchema.statics.build = (attrs: ISettingAttrs) => new Setting(attrs)

const Setting = model<ISettingDoc, ISettingModel>('Setting', settingSchema)

export {Setting}