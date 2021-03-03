import React, {createRef, useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import styles from './Products.module.css'
import {useDispatch, useSelector} from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {addProduct, fetchCategoriesBySectionId} from "../../../api";

function ProductDialog() {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [highlighted, setHighlighted] = useState(false)
    const [images, setImages] = useState([])
    const [preview, setPreview] = useState([])
    const [errors, setErrors] = useState([])
    const [categories, setCategories] = useState([])
    const [sec, setSec] = useState('')
    const [cat, setCat] = useState('')
    const [product, setProduct] = useState({
        name: '', price: 0, stock: 0, discount: 0, description: '', finalPrice: 0, discountPrice: 0
    })

    const fileRef = createRef()

    const {sections} = useSelector(state => state.sections)

    const closeDialog = () => {
        setOpen(false)
    }

    const checkFiles = files => {
        const fileArray = Array.from(files).filter(f => f.type.match('image/*')).map(file => URL.createObjectURL(file))
        setPreview((preview) => preview.concat(fileArray))
        return Array.from(files).filter(file => file.type.match('image/*'))
    }

    const handleDrop = e => {
        e.preventDefault()
        setImages((images) => images.concat(checkFiles(e.dataTransfer.files)))
        setHighlighted(false)
    }

    const renderImages = source => (
        source.map(image => (
            <img src={image} alt="" key={image}/>
        ))
    )

    useEffect(async () => {
        if (sec !== '') {
            const result = await fetchCategoriesBySectionId(sec)
            if (result.errors) setErrors(result.errors)
            setCategories(result)
        }
    }, [sec])

    const handleChange = e => setProduct({...product, [e.target.name]: e.target.value, section: sec, category: cat})

    const handleSubmit = async e => {
        e.preventDefault()
        const discountPrice = product.price * (product.discount * 0.01)
        const finalPrice = product.price - (product.price * (product.discount * 0.01))

        const updated = {...product, finalPrice, discountPrice}

        let formData = new FormData()
        Object.keys(updated).forEach(key => {
            formData.append(key, updated[key])
        })
        images.forEach(image => formData.append('image', image))

        dispatch(addProduct(formData))
    }

    return (
        <>
            <button onClick={() => setOpen(true)}>Add New</button>
            <Dialog open={open} fullWidth maxWidth='md'>
                <DialogTitle><span className={styles.dialog_title}>Add Product</span></DialogTitle>
                <DialogContent>
                    <div className={styles.sec_cat_area}>
                        <div className={styles.section}>
                            <p>Section*</p>
                            <select defaultValue={'Select...'} name='section' onChange={e => setSec(e.target.value)}>
                                <option value="Select..." disabled hidden>Select...</option>
                                {sections.length > 0 && (sections.map(section => (
                                        <option value={section.id} key={section.id}>{section.name}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className={styles.category}>
                            <p>Category*</p>
                            {errors.length > 0 ? (
                                <p style={{color: '#ff0000', textAlign: 'center'}}>Unable to fetch Categories</p>
                            ) : (
                                <select defaultValue={'Select...'} name='category' disabled={sec === ''}
                                        onChange={e => setCat(e.target.value)}>
                                    <option value="Select..." disabled hidden>Select...</option>
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
                                <input type="text" name='name' placeholder='Product Name' value={product.name}
                                       onChange={handleChange}/>
                            </span>
                            <span>
                                <h5>Price*</h5>
                                <input type="number" name='price' placeholder='Price' value={product.price}
                                       onChange={handleChange}/>
                            </span>
                            <span>
                                <h5>Stock*</h5>
                                <input type="text" name='stock' placeholder='Stock' value={product.stock}
                                       onChange={handleChange}/>
                            </span>
                        </div>
                        <div className={styles.row_two}>
                            <span>
                                <h5>Discount(%)</h5>
                                <input type="number" name='discount' placeholder='Discount' value={product.discount}
                                       onChange={handleChange}/>
                            </span>
                            <span>
                                <h5>Discount Price*</h5>
                                <input type="text" value={product.price * (product.discount * 0.01)}
                                       onChange={handleChange}/>
                            </span>
                            <span>
                                <h5>Final Price*</h5>
                                <input type="text" value={product.price - (product.price * (product.discount * 0.01))}
                                       onChange={handleChange}/>
                            </span>
                        </div>
                        <div className={styles.product_description}>
                            <h5>Product Description*</h5>
                            <textarea placeholder='Description' name='description' value={product.description}
                                      onChange={handleChange}/>
                        </div>
                        <input style={{display: 'none'}} type="file" ref={fileRef} multiple accept='image/*'
                               onChange={e => setImages((images) => images.concat(checkFiles(e.target.files)))}/>
                        <div onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                             onClick={() => fileRef.current.click()}
                             className={highlighted ? `${styles.image_area} ${styles.highlighted}` : `${styles.image_area}`}
                             onDragEnter={() => setHighlighted(true)} onDragLeave={() => setHighlighted(false)}>
                            <CloudUploadIcon/>
                            <p>Click to choose file or Drag and drop</p>
                        </div>
                        <div className={styles.preview_container}>
                            {preview.length > 0 ? (
                                <div className={styles.preview_images}>
                                    {renderImages(preview)}
                                </div>
                            ) : <p>No images to preview</p>}
                        </div>
                    </div>
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