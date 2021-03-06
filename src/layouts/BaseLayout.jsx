import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function BaseLayout() {
    return (
        <>
            <Header title="Some Random Startup" />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default BaseLayout;
