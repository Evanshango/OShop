"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const constants_1 = require("../helpers/constants");
const not_authorized_error_1 = require("../errors/not-authorized-error");
const isAdmin = (req, res, next) => {
    if (req.user.role !== constants_1.USER_ROLE.ADMIN) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
exports.isAdmin = isAdmin;
