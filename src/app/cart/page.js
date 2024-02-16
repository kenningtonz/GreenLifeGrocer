


export default function Cart() {

    return (
        <main className="p1">
            <h1 className="text32 textCenter">Your Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Tax</th>
                        <th>x</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="flex gap1 alignCenter" >
                            <div className="cartImage"></div>
                            <span>
                                <p className="text20" >Chocolate Chips, Sugar Free </p>
                                <p>Hershey's</p>
                            </span>
                        </td>
                        <td>$3.57</td>
                        <td>
                            <div className="quantityButton">
                                <button>-</button>
                                <p>2</p>
                                <button>+</button>
                            </div>
                        </td>
                        <td>$7.14</td>
                        <td>Y</td>
                        <td>x</td>
                    </tr>
                    <tr>
                        <td className=" gap1 flex alignCenter" >
                            <div className="cartImage"></div>
                            <span>
                                <p className="text20" >Milk Chocolate Chips</p>
                                <p>Hershey's</p>
                            </span>
                        </td>
                        <td>$3.57</td>
                        <td>
                            <div className="quantityButton">
                                <button>-</button>
                                <p>3</p>
                                <button>+</button>
                            </div>
                        </td>
                        <td>$10.71</td>
                        <td>Y</td>
                        <td>x</td>
                    </tr>
                    <tr>
                        <td className=" gap1 flex alignCenter" >
                            <div className="cartImage"></div>
                            <span>
                                <p className="text20" >Baking Chocolate Squares, Semi-Sweet</p>
                                <p>Baker's</p>
                            </span>
                        </td>
                        <td>$2.59</td>
                        <td>
                            <div className="quantityButton">
                                <button>-</button>
                                <p>1</p>
                                <button>+</button>
                            </div>
                        </td>
                        <td>$2.59</td>
                        <td>Y</td>
                        <td>x</td>
                    </tr>
                </tbody>
            </table>
            <section className="cartTotal">
                <span >
                    <p>Subtotal:</p>
                    <p>$20.44</p>
                </span>
                <span>
                    <p>Tax:</p>
                    <p>$2.66</p>
                </span>
                <span>
                    <p>Total:</p>
                    <p>$23.10</p>
                </span>
                <button className="button">Checkout</button>
            </section>
        </main>
    )
}