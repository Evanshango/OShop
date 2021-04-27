import {Request, Response} from "express";
import {Product} from "../models/product";
import {BadRequestError} from "../errors/bad-request-error";
import {FileHandler} from "../helpers/file-handler";
import {NotFoundError} from "../errors/not-found-error";
import mongoose from "mongoose";
import {Pagination} from "../helpers/pagination";
import {PRODUCT_STATUS} from "../helpers/constants";

const checkProduct = async (req: Request) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid product ID')
    return Product.findById(id)
}

export const fetchProducts = async (req: Request, res: Response) => {
    const {results, pages, page, count} = await Pagination.paginatedResults(Product, req.query)

    return res.status(200).json({
        count, page, pages, products: results
    })
}

export const fetchProductsWithFilters = async (req: Request, res: Response) => {
    const {results, pages, page, count} = await Pagination.paginatedResults(Product, req.query, req.body.category)

    return res.status(200).json({
        count, page, pages, products: results
    })
}

export const addProduct = async (req: Request, res: Response) => {
    const {
        name, price, stock, section, category, discount, discountPrice, finalPrice, description, featured
    } = JSON.parse(JSON.stringify(req.body))

    if (!mongoose.Types.ObjectId.isValid(section)) throw new BadRequestError('Please select a section')
    if (!mongoose.Types.ObjectId.isValid(category)) throw new BadRequestError('Please select a category')

    if (req.files.length === 0) throw new BadRequestError('ProductInfo images not found')
    const createdBy = req['user']!.id
    const images = await FileHandler.upload(req.files, name)

    if (images.length < 1) throw new BadRequestError('A product must have at least one image')

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
    const similar = await Product.find({category: product.category}).limit(10)

    res.send({
        product, similar: similar.filter(prod => prod.id !== product.id)
    })
}

export const updateProduct = async (req: Request, res: Response) => {
    const product = await checkProduct(req)
    if (!product) throw new NotFoundError('Product')

    const {price, discount, name, stock, featured, section, category, description} = req.body
    const updateParams = {price, discount, name, stock, featured, section, description, category}

    const update = await Product.findByIdAndUpdate(product.id, updateParams, {new: true, runValidators: true})
    return res.send(update)
}

export const deleteProduct = async (req: Request, res: Response) => {
    const product = await checkProduct(req)
    if (!product) throw new NotFoundError('Product')

    await Product.findByIdAndUpdate(product.id, {status: PRODUCT_STATUS.DELETED})

    return res.send({id: product.id})
}
