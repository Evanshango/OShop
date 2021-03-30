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
exports.deleteSection = exports.updateSection = exports.addSection = exports.fetchSections = void 0;
const section_1 = require("../models/section");
const bad_request_error_1 = require("../errors/bad-request-error");
const not_found_error_1 = require("../errors/not-found-error");
const mongoose_1 = __importDefault(require("mongoose"));
const checkSection = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new bad_request_error_1.BadRequestError('Invalid section ID');
    return section_1.Section.findById(id);
});
const fetchSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sections = yield section_1.Section.find({});
    return res.send(sections);
});
exports.fetchSections = fetchSections;
const addSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const existingSection = yield section_1.Section.findOne({ name });
    if (existingSection)
        throw new bad_request_error_1.BadRequestError('Section already exists');
    const section = section_1.Section.build({ name });
    yield section.save();
    return res.status(201).send(section);
});
exports.addSection = addSection;
const updateSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let section = yield checkSection(req);
    if (!section)
        throw new not_found_error_1.NotFoundError('Section');
    const { name } = req.body;
    if (req.body.name === section.name)
        throw new bad_request_error_1.BadRequestError('Section already exists');
    section.name = name;
    yield section.save();
    return res.send(section);
});
exports.updateSection = updateSection;
const deleteSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let section = yield checkSection(req);
    if (!section)
        throw new not_found_error_1.NotFoundError('Section');
    yield section_1.Section.findByIdAndDelete(section.id);
    return res.status(204).send({
        message: 'Category deleted'
    });
});
exports.deleteSection = deleteSection;
