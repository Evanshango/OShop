"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
require("express-async-errors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const not_found_error_1 = require("./errors/not-found-error");
const error_handler_1 = require("./middlewares/error-handler");
const constants_1 = require("./helpers/constants");
const swagger_ui_express_1 = require("swagger-ui-express");
const yamljs_1 = __importDefault(require("yamljs"));
const authRoutes_1 = require("./routes/authRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const categoryRoutes_1 = require("./routes/categoryRoutes");
const productRoutes_1 = require("./routes/productRoutes");
const sectionRoutes_1 = require("./routes/sectionRoutes");
const cartRoutes_1 = require("./routes/cartRoutes");
const orderRoutes_1 = require("./routes/orderRoutes");
const addressRoutes_1 = require("./routes/addressRoutes");
const offerRoutes_1 = require("./routes/offerRoutes");
const app = express_1.default();
exports.app = app;
const upload = multer_1.default();
app.use(express_1.json());
app.use(upload.any());
if (!constants_1.ORIGIN_1)
    throw new Error('ORIGIN_1 should be defined');
if (!constants_1.ORIGIN_2)
    throw new Error('ORIGIN_2 should be defined');
const corsConfig = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', constants_1.ORIGIN_1, constants_1.ORIGIN_2]
};
// Setup swagger
const swaggerDefinition = yamljs_1.default.load('./swagger.yaml');
app.set('trust proxy', true);
if (constants_1.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(cors_1.default(corsConfig));
app.use(cookie_session_1.default({
    signed: false,
    secure: true,
}));
app.use('/api/v1/docs', swagger_ui_express_1.serve, swagger_ui_express_1.setup(swaggerDefinition));
app.use('/api/v1', authRoutes_1.authRouter);
app.use('/api/v1', userRoutes_1.userRouter);
app.use('/api/v1', categoryRoutes_1.categoryRouter);
app.use('/api/v1', sectionRoutes_1.sectionRouter);
app.use('/api/v1', productRoutes_1.productRouter);
app.use('/api/v1', addressRoutes_1.addressRouter);
app.use('/api/v1', cartRoutes_1.cartRouter);
app.use('/api/v1', orderRoutes_1.orderRouter);
app.use('/api/v1', offerRoutes_1.offerRouter);
app.all('*', () => __awaiter(void 0, void 0, void 0, function* () {
    throw new not_found_error_1.NotFoundError('Route');
}));
app.use(error_handler_1.errorHandler);
