import {Request, Response} from "express";
import {Section} from "../models/section";
import {BadRequestError} from "../errors/bad-request-error";
import {NotFoundError} from "../errors/not-found-error";
import mongoose from "mongoose";

const checkSection = async (req: Request) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid section ID')
    return Section.findById(id)
}

export const fetchSections = async (req: Request, res: Response) => {
    const sections = await Section.find({})

    return res.send(sections)
}

export const addSection = async (req: Request, res: Response) => {
    const {name} = req.body

    const existingSection = await Section.findOne({name})

    if (existingSection) throw new BadRequestError('Section already exists')

    const section = Section.build({name})
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

    await Section.findByIdAndDelete(section.id)

    return res.status(204).send({
        message: 'Category deleted'
    })
}