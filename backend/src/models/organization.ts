import {Document, HookNextFunction, Model, model, Schema} from "mongoose";
import {PasswordManager} from "../helpers/password-manager";

interface IOrgAttrs {
    name: string
    email: string
    password: string
}

interface IOrgDoc extends Document {
    name: string
    email: string
    userCount: number
    createdAt: string
}

interface IOrgModel extends Model<IOrgDoc> {
    build(attrs: IOrgAttrs): IOrgDoc
}

const organizationSchema = new Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    email: {
        type: String, required: true, unique: true, trim: true
    },
    password: {
        type: String, required: true
    },
    userCount: {
        type: Number, default: 0
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

organizationSchema.statics.build = (attrs: IOrgAttrs) => (new Organization(attrs))

organizationSchema.pre('save', async function (done: HookNextFunction) {
    if (this.isModified('password')){
        const hashedPassword = await PasswordManager.toHash(this.get('password'))
        this.set('password', hashedPassword)
    }
    done()
})

const Organization = model<IOrgDoc, IOrgModel>('Organization', organizationSchema)

export {Organization}
