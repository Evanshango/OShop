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
exports.fetchCategoriesBySectionId = exports.deleteCategory = exports.updateCategory = exports.fetchCategory = exports.fetchCategories = exports.addCategory = void 0;
const category_1 = require("../models/category");
const not_found_error_1 = require("../errors/not-found-error");
const bad_request_error_1 = require("../errors/bad-request-error");
const section_1 = require("../models/section");
const mongoose_1 = __importDefault(require("mongoose"));
const checkCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new bad_request_error_1.BadRequestError('Invalid category ID');
    return category_1.Category.findById(id);
});
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, section } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(section))
        throw new bad_request_error_1.BadRequestError('Please select a section');
    const existingCategory = yield category_1.Category.findOne({ name });
    if (existingCategory)
        throw new bad_request_error_1.BadRequestError('Category already exists');
    const category = category_1.Category.build({ name, section });
    yield category.save();
    const newCategory = yield category_1.Category.findById(category.id);
    return res.status(201).send(newCategory);
});
exports.addCategory = addCategory;
const fetchCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_1.Category.find({});
    res.send(categories);
});
exports.fetchCategories = fetchCategories;
const fetchCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield checkCategory(req);
    if (!category)
        throw new not_found_error_1.NotFoundError('Category');
    res.send(category);
});
exports.fetchCategory = fetchCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield checkCategory(req);
    if (!category)
        throw new not_found_error_1.NotFoundError('Category');
    if (req.body.name === category.name)
        throw new bad_request_error_1.BadRequestError('Category already exists');
    category.name = req.body.name;
    yield category.save();
    return res.send(category);
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield checkCategory(req);
    if (!category)
        throw new not_found_error_1.NotFoundError('Category');
    yield category_1.Category.findByIdAndDelete(category.id);
    return res.status(204).send({
        message: 'Category deleted'
    });
});
exports.deleteCategory = deleteCategory;
const fetchCategoriesBySectionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sectionId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(sectionId))
        throw new bad_request_error_1.BadRequestError('Invalid section ID');
    const section = yield section_1.Section.findById(sectionId);
    const category = yield category_1.Category.find({ section: sectionId });
    if (!section)
        throw new not_found_error_1.NotFoundError('Section');
    return res.send(category);
});
exports.fetchCategoriesBySectionId = fetchCategoriesBySectionId;
