import type { NextPage } from 'next'
import LoginForm from '../components/LoginForm'
import useAuthRedirect from '../hooks/useAuthRedirect'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const LoginPage: NextPage = () => {
    useAuthRedirect({ whenLoggedIn: true });
    
    return (
        <div className="min-h-screen flex justify-center items-center">
            <LoginForm/>
        </div>
    )
    
}

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['login'])),
        // Will be passed to the page component as props
      },
    };
  }

export default LoginPage
