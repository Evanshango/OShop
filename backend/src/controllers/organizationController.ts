import {Request, Response} from "express";
import {Pagination} from "../helpers/pagination";
import {Organization} from "../models/organization";
import {BadRequestError} from "../errors/bad-request-error";

export const getOrganizations = async (req: Request, res: Response) => {
    const {results, pages, page, count} = await Pagination.paginatedResults(Organization, req.query)
    return res.status(200).json({
        count,
        page,
        pages,
        organizations: results
    })
}

export const addOrganization = async (req: Request, res: Response) => {
    const {name, email, password} = req.body

    const existing = await Organization.findOne({name, email})

    if (existing){
        throw new BadRequestError('Organization already exists')
    }

    const org = Organization.build({
        name, email, password
    })

    await org.save()
    console.log(org)
    return res.send(org)
}
