import express, {json} from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'
import helmet from 'helmet'

import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import {NODE_ENV, ORIGIN_1, ORIGIN_2} from "./helpers/constants";
import {serve, setup} from 'swagger-ui-express'
import yaml from 'yamljs'
import {authRouter} from "./routes/authRoutes";
import {userRouter} from "./routes/userRoutes";
import {categoryRouter} from "./routes/categoryRoutes";
import {productRouter} from "./routes/productRoutes";
import {sectionRouter} from "./routes/sectionRoutes";
import {cartRouter} from "./routes/cartRoutes";
import {orderRouter} from "./routes/orderRoutes";
import {addressRouter} from "./routes/addressRoutes";
import {offerRouter} from "./routes/offerRoutes";

const app = express()

const upload = multer()

app.use(helmet())
app.use(json())
app.use(upload.any())

if (!ORIGIN_1) throw new Error('ORIGIN_1 should be defined')
if (!ORIGIN_2) throw new Error('ORIGIN_2 should be defined')

const corsConfig = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', ORIGIN_1, ORIGIN_2]
};

// Setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml')

app.set('trust proxy', true)

if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors(corsConfig))

app.use(cookieSession({
    signed: false,
    secure: true,
}))

app.use('/api/v1/docs', serve, setup(swaggerDefinition))
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', sectionRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', addressRouter)
app.use('/api/v1', cartRouter)
app.use('/api/v1', orderRouter)
app.use('/api/v1', offerRouter)

app.all('*', async () => {
    throw new NotFoundError('Route')
})

app.use(errorHandler)

export {app}