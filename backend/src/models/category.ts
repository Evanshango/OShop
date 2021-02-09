import {Document, Model, model, Schema} from "mongoose";
import {ItemVisibility, UserRole} from "../helpers/constants";

interface ICategoryAttrs{
    name: string
    visible?: ItemVisibility
}

interface ICategoryDoc extends Document{
    name: string
    slug: string
    visible: ItemVisibility
    createdAt: string
}

interface ICategoryModel extends Model<ICategoryDoc>{
    build(attrs: ICategoryAttrs): ICategoryDoc
}

const categorySchema = new Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    slug: {
      type: String
    },
    visible: {
      type: String, enum: Object.values(ItemVisibility), default: ItemVisibility.ACTIVE
    },
    createdAt: {
        type: Date, default: Date.now
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

categorySchema.statics.build = (attrs: ICategoryAttrs) => (new Category(attrs))

const Category = model<ICategoryDoc, ICategoryModel>('Category', categorySchema)

export {Category}