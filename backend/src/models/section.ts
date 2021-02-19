import mongoose, {Document, HookNextFunction, model, Model, Schema} from "mongoose";
import slugify from "slugify";

interface ISectionAttrs {
    name: string
    category: string
}

interface ISectionModel extends Model<ISectionDoc> {
    build(attrs: ISectionAttrs): ISectionDoc
}

interface ISectionDoc extends Document {
    name: string
    category: string
}

const sectionSchema = new Schema({
    name: {
        type: String, required: true, trim: true
    },
    slug: {
        type: String
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            delete ret.createdAt
            delete ret.updatedAt
        }
    }
})

sectionSchema.statics.build = (attrs: ISectionAttrs) => (new Section(attrs))

sectionSchema.pre('save', async function (next: HookNextFunction) {
    // @ts-ignore
    this.set('slug', await slugify(this.name, {lower: true}))
    next()
})

sectionSchema.pre(/^find/, function (next: HookNextFunction) {
    this.populate({
        path: 'category',
        select: 'name'
    })
    next()
})

const Section = model<ISectionDoc, ISectionModel>('Section', sectionSchema)

export {Section}