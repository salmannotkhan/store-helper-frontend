import { NavLink, useLocation } from "react-router-dom";
import styles from "assets/css/layouts/Footer.module.css";

function Footer() {
    const location = useLocation();

    const activeLink = {
        textDecoration: "underline",
    };

    return (
        <footer>
            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink
                            to={
                                location.pathname.startsWith("/admin")
                                    ? "/admin/services"
                                    : "/services"
                            }
                            style={({ isActive }) =>
                                isActive ? activeLink : null
                            }>
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={
                                location.pathname.startsWith("/admin")
                                    ? "/admin"
                                    : "/"
                            }
                            style={({ isActive }) =>
                                isActive ? activeLink : null
                            }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={
                                location.pathname.startsWith("/admin")
                                    ? "/admin/about"
                                    : "/about"
                            }
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
