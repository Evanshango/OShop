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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.editAddress = exports.addAddress = exports.fetchAddresses = void 0;
const address_1 = require("../models/address");
const fetchAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const addresses = yield address_1.Address.find({ user: user.id });
    return res.send(addresses);
});
exports.fetchAddresses = fetchAddresses;
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body } = req;
    const { phone, addressType, state, cityTown, postalCode, name } = body;
    const address = address_1.Address.build({
        phone, addressType, state, cityTown, postalCode, name, user: user.id
    });
    yield address.save();
    const newAddress = yield address_1.Address.findById(address.id);
    return res.send(newAddress);
});
exports.addAddress = addAddress;
const editAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send({});
});
exports.editAddress = editAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send({});
});
exports.deleteAddress = deleteAddress;
