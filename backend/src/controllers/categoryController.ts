import {Request, Response} from "express";
import {Category} from "../models/category";
import {NotFoundError} from "../errors/not-found-error";
import {ItemVisibility, UserRole} from "../helpers/constants";
import {NotAuthorizedError} from "../errors/not-authorized-error";
import {BadRequestError} from "../errors/bad-request-error";

const checkCategory = async (req: Request) => {
    const {slug} = req.params

    const category = await Category.findOne({slug})
    if (!category) throw new NotFoundError()
    return category
}

export const addCategory = async (req: Request, res: Response) => {
    const {name} = req.body
    if (req.user!.role !== UserRole.ADMIN) throw new NotAuthorizedError()

    const existingCategory = await Category.findOne({name})
    if (existingCategory) throw new BadRequestError('Category already exists')

    const category = Category.build({name})

    await category.save()
    return res.status(201).send(category)
}



export const fetchCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({})
    res.send(categories)
}

export const visibleCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({visible: ItemVisibility.ACTIVE})
    res.send(categories)
}

export const fetchCategory = async (req: Request, res: Response) => {
    const category = await checkCategory(req)
    res.send(category)
}

export const updateCategory = async (req: Request, res: Response) => {
    const category = await checkCategory(req)

    if (req.user!.role !== UserRole.ADMIN) throw new NotAuthorizedError()

    const updatedCategory = await Category.findByIdAndUpdate(category.id, {...req.body}, {
        new: true,
        runValidators: true
    })
    return res.send(updatedCategory)
}

export const deleteCategory = async (req: Request, res: Response) => {
    const category = await checkCategory(req)

    if (req.user!.role !== UserRole.ADMIN) throw new NotAuthorizedError()

    category.visible = ItemVisibility.INACTIVE
    await category.save()

    return res.status(204).send({
        message: 'Category deleted'
    })
}
