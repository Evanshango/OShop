import express, {json} from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import cors from 'cors'
import morgan from 'morgan'

import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import {NODE_ENV} from "./helpers/constants";
import {serve, setup} from 'swagger-ui-express'
import yaml from 'yamljs'
import {authRouter} from "./routes/authRoutes";
import {userRouter} from "./routes/userRoutes";
import {categoryRouter} from "./routes/categoryRoutes";

const app = express()
app.use(json())
const corsConfig = {
    credentials: true,
    origin: 'http://localhost:3000',
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

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}