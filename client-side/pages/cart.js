import Link from "next/link";
import styles from './Cart.module.css'
import {useSelector} from "react-redux";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'

const Cart = () => {
    const {products: cart} = useSelector(state => state.cart)

    const totalPrice = cart.reduce((acc, curr) => acc + curr.subTotal, 0) //Get total items price

    const addItemUnits = (prod, e) => {

    }

    const reduceCartUnits = (prod, e) => {

    }

    return (
        <div className={styles.cart}>
            {cart.length > 0 ? (
                <>
                    <div className={styles.table_area}>
                        <table className={styles.cart_table}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                                <th>Subtotal (Ksh)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart && cart.map((prod, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className={styles.prod_info}>
                                        <img src={prod.image} alt={prod.name}/>
                                        <div className={styles.prod_desc}>
                                            <h4>{prod.name}</h4>
                                            <h6>{prod.price.toLocaleString()}</h6>
                                        </div>
                                    </td>
                                    <td>{prod.units} * {prod.price.toLocaleString()}</td>
                                    <td>
                                       <div className={styles.actions}>
                                           <AiOutlinePlus onClick={e => addItemUnits(prod, e)}/>
                                           <AiOutlineMinus onClick={e => reduceCartUnits(prod, e)}/>
                                       </div>
                                    </td>
                                    <td>{(prod.units * prod.price).toLocaleString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.sub_total}>
                        <div className={styles.sub_total_info}>
                            <p>Subtotal</p>
                            <h4><span>Ksh.</span> {totalPrice.toLocaleString()}</h4>
                        </div>
                        <button>Checkout</button>
                    </div>
                </>
            ) : (
                <div className={styles.no_items}>
                    <h3>You don't have any items in your cart...</h3>
                    <li>
                        <Link href={'/products'}>
                            <a>Click to Shop</a>
                        </Link>
                    </li>
                </div>
            )}
        </div>
    );
}

export default Cart;