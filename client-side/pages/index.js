import styles from './../styles/Home.module.css'
import Slider from "../components/slider/Slider";
import NewProduct from "../components/products/NewProduct";
import Content from "../components/Content";
import Offer from "../components/offers/Offer";

const images = [
    '/img_1.jpg',
    '/img_2.jpg',
    '/img_9.jpg',
    '/img_home.jpg'
]

const Home = ({userInfo}) => {
    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <>
            <Slider images={images}>
                <div className={styles.home_content}>
                    <div className={styles.welcome_info}>
                        <h1>New Arrivals</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque dolor dolorem eligendi
                            perspiciatis repellat tempore voluptas? Atque, consectetur, doloribus?
                        </p>
                        <button className={styles.home_button}>View Products</button>
                    </div>
                    <div className={styles.featured_container}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis est excepturi inventore,
                            possimus repellat sapiente velit veritatis voluptate. Dolor, minima.
                        </p>
                    </div>
                </div>
            </Slider>
            <Content>
                <NewProduct name={'New Products'}/>
                <Offer/>
                <NewProduct name={'Featured Products'}/>
                <div className={styles.newsletter}>
                    <div className={styles.contact_left}>
                        <h1>Subscribe to our Newsletter</h1>
                        <p>
                            Leave your email address if you would like to get notifications about our offers
                        </p>
                    </div>
                    <div className={styles.contact_right}>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder='Enter email address'/>
                            <button type='button'>Subscribe</button>
                        </form>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default Home
