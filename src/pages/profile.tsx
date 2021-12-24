import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import MainLayout from '../components/MainLayout';
import fetcher from '../fetcher';
import useAuthRedirect from '../hooks/useAuthRedirect';
import useUser from '../hooks/useUser';

const ProfilePage: NextPage = () => {
    const router = useRouter();
    const {mutate} = useUser();
    useAuthRedirect();

    return (
        <MainLayout>
            <div className='container px-4 py-8'>
                <Button title="Выйти" color="red" onClick={async () => {
                    await fetcher(process.env.NEXT_PUBLIC_API_HOST + '/auth/logout', {method: 'DELETE'})
                    mutate!()
                }}/>
            </div>
            
        </MainLayout>
    )
}

import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['register'])),
        // Will be passed to the page component as props
      },
    };
  }

export default ProfilePage
