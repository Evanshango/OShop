import {Dialog, DialogContent} from "@material-ui/core";
import {useState} from "react";
import styles from './../../pages/account/Profile.module.css'

function AuthDialog() {
    const [open, setOpen] = useState(false)

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <div>
            <button className={styles.auth_button} onClick={() => setOpen(true)}>Sign in</button>
            <Dialog open={open} fullWidth maxWidth='sm'>
                <DialogContent>
                    <p>Authenticate user</p>
                    <button onClick={closeDialog}>Close</button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AuthDialog