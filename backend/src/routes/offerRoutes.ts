import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {activeOffers, addOffer, deleteOffer, fetchOffers} from "../controllers/offerController";
import {body} from "express-validator";
import {isAdmin} from "../middlewares/is-admin";


const router = express.Router()

router.get('/offers', fetchOffers)
router.get('/offers/active', activeOffers)
router.post('/offers', [
    body('product').not().isEmpty().withMessage('Please choose a product'),
    body('duration').not().isEmpty().withMessage('Please specify offer duration')
], validateRequest, requireAuth, isAdmin, addOffer)
router.delete('/offers/:id', requireAuth, isAdmin, deleteOffer)

export {router as offerRouter}