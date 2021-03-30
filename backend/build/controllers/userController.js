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
exports.deleteUser = exports.updateUser = exports.fetchUserById = exports.fetchUsers = exports.fetchUser = void 0;
const user_1 = require("../models/user");
const not_found_error_1 = require("../errors/not-found-error");
const not_authorized_error_1 = require("../errors/not-authorized-error");
const checkUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.User.findById(id);
    if (!user)
        throw new not_found_error_1.NotFoundError('User');
    return user;
});
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const { id, email } = req.user;
        const user = yield user_1.User.findOne({ _id: id, email });
        if (!user) {
            throw new not_found_error_1.NotFoundError('User');
        }
        return res.send(user);
    }
    else {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
});
exports.fetchUser = fetchUser;
const fetchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find({});
    return res.send(users);
});
exports.fetchUsers = fetchUsers;
const fetchUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield checkUser(req);
    return res.send(user);
});
exports.fetchUserById = fetchUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield checkUser(req);
    if (user.id !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
        throw new not_authorized_error_1.NotAuthorizedError();
    const updatedUser = yield user_1.User.findByIdAndUpdate(user.id, Object.assign({}, req.body), {
        new: true,
        runValidators: true
    });
    return res.send(updatedUser);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield checkUser(req);
    //todo implement user deletion
});
exports.deleteUser = deleteUser;
