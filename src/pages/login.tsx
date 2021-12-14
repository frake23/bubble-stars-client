import type { NextPage } from 'next'
import LoginForm from '../components/LoginForm'

const Login: NextPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <LoginForm/>
        </div>
    )
    
}

export default Login
