import {Request, Response} from "express";
import {Product} from "../models/product";
import {BadRequestError} from "../errors/bad-request-error";
import {FileHandler} from "../helpers/file-handler";
import {NotFoundError} from "../errors/not-found-error";
import mongoose from "mongoose";
import {Pagination} from "../helpers/pagination";

const checkProduct = async (req: Request) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid product ID')
    return Product.findById(id)
}

export const fetchProducts = async (req: Request, res: Response) => {
    const {results, pages, page, count} = await Pagination.paginatedResults(Product, req.query)

    return res.status(200).json({
        count,
        page,
        pages,
        products: results
    })
}

export const addProduct = async (req: Request, res: Response) => {
    const {
        name, price, stock, section, category, discount, discountPrice, finalPrice, description, featured
    } = JSON.parse(JSON.stringify(req.body))

    if (!mongoose.Types.ObjectId.isValid(section)) throw new BadRequestError('Please select a section')
    if (!mongoose.Types.ObjectId.isValid(category)) throw new BadRequestError('Please select a category')

    if (req.files.length === 0) throw new BadRequestError('Product images not found')
    const createdBy = req['user']!.id
    const images = await FileHandler.upload(req.files, name)

    const product = Product.build({
        name, price, stock, section, category, discount, discountPrice,
        finalPrice, description, images, createdBy, featured
    })
    await product.save()
    const newProduct = await Product.findById(product.id)
    return res.send(newProduct)
}

export const fetchProduct = async (req: Request, res: Response) => {
    const product = await checkProduct(req)
    if (!product) throw new NotFoundError('Product')

    res.send(product)
}

export const updateProduct = async (req: Request, res: Response) => {
    const product = await checkProduct(req)
    if (!product) throw new NotFoundError('Product')

    const {price, discount, name, stock, featured, section, category, description} = req.body
    const updateParams = {price, discount, name, stock, featured, section, description, category}

    const update = await Product.findByIdAndUpdate(product.id, updateParams, {new: true, runValidators: true})
    console.log(update) //todo remove this comment
    return res.send(update)
}

export const deleteProduct = async (req: Request, res: Response) => {
    const product = await checkProduct(req)
    if (!product) throw new NotFoundError('Product')

    const result = await FileHandler.delete(product.images, product.name)

    if (Object.keys(result[0]).length === 0) {
        await Product.findByIdAndDelete(product.id)

        return res.status(200).send({
            message: 'Product deleted'
        })
    } else {
        throw new BadRequestError('An error occurred deleting the product')
    }
}