import {Request, Response} from "express";
import {Product} from "../models/product";
import {BadRequestError} from "../errors/bad-request-error";
import {FileHandler} from "../helpers/file-handler";
import {NotFoundError} from "../errors/not-found-error";
import mongoose from "mongoose";

const checkProduct = async (req: Request) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid product ID')
    return Product.findById(id)
}

export const fetchProducts = async (req: Request, res: Response) => {
    const products = await Product.find({})
    res.send(products)
}

export const addProduct = async (req: Request, res: Response) => {
    const {
        name, price, stock, section, category, discount, discountPrice, finalPrice, description
    } = JSON.parse(JSON.stringify(req.body))

    if (!mongoose.Types.ObjectId.isValid(section)) throw new BadRequestError('Please select a section')
    if (!mongoose.Types.ObjectId.isValid(category)) throw new BadRequestError('Please select a category')

    if (req.files.length === 0) throw new BadRequestError('Product images not found')
    const createdBy = req['user']!.id
    const images = await FileHandler.upload(req.files, name)

    const product = Product.build({
        name, price, stock, section, category, discount, discountPrice, finalPrice, description, images, createdBy
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

    if (req.body.name === product.name) throw new BadRequestError('Product already exists')

    return res.send(req.body)
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