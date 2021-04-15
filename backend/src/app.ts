import express, {json, Request, Response} from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'
import helmet from 'helmet'
import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import {NODE_ENV, ORIGIN_1, ORIGIN_2, ORIGIN_3, ORIGIN_4} from "./helpers/constants";
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
import {settingRouter} from "./routes/settingRoutes";
import {paymentRouter} from "./routes/paymentRoutes";
import {organizationRouter} from "./routes/organizationRoutes";

const app = express()

const upload = multer()

app.use(helmet())
app.use(json())
app.use(upload.any())

const corsConfig = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', ORIGIN_1!, ORIGIN_2!, ORIGIN_3!, ORIGIN_4!]
};

// Setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml')

app.set('trust proxy', true)

if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors(corsConfig))

app.use('/api/v1/docs', serve, setup(swaggerDefinition))
app.use('/api/v1', settingRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', organizationRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', sectionRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', addressRouter)
app.use('/api/v1', cartRouter)
app.use('/api/v1', orderRouter)
app.use('/api/v1', offerRouter)
app.use('/api/v1', paymentRouter)

app.all('/', async (req: Request, res: Response) => {
    return res.redirect('/api/v1/docs')
})

app.all('*', async () => {
    throw new NotFoundError('Route')
})

app.use(errorHandler)

export {app}
