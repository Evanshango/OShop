import {AiFillStar} from "react-icons/ai";
import {RiStarHalfLine, RiStarLine} from "react-icons/ri";

const Rating = ({rating}) => {
    const formatRating = () => {
        return Number.isInteger(rating) ? `${rating}.0` : rating
    }

    let stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<AiFillStar size={15} key={i}/>)
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
           stars.push(<RiStarHalfLine size={15} key={i}/>)
        } else {
            stars.push(<RiStarLine size={15} key={i}/>)
        }
    }

    return(
        <small style={{display: 'flex', alignItems: 'center'}}>
            {stars} {rating > 0 ? `(${formatRating()})`: ''}
        </small>
    )
}

export default Rating