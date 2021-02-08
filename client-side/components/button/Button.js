import Link from "next/link";
import styles from './Button.module.css'

const STYLES = ['btn_primary', 'btn_outline']
const SIZES = ['btn_medium', 'btn_large']

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? `${styles}.${buttonStyle}` : `${styles}.${STYLES[0]}`
    const checkButtonSize = SIZES.includes(buttonSize) ? `${styles}.${buttonSize}` : `${styles}.${SIZES[0]}`

    return (
        <Link href={'/account/signin'}>
            <a className={styles.btn_mobile}>
                <button className={`${styles.btn} ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                    {children}
                </button>
            </a>
        </Link>
    )
}