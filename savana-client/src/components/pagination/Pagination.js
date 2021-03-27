import styles from './Pagination.module.css'

const generatePages = (current, last, range) => {
    const numbers = []
    let left = true
    let right = true
    for (let n = 1; n <= last; n++) {
        if (n === 1 || n === last || (n >= current - range && n <= current + range)) {
            numbers.push({value: n})
        } else if (left && n < current) {
            left = false
            const value = Math.ceil((current - range + 1) / 2)
            numbers.push({value, dots: true})
        } else if (right && n > current) {
            right = false
            const value = Math.floor((current + range + last) / 2)
            numbers.push({value, dots: true})
        }
    }
    return numbers
}

const Pagination = ({current, last, range, onClick}) => {

    return (
        <ul className={styles.pagination}>
            {generatePages(current, last, range).map(({value, dots}) => (
                <li key={value} onClick={() => onClick(value)}
                    className={current === value ? `${styles.active_page}` : null}>
                    {dots ? '...' : value}
                </li>
            ))}
        </ul>
    )
}

export default Pagination