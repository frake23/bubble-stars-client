import type { NextPage } from 'next'
import LoginForm from '../components/LoginForm'
import useAuthRedirect from '../hooks/useAuthRedirect'

const LoginPage: NextPage = () => {
    useAuthRedirect({ whenLoggedIn: true });
    
    return (
        <div className="min-h-screen flex justify-center items-center">
            <LoginForm/>
        </div>
    )
    
}

export default LoginPage
