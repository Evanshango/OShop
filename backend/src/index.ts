import mongoose from 'mongoose'
import {app} from "./app";
import {JWT_SECRET, MONGO_URI, PORT, DB_USER, DB_PASSWORD, DB_NAME} from './helpers/constants'

const start = async () => {
    if (!JWT_SECRET) throw new Error('JWT_SECRET must be defined')
    if (!MONGO_URI) throw new Error('MONGO_URI must be defined')
    if (!DB_USER) throw new Error('DB_USER must be defined')
    if (!DB_PASSWORD) throw new Error('DB_PASSWORD must be defined')
    if (!DB_NAME) throw new Error('DB_NAME must be defined')
    const port = PORT || 5000

    let uri = MONGO_URI
    uri = uri.replace('<username>', DB_USER)
    uri = uri.replace('<password>', DB_PASSWORD)
    uri = uri.replace('<dbname>', DB_NAME)

    try {
        await mongoose.connect(uri, {
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