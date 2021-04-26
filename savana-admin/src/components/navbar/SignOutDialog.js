import React, {useState} from 'react';
import styles from "./Navbar.module.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {signOutUser} from "../../api";

function SignOutDialog({user}) {
    const [open, setOpen] = useState(false)
    const closeDialog = () => setOpen(false)
    const dispatch = useDispatch()

    const handleSignout = () => dispatch(signOutUser())

    return (
        <>
            <div className={styles.navbar_right} onClick={() => setOpen(true)}>
                {user && <p style={{color: 'black'}}>{user.email} <span><ArrowDropDownIcon/></span></p>}
            </div>
            <Dialog open={open} fullWidth maxWidth='sm'>
                <DialogContent>
                    <p>Are you sure you want to Signout. Click OK to proceed, otherwise Cancel</p>
                </DialogContent>
                <DialogActions>
                    <button className={styles.cancel} onClick={closeDialog}>Cancel</button>
                    <button className={styles.ok} onClick={handleSignout}>OK</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SignOutDialog;