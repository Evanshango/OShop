import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import styles from './Offer.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addOffer, clearOffersError} from "../../../api";

function OfferDialog({productId}) {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.product)
    const [open, setOpen] = useState(false)
    const [duration, setDuration] = useState(1)
    const [product, setProduct] = useState({})

    const closeDialog = () => {
        setOpen(false)
        dispatch(clearOffersError())
    }

    const openDialog = () => {
        setOpen(true)
        if (productId !== undefined) {
            const prod = products.find(p => p.id === productId)
            setProduct(prod)
        }
    }

    const handleSubmit = async () => {
        const offer = {product: productId, duration: +duration}
        const id = await dispatch(addOffer(offer))
        id ? closeDialog() : setOpen(true)
    }

    return (
        <>
            <span className={styles.offer_button} onClick={openDialog}>Offer</span>
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth='xs'>
                <DialogTitle>Set Offer on Product</DialogTitle>
                <DialogContent>
                    <div className={styles.product_info}>
                        <h4>{product.name}</h4>
                        <h5><small>Ksh.</small> {product.finalPrice?.toFixed(2)}</h5>
                    </div>
                    <p className={styles.duration_label}>Duration*</p>
                    <select name="offer" className={styles.offer_duration}
                            onChange={e => setDuration(e.currentTarget.value)}>
                        {[...Array(7)].map((val, index) => (
                            <option value={index + 1} key={index}>{`${index + 1} day(s)`}</option>
                        ))}}
                    </select>
                </DialogContent>
                <DialogActions>
                    <button className={styles.save_button} onClick={() => handleSubmit()}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default OfferDialog;