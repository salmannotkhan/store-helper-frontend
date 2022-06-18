import { NavLink } from "react-router-dom";
import styles from "assets/css/layouts/Footer.module.css";

function Footer() {
    const activeLink = {
        textDecoration: "underline",
    };

    return (
        <footer>
            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink
                            to="/services"
                            style={({ isActive }) =>
                                isActive ? activeLink : null
                            }>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            style={({ isActive }) =>
                                isActive ? activeLink : null
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            style={({ isActive }) =>
                                isActive ? activeLink : null
                            }>
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
