import mongoose from 'mongoose'
import {app} from "./app";
import {JWT_SECRET, MONGO_URI, PORT} from './helpers/constants'

const start = async () => {
    if (!JWT_SECRET) throw new Error('JWT_SECRET must be defined')
    if (!MONGO_URI) throw new Error('MONGO_URI must be defined')
    const port = PORT || 5000

    try {
        await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
            }
        )
        console.log('Connection to DB successful')
    } catch (err) {
        console.error(err)
    }
    app.listen(port, () => {
        console.log(`APP started on port ${port}`)
    })
}

(() => start())()