import {Model} from "mongoose";
import {NotFoundError} from "../errors/not-found-error";

export class Pagination {
    static async paginatedResults(model: Model<any>, queryParams: any) {
        const {page, limit} = queryParams
        let query = model.find()
        let currPage: number, pageSize: number

        currPage = parseInt(page) || 1
        pageSize = parseInt(limit) || 15

        const skip = (currPage - 1) * pageSize
        const total = await model.countDocuments()
        const pages = Math.ceil(total / pageSize)

        query = query.skip(skip).limit(pageSize)

        if (currPage > pages) throw new NotFoundError('Page not found')
        const  results = await query.sort('-createdAt')
        return {results, count: results.length, page: currPage, pages}
    }
}