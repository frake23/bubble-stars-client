import type { NextPage } from 'next'
import RegisterForm from '../components/RegisterForm'
import useAuthRedirect from '../hooks/useAuthRedirect';

const RegisterPage: NextPage = () => {
    useAuthRedirect({ whenLoggedIn: true });

    return (
        <div className="min-h-screen flex justify-center items-center">
            <RegisterForm/>
        </div>
    )
    
}

export default RegisterPage
