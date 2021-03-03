import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import styles from './Section.module.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import {useDispatch, useSelector} from "react-redux";
import {addCategory, addSection, clearCatErrors, clearSectErrors} from "../../../api";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

function SectionCategoryDialog({title, dt}) {
    const [open, setOpen] = useState(false)
    const [sec, setSec] = useState('')
    const [name, setName] = useState('')

    const {sections, errors: secErrors} = useSelector(state => state.sections)
    const {errors: catErrors} = useSelector(state => state.categories)
    const dispatch = useDispatch()

    const clearInputs = () => {
        setName('')
        setSec('')
    }

    const closeDialog = () => {
        if (secErrors.length > 0) {
            dispatch(clearSectErrors())
        }

        if (catErrors.length > 0) {
            dispatch(clearCatErrors())
        }

        clearInputs()
        setOpen(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (title && title.match(/^Section/)) {
            dispatch(addSection(name))
        } else {
            dispatch(addCategory({section: sec, name}))
        }
        clearInputs()
    }

    const renderErrors = (
        <>
            {secErrors.length > 0 && (
                <div className={styles.errors}>
                    {secErrors.map(error => <li key={error.message}>{error.message}</li>)}
                </div>
            )}
            {catErrors.length > 0 && (
                <div className={styles.errors}>
                    {catErrors.map(error => <li key={error.message}>{error.message}</li>)}
                </div>
            )}
        </>
    )

    const renderInputArea = (title, data) => (
        <>
            {title.match(/^Category/) ? (renderOptions(null)) : (data?.section && (renderOptions(data)))}
            <p>Name*</p>
            <input name='name' placeholder='Name' onChange={e => setName(e.currentTarget.value)}
                   value={dt ? dt.name : name}/>
            {renderErrors}
        </>
    )

    const renderOptions = (data) => (
        <>
            <p>Section*</p>
            <select defaultValue={data ? data.section?.name : 'Select...'} name='section'
                    onChange={e => setSec(e.target.value)}>
                <option value={data ? data.section?.name : 'Select...'} disabled
                        hidden>{data ? data.section?.name : 'Select...'}</option>
                {sections.length > 0 && (sections.map(section => (
                        <option value={section.id} key={section.id}>{section.name}</option>
                    ))
                )}
            </select>
        </>
    )


    return (
        <>
            {dt ? (
                <span onClick={() => setOpen(true)}><EditOutlinedIcon/> <h5>Edit</h5></span>
            ) : (
                <button onClick={() => setOpen(true)}>Add New <span><AddOutlinedIcon/></span></button>
            )}

            <Dialog open={open} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <span className={styles.dialog_title}>
                        {dt ? (`Edit ${dt.section ? 'Category' : 'Section'}`) : (`Add ${title && title}`)}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className={styles.content}>
                        {title ? (renderInputArea(title, null)) : (renderInputArea('', dt))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className={styles.buttons}>
                        <button type='submit' onClick={closeDialog}>Cancel</button>
                        <button type='submit' onClick={handleSubmit}>Save</button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SectionCategoryDialog;