import {Document, Model, model, Schema} from 'mongoose'
import {PasswordManager} from '../helpers/password-manager'
import {AuthMethod, UserRole} from '../helpers/constants'

interface IUserAttrs {
    email: string
    firstName: string
    lastName: string
    fullName: string
    avatar?: string
    verified: boolean
    method: AuthMethod
    role?: UserRole
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
    method: AuthMethod
    role?: UserRole
    password?: string
    createdAt: string
}

const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true, lowercase: true
    },
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
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
        type: String, enum: Object.values(AuthMethod), required: true
    },
    role: {
        type: String, enum: Object.values(UserRole), default: UserRole.USER
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date, default: Date.now
    }
}, {
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

export {User, IUserAttrs}

