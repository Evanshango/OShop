import mongoose, {Document, HookNextFunction, Model, model, Schema} from 'mongoose'
import {PasswordManager} from '../helpers/password-manager'
import {AUTH_METHOD, USER_ROLE} from '../helpers/constants'
import {Organization} from "./organization";

interface IUserAttrs {
    email: string
    firstName: string
    lastName: string
    fullName: string
    avatar?: string
    verified: boolean
    method: AUTH_METHOD
    role?: USER_ROLE
    organization?: string
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
    role?: USER_ROLE
    organization: string
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
    organization: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Organization'
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

userSchema.statics.usersPerOrganization = async function (organizationId){
    const ct = await this.aggregate([
        {
            $match: {organization: organizationId}
        },
        {
            $group: {
                _id: '$organization',
                nCount: {$sum: 1}
            }
        }
    ])
    if (ct.length > 0){
        await Organization.findByIdAndUpdate(organizationId, {
            userCount: ct[0].nCount
        })
    } else {
        await Organization.findByIdAndUpdate(organizationId, {
            userCount: 0
        })
    }
}

userSchema.pre(/^find/, function (next: HookNextFunction){
    this.populate({
        path: 'organization',
        select: 'name email'
    })
    next()
})

userSchema.pre('save', async function (done: HookNextFunction) {
    if (this.isModified('password')) {
        const hashedPassword = await PasswordManager.toHash(this.get('password'))
        this.set('password', hashedPassword)
    }
    done()
})

userSchema.post('save', function (doc, next) {
    //@ts-ignore
    this.constructor.usersPerOrganization(this.organization)
    next()
})

const User = model<IUserDoc, IUserModel>('User', userSchema)

export {User}

