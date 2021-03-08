import express, {json} from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'

import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import {NODE_ENV} from "./helpers/constants";
import {serve, setup} from 'swagger-ui-express'
import yaml from 'yamljs'
import {authRouter} from "./routes/authRoutes";
import {userRouter} from "./routes/userRoutes";
import {categoryRouter} from "./routes/categoryRoutes";
import {productRouter} from "./routes/productRoutes";
import {sectionRouter} from "./routes/sectionRoutes";
import {cartRouter} from "./routes/cartRoutes";

const app = express()
const upload = multer()

app.use(json())
app.use(upload.any())

const corsConfig = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
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
    secure: false,
}))

app.use('/api/v1/docs', serve, setup(swaggerDefinition))
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', sectionRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', cartRouter)

app.all('*', async () => {
    throw new NotFoundError('Route')
})

app.use(errorHandler)

export {app}