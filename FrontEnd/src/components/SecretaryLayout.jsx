import NavBarSecretary from './NavBarSecretary';
import SecretaryPage from '../pages/SecretaryPage';

const SecretaryLayout = () => {
    return (
        <>
            <NavBarSecretary />
            <div className="mx-5 my-5">
                <SecretaryPage />
            </div>
            
        </>
    );
};
export default SecretaryLayout;