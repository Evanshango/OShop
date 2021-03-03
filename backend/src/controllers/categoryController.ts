import {Request, Response} from "express";
import {Category} from "../models/category";
import {NotFoundError} from "../errors/not-found-error";
import {BadRequestError} from "../errors/bad-request-error";
import {Section} from "../models/section";
import mongoose from "mongoose";

const checkCategory = async (req: Request) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid category ID')
    return Category.findById(id);
}

export const addCategory = async (req: Request, res: Response) => {
    const {name, section} = req.body

    if (!mongoose.Types.ObjectId.isValid(section)) throw new BadRequestError('Please select a section')

    const existingCategory = await Category.findOne({name})
    if (existingCategory) throw new BadRequestError('Category already exists')

    const category = Category.build({name, section})

    await category.save()
    const newCategory = await Category.findById(category.id)
    return res.status(201).send(newCategory)
}

export const fetchCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({})
    res.send(categories)
}

export const fetchCategory = async (req: Request, res: Response) => {
    const category = await checkCategory(req)
    if (!category) throw new NotFoundError('Category')

    res.send(category)
}

export const updateCategory = async (req: Request, res: Response) => {
    let category = await checkCategory(req)

    if (!category) throw new NotFoundError('Category')

    if (req.body.name === category.name) throw new BadRequestError('Category already exists')

    category.name = req.body.name
    await category.save()
    return res.send(category)
}

export const deleteCategory = async (req: Request, res: Response) => {
    const category = await checkCategory(req)
    if (!category) throw new NotFoundError('Category')

    await Category.findByIdAndDelete(category.id)

    return res.status(204).send({
        message: 'Category deleted'
    })
}

export const fetchCategoriesBySectionId = async (req: Request, res: Response) => {
    const {sectionId} = req.params

    if (!mongoose.Types.ObjectId.isValid(sectionId)) throw new BadRequestError('Invalid section ID')

    const section = await Section.findById(sectionId)
    const category = await Category.find({section: sectionId})

    if (!section) throw new NotFoundError('Section')
    return res.send(category)
}
