import NavBarSecretary from './NavBarSecretary';
import { Outlet } from 'react-router-dom';

const SecretaryLayout = () => {
    return (
        <>
            <NavBarSecretary />
            <div className="mx-5 my-5">
                <Outlet />
            </div>
            
        </>
    );
};
export default SecretaryLayout;