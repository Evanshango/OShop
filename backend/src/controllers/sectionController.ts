import {Request, Response} from "express";
import {Section} from "../models/section";
import {BadRequestError} from "../errors/bad-request-error";
import {NotFoundError} from "../errors/not-found-error";

const checkSection = async (req: Request) => {
    const {slug} = req.params
    return Section.findOne({slug})
}

export const fetchSections = async (req: Request, res: Response) => {
    const sections = await Section.find({})

    return res.send(sections)
}

export const addSection = async (req: Request, res: Response) => {
    const {name, categoryId} = req.body

    const existingSection = await Section.findOne({name})

    if (existingSection) throw new BadRequestError('Section already exists')

    const section = Section.build({
        name, category: categoryId
    })
    await section.save()

    return res.status(201).send(section)
}

export const updateSection = async (req: Request, res: Response) => {
    let section = await checkSection(req)

    if (!section) throw new NotFoundError('Section')

    const {name} = req.body

    if (req.body.name === section.name) throw new BadRequestError('Section already exists')

    section.name = name
    await section.save()
    return res.send(section)
}

export const deleteSection = async (req: Request, res: Response) => {
    let section = await checkSection(req)

    if (!section) throw new NotFoundError('Section')

    await Section.findOneAndDelete(section.id)
    return res.status(204).send({
        message: 'Category deleted'
    })
}