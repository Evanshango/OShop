import styles from './products/NewProducts.module.css'
const Content = ({children}) => {
    return(
        <div className={styles.main_container}>
            {children}
        </div>
    )
}

export default Content