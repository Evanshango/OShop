import {Model} from "mongoose";
import {NotFoundError} from "../errors/not-found-error";

export class Pagination {
    static async paginatedResults(model: Model<any>, queryParams: any, filters?: []) {
        const {page, limit, search, field} = queryParams
        const pattern = search !== undefined && new RegExp(`${search}`, 'i')
        let fieldName = field !== undefined ? field : 'name'

        let searchQuery: any = {}
        if (pattern) {
            searchQuery[fieldName] = {$regex: pattern}
        }

        let query

        if (filters && filters.length > 0) {
            query = model.find({category: {$in: filters}})
        } else {
            query = searchQuery !== {} ? model.find(searchQuery) : model.find()
        }

        let currPage: number, pageSize: number

        currPage = parseInt(page) || 1
        pageSize = parseInt(limit) || 15

        const skip = (currPage - 1) * pageSize
        const total = await model.countDocuments()
        const pages = Math.ceil(total / pageSize)

        query = query.skip(skip).limit(pageSize)

        if (pages > 0 && currPage > pages) throw new NotFoundError('Page')
        const results = await query.sort('-createdAt')
        return {results, count: results.length, page: currPage, pages}
    }
}
