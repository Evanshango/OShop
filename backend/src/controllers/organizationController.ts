import {Request, Response} from "express";
import {Pagination} from "../helpers/pagination";
import {Organization} from "../models/organization";
import {BadRequestError} from "../errors/bad-request-error";
import {TokenManager} from "../helpers/token-manager";
import {PasswordManager} from "../helpers/password-manager";
import {CLIENT_ADMIN_URL_PROD, USER_ROLE} from "../helpers/constants";

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

    const existing = await Organization.findOne({email})

    if (existing) {
        throw new BadRequestError('Organization email already exists')
    }

    const org = Organization.build({
        name, email, password, role: USER_ROLE.ADMIN
    })

    await org.save()

    const url = `${CLIENT_ADMIN_URL_PROD!}`
    const {message} = await TokenManager.generateTokenAndSendEmail(org, Organization, 'org', org.name, url)

    return res.status(201).json({
        message,
        organization: org
    })
}

export const signInOrg = async (req: Request, res: Response) => {
    const {email, password} = req.body

    const existingOrg = await Organization.findOne({email})
    if (!existingOrg) throw new BadRequestError('Invalid organization credentials')

    if (existingOrg.verified === false) throw new BadRequestError('Please check your organization email for an activation link')

    const passMatch = await PasswordManager.compare(existingOrg.password, password)
    if (!passMatch) throw new BadRequestError('Invalid organization credentials')

    const orgJwt = await TokenManager.generateOrgToken(existingOrg)

    return res.send({
        status: 'success',
        token: orgJwt
    })
}

export const activateOrganization = async (req: Request, res: Response) => {
    const {token} = req.params
    const message = await TokenManager.activateAccount(token, Organization)
    return res.send({message})
}

export const requestLink = async (req: Request, res: Response) => {
    const {email} = req.body
    const existingOrg = await Organization.findOne({email})
    if (!existingOrg) throw new BadRequestError('Organization with that email does not exist')

    const url = `${CLIENT_ADMIN_URL_PROD!}`
    const {message} = await TokenManager.generateTokenAndSendEmail(existingOrg, Organization, 'org', existingOrg.name, url)

    return res.status(200).json({
        message
    })
}
