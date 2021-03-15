import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {addAddress, deleteAddress, editAddress, fetchAddresses} from "../controllers/addressController";
import {body} from "express-validator";

const router = express.Router()

router.get('/addresses', requireAuth, fetchAddresses)
router.post('/addresses', [
    body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('addressType').not().isEmpty().withMessage('Address type is required'),
    body('state').not().isEmpty().withMessage('State is required'),
    body('cityTown').not().isEmpty().withMessage('City or Town is required'),
    body('postalCode').not().isEmpty().withMessage('Postal code is required'),
    body('name').not().isEmpty().withMessage('Name is required')
], validateRequest, requireAuth, addAddress)
router.patch('/addresses/:id', requireAuth, editAddress)
router.delete('/addresses/:id', requireAuth, deleteAddress)

export {router as addressRouter}