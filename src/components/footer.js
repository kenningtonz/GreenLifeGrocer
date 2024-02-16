const Footer = () => {
    return (
        <footer className="footer">
            <span className="flex">
                <section className="child50">
                    <p>GreenLife Grocer</p>
                    <p>Nourishing You Body, Nurturing the Planet</p>
                </section>
                <section className="flex child30">
                    <section>
                        <p>Departments</p>
                        <ul className="flex wrap">
                            <li><a>Produce</a></li>
                            <li><a>Meat</a></li>
                            <li><a>Dairy & Eggs</a></li>
                            <li><a>Bakery</a></li>
                            <li><a>Pantry</a></li>
                            <li><a>Frozen</a></li>
                            <li><a>Household</a></li>
                            <li><a>Health & Beauty</a></li>
                            <li><a>Other</a></li>
                        </ul>
                    </section>

                    <section>
                        <p>Account</p>
                        <ul className="flex wrap">
                            <li><a>Sign In</a></li>
                            <li><a>Cart</a></li>
                            <li><a>My Account</a></li>

                        </ul>
                    </section>
                </section>
            </span>


            <p className="copyright">&copy; 2024</p>
        </footer>
    )
}

export default Footer;