import {Request, Response} from "express";
import {Product} from "../models/product";

export const fetchProducts = async (req: Request, res: Response) => {
    const products = await Product.find({})
    res.send(products)
}

export const addProduct = async (req: Request, res: Response) => {

}