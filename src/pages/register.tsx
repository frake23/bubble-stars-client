import type { NextPage } from 'next'
import RegisterForm from '../components/RegisterForm'

const Register: NextPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <RegisterForm/>
        </div>
    )
    
}

export default Register
