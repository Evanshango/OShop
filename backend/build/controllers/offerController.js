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
exports.deleteOffer = exports.addOffer = exports.activeOffers = exports.fetchOffers = void 0;
const offer_1 = require("../models/offer");
const mongoose_1 = __importDefault(require("mongoose"));
const bad_request_error_1 = require("../errors/bad-request-error");
const not_found_error_1 = require("../errors/not-found-error");
const fetchOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield offer_1.Offer.find({});
    return res.send(offers);
});
exports.fetchOffers = fetchOffers;
const activeOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currDate = new Date();
    const activeOffers = yield offer_1.Offer.find({ expiresAt: { $gt: currDate } });
    const active = activeOffers.sort(() => Math.random() - Math.random()).slice(0, 3);
    return res.send(active);
});
exports.activeOffers = activeOffers;
const addOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, duration } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(product))
        throw new bad_request_error_1.BadRequestError('Please choose a product');
    const expiration = new Date();
    //duration is in days ((duration * 24) * 60 * 60)
    expiration.setSeconds(expiration.getSeconds() + ((duration * 24) * 60 * 60));
    let savedOffer;
    const existing = yield offer_1.Offer.findOne({ product });
    if (existing) {
        savedOffer = yield offer_1.Offer.findByIdAndUpdate(existing._id, { expiresAt: expiration }, {
            new: true, runValidators: true
        });
    }
    else {
        const offer = offer_1.Offer.build({
            product, expiresAt: expiration
        });
        yield offer.save();
        savedOffer = yield offer_1.Offer.findById(offer.id);
    }
    return res.send(savedOffer);
});
exports.addOffer = addOffer;
const deleteOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new bad_request_error_1.BadRequestError('Invalid Offer ID');
    const offer = yield offer_1.Offer.findById(id);
    if (!offer)
        throw new not_found_error_1.NotFoundError('Offer');
    yield offer_1.Offer.findByIdAndDelete(id);
    return res.send(id);
});
exports.deleteOffer = deleteOffer;
