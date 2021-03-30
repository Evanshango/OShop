"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const constants_1 = require("./helpers/constants");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!constants_1.JWT_SECRET)
        throw new Error('JWT_SECRET must be defined');
    if (!constants_1.MONGO_URI)
        throw new Error('MONGO_URI must be defined');
    if (!constants_1.DB_USER)
        throw new Error('DB_USER must be defined');
    if (!constants_1.DB_PASSWORD)
        throw new Error('DB_PASSWORD must be defined');
    if (!constants_1.DB_NAME)
        throw new Error('DB_NAME must be defined');
    const port = constants_1.PORT || 5000;
    let uri = constants_1.MONGO_URI;
    uri = uri.replace('<username>', constants_1.DB_USER);
    uri = uri.replace('<password>', constants_1.DB_PASSWORD);
    uri = uri.replace('<dbname>', constants_1.DB_NAME);
    try {
        yield mongoose_1.default.connect(uri, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
        });
        console.log('Connection to DB successful');
    }
    catch (err) {
        console.error(err);
    }
    app_1.app.listen(port, () => {
        console.log(`APP started on port ${port}`);
    });
});
(() => start())();
