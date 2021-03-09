import {Document, Model, model, Schema} from 'mongoose'
import {PasswordManager} from '../helpers/password-manager'
import {AUTH_METHOD, USER_ROLE} from '../helpers/constants'

interface IUserAttrs {
    email: string
    firstName: string
    lastName: string
    fullName: string
    avatar?: string
    verified: boolean
    method: AUTH_METHOD
    role?: USER_ROLE
    password?: string
}

interface IUserModel extends Model<IUserDoc> {
    build(attrs: IUserAttrs): IUserDoc
}

interface IUserDoc extends Document {
    email: string
    firstName: string
    lastName: string
    fullName: string
    avatar?: string
    verified: boolean
    method: AUTH_METHOD
    role?: USER_ROLE
    password?: string
}

const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true, lowercase: true, trim: true
    },
    firstName: {
        type: String, required: true, trim: true
    },
    lastName: {
        type: String, required: true, trim: true
    },
    fullName: {
        type: String,
    },
    avatar: {
        type: String
    },
    verified: {
        type: Boolean, required: true
    },
    method: {
        type: String, enum: Object.values(AUTH_METHOD), required: true
    },
    role: {
        type: String, enum: Object.values(USER_ROLE), default: USER_ROLE.USER
    },
    password: {
        type: String
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.statics.build = (attrs: IUserAttrs) => (new User(attrs))

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = await PasswordManager.toHash(this.get('password'))
        this.set('password', hashedPassword)
    }
    done()
})

const User = model<IUserDoc, IUserModel>('User', userSchema)

export {User}

