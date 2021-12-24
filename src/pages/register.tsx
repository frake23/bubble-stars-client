import type { NextPage } from 'next'
import RegisterForm from '../components/RegisterForm'
import useAuthRedirect from '../hooks/useAuthRedirect';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

const RegisterPage: NextPage = () => {
    useAuthRedirect({ whenLoggedIn: true });

    return (
        <div className="min-h-screen flex justify-center items-center">
            <RegisterForm/>
        </div>
    )
    
}

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['register'])),
        // Will be passed to the page component as props
      },
    };
  }

export default RegisterPage
