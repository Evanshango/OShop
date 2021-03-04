import React, {createRef, useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import styles from './Products.module.css'
import {useDispatch, useSelector} from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {addProduct, clearProdErrors, fetchCategoriesBySectionId} from "../../../api";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

function ProductDialog({data}) {
    const dispatch = useDispatch()

    const fileRef = createRef()

    const {sections} = useSelector(state => state.sections)
    const {errors: prodErrors} = useSelector(state => state.products)

    const [open, setOpen] = useState(false)
    const [images, setImages] = useState([])
    const [preview, setPreview] = useState([])
    const [errors, setErrors] = useState([])
    const [categories, setCategories] = useState([])
    const [sec, setSec] = useState(data && data.category && data.category.section ? data.category.section.name : '')
    const [cat, setCat] = useState(data && data.category ? data.category.name : '')
    const [product, setProduct] = useState(data ? {...data} : {
        name: '', price: 0, stock: 0, discount: 0, description: '', finalPrice: 0, discountPrice: 0, category: {},
    })

    const initialSec = sections.find(section => section.name === sec)

    const clearInputs = () => {
        !data && setProduct({
            name: '', price: 0, stock: 0, discount: 0, description: '', finalPrice: 0, discountPrice: 0,
        })
        setSec('')
        setCat('')
        setPreview([])
    }

    const closeDialog = () => {
        clearInputs()
        if (prodErrors.length > 0) dispatch(clearProdErrors())
        setOpen(false)
    }

    const checkFiles = files => {
        const fileArray = Array.from(files).filter(f => f.type.match('image/*')).map(file => URL.createObjectURL(file))
        setPreview((preview) => preview.concat(fileArray))
        return Array.from(files).filter(file => file.type.match('image/*'))
    }

    const renderImages = source => source.map(image => <img src={image} alt="" key={image}/>)

    useEffect(async () => {
        if (initialSec) {
            const result = await fetchCategoriesBySectionId(initialSec.id)
            if (result['errors']) setErrors(result['errors'])
            setCategories(result)
        }
    }, [sec])

    const handleChange = e => setProduct({
        ...product,
        [e.target.name]: e.target.value,
        section: initialSec && initialSec.id,
        category: cat
    })

    const formatPrice = () => {
        const value = parseFloat(product.price)
        if (isNaN(value)) {
            setProduct({...product, price: 0, discountPrice: 0})
            return
        }

        setProduct({...product, price: value.toFixed(2), discountPrice: value.toFixed(2)})
    }

    const handleSubmit = e => {
        e.preventDefault()
        const discountPrice = (product.price * (product.discount * 0.01)).toFixed(2)
        const finalPrice = (product.price - (product.price * (product.discount * 0.01))).toFixed(2)

        const updated = {...product, finalPrice, discountPrice}

        let formData = new FormData()
        Object.keys(updated).forEach(key => {
            formData.append(key, updated[key])
        })
        images.forEach(image => formData.append('image', image))

        dispatch(addProduct(formData))

        clearInputs()
    }

    const renderErrors = prodErrors.length > 0 && <div className={styles.errors}>
        {prodErrors.map(error => <li key={error.message}>{error.message}</li>)}
    </div>

    return (
        <>
            {data ? (
                <span onClick={() => setOpen(true)}><EditOutlinedIcon/> <h5>Edit</h5></span>
            ) : (
                <button onClick={() => setOpen(true)}>Add New</button>
            )}
            <Dialog open={open} fullWidth maxWidth='md'>
                <DialogTitle><span className={styles.dialog_title}>{data ? 'Edit' : 'Add'} Product</span></DialogTitle>
                <DialogContent>
                    <div className={styles.sec_cat_area}>
                        <div className={styles.section}>
                            <p>Section*</p>
                            <select name='section' defaultValue={sec !== '' ? sec : 'Select...'}
                                    onChange={e => setSec(e.currentTarget.value)}>
                                <option value={sec !== '' ? sec : 'Select...'} disabled hidden>
                                    {sec !== '' ? sec : 'Select...'}
                                </option>
                                {sections.length > 0 && (sections.map(section => (
                                    <option value={section.name} key={section.id}>{section.name}</option>)
                                ))}
                            </select>
                        </div>
                        <div className={styles.category}>
                            <p>Category*</p>
                            {errors.length > 0 ? (
                                <p style={{color: '#ff0000', textAlign: 'center'}}>Unable to fetch Categories</p>
                            ) : (
                                <select name="category" defaultValue={cat !== '' ? cat : 'Select...'}
                                        onChange={e => setCat(e.currentTarget.value)} disabled={sec === ''}>
                                    <option value={cat !== '' ? cat : 'Select...'} disabled hidden>
                                        {cat !== '' ? cat : 'Select...'}
                                    </option>
                                    {categories.length > 0 && (categories.map(category => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    )))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className={styles.add_new}>
                        <div className={styles.row_one}>
                            <span>
                                <h5>Product Name*</h5>
                                <input name='name' placeholder='Product Name' onChange={handleChange}
                                       value={product.name}/>
                            </span>
                            <span>
                                <h5>Price*</h5>
                                <input type="number" name='price' placeholder='Price' onChange={handleChange}
                                       value={product.price} onBlur={formatPrice}/>
                            </span>
                            <span>
                                <h5>Stock*</h5>
                                <input type="text" name='stock' placeholder='Stock' onChange={handleChange}
                                       value={product.stock}/>

                            </span>
                        </div>
                        <div className={styles.row_two}>
                            <span>
                                <h5>Discount(%)</h5>
                                <input type="number" name='discount' placeholder='Discount' onChange={handleChange}
                                       value={product.discount}/>
                            </span>
                            <span>
                                <h5>Discount Price*</h5>
                                <input type="text" onChange={handleChange} disabled value={
                                    (product.price * (product.discount * 0.01)).toFixed(2)
                                }/>
                            </span>
                            <span>
                                <h5>Final Price*</h5>
                                <input type="text" onChange={handleChange}
                                       value={(product.price - (product.price * (product.discount * 0.01))).toFixed(2)}/>
                            </span>
                        </div>
                        <div className={styles.product_description}>
                            <h5>Product Description*</h5>
                            <textarea placeholder='Description' name='description' onChange={handleChange}
                                      value={product.description}/>
                        </div>
                        <div className={styles.preview_images}>
                            {data ? (renderImages(data?.images)) : preview.length > 0 && renderImages(preview)}
                        </div>
                        <input style={{display: 'none'}} type="file" ref={fileRef} multiple accept='image/*'
                               onChange={e => setImages((images) => images.concat(checkFiles(e.target.files)))}/>
                        <div className={styles.upload_button}>
                            <button onClick={() => fileRef.current.click()}>
                                Choose files <span><CloudUploadIcon/></span>
                            </button>
                        </div>
                        {preview.length <= 0 && (
                            <div className={styles.no_image}>
                                <p>No images selected</p>
                            </div>
                        )}
                    </div>
                    {renderErrors}
                </DialogContent>
                <DialogActions>
                    <button className={styles.cancel} onClick={closeDialog}>Cancel</button>
                    <button className={styles.save} onClick={handleSubmit}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProductDialog;