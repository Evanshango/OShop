import React, {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import styles from './Products.module.css'
import {addProduct, clearProdErrors, fetchCategoriesBySectionId, updateProduct} from "../../../api";
import _ from 'lodash'
import {Input} from "../../input/Input";

const ProductDialog = ({data}) => {
    const dispatch = useDispatch()
    const {products, errors: prodErrors, loading} = useSelector(state => state.product)
    const {sections} = useSelector(state => state.section)
    const fileRef = createRef()

    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: '', price: 0, stock: 0, discount: 0, description: '', finalPrice: 0, discountPrice: 0, featured: false
    })
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState([])
    const [preview, setPreview] = useState([])
    const [sec, setSec] = useState('')
    const [cat, setCat] = useState('')
    const [errors, setErrors] = useState([])
    const [featured, setFeatured] = useState(false)

    const initialSec = sections.find(section => section.name === sec)

    useEffect(async () => {
        if (initialSec) {
            const result = await fetchCategoriesBySectionId(initialSec.id)
            if (result['errors']) setErrors(result['errors'])
            setCategories(result)
        }
    }, [data, sec])

    const clearInputs = () => {
        !data && setProduct({
            name: '', price: 0, stock: 0, discount: 0, description: '', finalPrice: 0, discountPrice: 0, featured: false
        })
        setSec('')
        setCat('')
        setPreview([])
        setImages([])
    }

    const openDialog = () => {
        setOpen(true)
        if (data !== undefined) {
            const prod = products.find(p => p.id === data)
            setProduct(prod)
            setSec(prod.category.section.name)
            setCat(prod.category.id)
            setFeatured(prod.featured)
            setImages(prod.images)
        }
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

    const handleSubmit = e => {
        e.preventDefault()

        const discountPrice = (product.price * (product.discount * 0.01)).toFixed(2)
        const finalPrice = (product.price - (product.price * (product.discount * 0.01))).toFixed(2)

        let section = data !== undefined ? product.section : sections.find(s => s.name === sec)?.id

        const updated = {...product, finalPrice, discountPrice, category: cat, featured, section}

        if (data !== undefined) {
            dispatch(updateProduct(updated))
        } else {
            let formData = new FormData()
            Object.keys(updated).forEach(key => formData.append(key, updated[key]))
            images.forEach(image => formData.append('image', image))
            dispatch(addProduct(formData))
        }
    }

    useEffect(() => {
        if (!loading && prodErrors.length === 0){
            closeDialog()
        }
    }, [loading])

    const formatPrice = () => {
        const value = parseFloat(product.price)
        if (isNaN(value)) {
            setProduct({...product, price: 0, discountPrice: 0})
            return
        }
        setProduct({...product, price: value.toFixed(2), discountPrice: value.toFixed(2)})
    }

    const handleChange = e => setProduct({
        ...product,
        [e.target.name]: e.target.value,
        section: initialSec && initialSec.id,
        category: cat
    })

    const renderErrors = prodErrors.length > 0 && <div className={styles.errors}>
        {prodErrors.map(error => <li key={error.message}>{error.message}</li>)}
    </div>

    return (
        <>
            {data ? (
                <span onClick={openDialog}><EditOutlinedIcon/> <h5>Edit</h5></span>
            ) : (
                <button onClick={() => setOpen(true)}>Add New</button>
            )}
            <Dialog open={open} fullWidth maxWidth='md' onClose={closeDialog}>
                <DialogTitle><span className={styles.dialog_title}>{data ? 'Edit' : 'Add'} Product</span></DialogTitle>
                <DialogContent>
                    <div className={styles.sec_cat_area}>
                        <div className={styles.section}>
                            <p>Section*</p>
                            <select name="section" onChange={e => setSec(e.currentTarget.value)}
                                    defaultValue={data !== undefined ? sec : 'Select...'}>
                                <option value={data !== undefined ? sec : 'Select...'} disabled hidden>
                                    {data !== undefined ? sec : 'Select...'}
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
                                <select name="category" onChange={e => setCat(e.currentTarget.value)}
                                        defaultValue={data !== undefined ? cat : 'Select...'} disabled={sec === ''}>
                                    <option value={data !== undefined ? cat : 'Select...'} disabled hidden>
                                        {!_.isEmpty(product) ? product.category?.name : 'Select...'}
                                    </option>
                                    {categories.length > 0 && (categories.map(category => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    )))}
                                </select>
                            )}
                        </div>
                        <div className={styles.featured}>
                            <p>Featured(Optional)</p>
                            <select name="featured" defaultValue={featured}
                                    onChange={e => setFeatured(e.currentTarget.value)}>
                                <option value={featured} disabled hidden>{featured ? 'True' : 'False'}</option>
                                <option value={false}>False</option>
                                <option value={true}>True</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.add_new}>
                        <div className={styles.top_row}>
                            <Input name={'name'} placeholder={'Product Name'} label={'Product Name*'} type={'text'}
                                   onchange={handleChange} value={product.name}/>
                            <Input name={'price'} placeholder={'Price'} label={'Price*'} type={'number'}
                                   onblur={formatPrice} onchange={handleChange} value={product.price}/>
                            <Input name={'stock'} placeholder={'Stock'} label={'Stock*'} type={'number'}
                                   onchange={handleChange} value={product.stock}/>
                            <Input name={'discount'} placeholder={'Discount'} label={'Discount(%)'} type={'number'}
                                   onchange={handleChange} value={product.discount}/>
                            <Input label={'Discount Price'} type={'text'} disable={true} onchange={handleChange}
                                   value={(product.price * (product.discount * 0.01)).toFixed(2)}/>
                            <Input label={'Final Price'} type={'text'} disable={true} onchange={handleChange}
                                   value={(product.price - (product.price * (product.discount * 0.01))).toFixed(2)}/>
                        </div>
                        <Input name={'owner'} placeholder={'Product Owner'} label={'Product Owner*'} type={'text'}
                               onchange={handleChange} value={product.name}/>
                        <div className={styles.product_description}>
                            <h5>Product Description*</h5>
                            <textarea placeholder='Description' name='description' onChange={handleChange}
                                      value={product.description}/>
                        </div>
                        <div className={styles.preview_images}>
                            {data ? (renderImages(images)) : preview.length > 0 && renderImages(preview)}
                        </div>
                        <input style={{display: 'none'}} type="file" ref={fileRef} multiple accept='image/*'
                               onChange={e => setImages((images) => images.concat(checkFiles(e.target.files)))}/>
                        <div className={styles.upload_button}>
                            <button onClick={() => fileRef.current.click()}>
                                Choose files <span><CloudUploadIcon/></span>
                            </button>
                        </div>
                        {data === undefined && preview.length <= 0 && (
                            <div className={styles.no_image}><p>No images selected</p></div>
                        )}
                    </div>
                    {renderErrors}
                </DialogContent>
                <DialogActions>
                    <button className={styles.cancel} onClick={closeDialog}>Cancel</button>
                    <button className={styles.save} onClick={handleSubmit}>
                        {data !== undefined ? 'Update' : 'Save'}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProductDialog;
