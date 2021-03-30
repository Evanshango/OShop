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
exports.FileHandler = void 0;
const crypto_1 = require("crypto");
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("./constants");
const sharp_1 = __importDefault(require("sharp"));
const endpoint = new aws_sdk_1.Endpoint(constants_1.S3_ENDPOINT);
const s3 = new aws_sdk_1.S3({
    endpoint,
    credentials: new aws_sdk_1.Credentials(constants_1.AWS_ACCESS_KEY, constants_1.AWS_SECRET_KEY)
});
const folderName = (name) => truncate(name.replace(' ', '').toLowerCase(), 10);
const truncate = (name, n) => (name === null || name === void 0 ? void 0 : name.length) > n ? name.substr(0, n - 1) : name;
class FileHandler {
    static upload(files, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let folder = folderName(name);
            console.log(folder);
            let urls = [];
            const results = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const single = file.originalname.split('.');
                const params = {
                    Bucket: constants_1.BUCKET_NAME,
                    Key: `oshop/${folder}/${crypto_1.randomBytes(15).toString('hex')}.${single[single.length - 1]}`,
                    ContentType: file.mimetype,
                    Body: yield sharp_1.default(file.buffer).resize(300, 300).toBuffer(),
                    ACL: 'public-read'
                };
                return s3.upload(params).promise();
            })));
            results.map((result) => urls.push(result.Location));
            return urls;
        });
    }
    static delete(urls, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let folder = folderName(name);
            let results = yield Promise.all(urls.map((url) => {
                const urlParts = url.split('/');
                const params = {
                    Bucket: constants_1.BUCKET_NAME,
                    Key: `oshop/${folder}/${urlParts[urlParts.length - 1]}`
                };
                return s3.deleteObject(params, ((err, data) => {
                    results = { err, data };
                })).promise();
            }));
            return results;
        });
    }
}
exports.FileHandler = FileHandler;
