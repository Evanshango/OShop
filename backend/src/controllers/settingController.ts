import {Request, Response} from "express";
import {Setting} from "../models/setting";
import {BadRequestError} from "../errors/bad-request-error";
import {FileHandler} from "../helpers/file-handler";

export const fetchSettings = async (req: Request, res: Response) => {
    const settings = await Setting.find({})
    const setting = settings.length > 0 ? settings[0] : {}
    return res.send(setting)
}

export const addSettings = async (req: Request, res: Response) => {
    const {email, phone, address} = req.body

    if (req.files.length === 0) throw new BadRequestError('At least one image is required')

    const images = await FileHandler.upload(req.files, 'settings')

    const setting = Setting.build({
        coverImages: images,
        contact: {
            email, phone, address
        }
    })

    const settings = await setting.save()
    return res.send(settings)
}