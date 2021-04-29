import styles from './Pagination.module.css'

const Pagination = ({current, pages, onClick}) => {

    let middlePagination
    if (pages <= 5) {
        middlePagination = [...Array(pages)].map((_, idx) => (
            <button className={styles.icons} key={idx + 1} onClick={() => onClick(idx + 1)}
                    disabled={+current === idx + 1}>
                {idx + 1}
            </button>
        ))
    } else {
        const startValue = Math.floor((current - 1) / 5 * 5)
        middlePagination = (
            <>
                {[...Array(5)].map((_, idx) => (
                    <button className={styles.icons} key={startValue + idx + 1}
                            disabled={+current === startValue + idx + 1}
                            onClick={() => onClick(startValue + idx + 1)}>
                        {startValue + idx + 1}
                    </button>
                ))}
                <button className={styles.icons}>...</button>
                <button onClick={() => onClick(pages)} className={styles.icons}>{pages}</button>
            </>
        )
        if (current > 5) {
            if (pages - current >= 5) {
                middlePagination = (
                    <>
                        <button onClick={() => onClick(1)} className={styles.icons}>1</button>
                        <button className={styles.icons}>...</button>
                        <button onClick={() => onClick(startValue)} className={styles.icons}>{startValue}</button>
                        {[...Array(5)].map((_, idx) => (
                            <button className={styles.icons} key={startValue + idx + 1}
                                    disabled={+current === startValue + idx + 1}
                                    onClick={() => onClick(startValue + idx + 1)}>
                                {startValue + idx + 1}
                            </button>
                        ))}
                        <button className={styles.icons}>...</button>
                        <button onClick={() => onClick(pages)} className={styles.icons}>{pages}</button>
                    </>
                )
            } else {
                let amountLeft = pages - current + 5
                middlePagination = (
                    <>
                        <button onClick={() => onClick(1)} className={styles.icons}>1</button>
                        <button className={styles.icons}>...</button>
                        <button onClick={() => onClick(startValue)} className={styles.icons}>{startValue}</button>
                        {[...Array(amountLeft)].map((_, idx) => (
                            <button className={styles.icons} key={startValue + idx + 1}
                                    style={pages < startValue + idx + 1 ? {display: 'none'} : null}
                                    disabled={+current === startValue + idx + 1}
                                    onClick={() => onClick(startValue + idx + 1)}>
                                {startValue + idx + 1}
                            </button>
                        ))}
                    </>
                )
            }
        }
    }

    return pages > 1 && (
        <div className={styles.pagination}>
            <button className={styles.icons} onClick={() => onClick(current => current - 1)} disabled={+current === 1}>
                &#171;
            </button>
            {middlePagination}
            <button className={styles.icons} onClick={() => onClick(current => current + 1)}
                    disabled={+current === pages}>
                &#187;
            </button>
        </div>
    )
}

export default Pagination