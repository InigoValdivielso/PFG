import { Outlet } from "react-router-dom";
import NavBarStudent from "./NavBarStudent";

const StudentLayout = () => {
    return (
        <>
        <NavBarStudent />
            <Outlet />
        </>
    );
    };
export default StudentLayout;