import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BubbleForm from '../../../components/BubbleForm';
import BubblesFeed from '../../../components/BubblesFeed';
import MainLayout from '../../../components/MainLayout';
import ManageMenu from '../../../components/ManageMenu';
import useAuthRedirect from '../../../hooks/useAuthRedirect';
import useUser from '../../../hooks/useUser';

type QueryParams = ['all' | 'new'] | ['update', string]

const ManagePage: NextPage = () => {
    useAuthRedirect({to: '/login'});

    const router = useRouter();
    const {slug} = router.query as {slug?: string[]}
    const {user} = useUser();

    useEffect(() => {
        console.log(slug)
        if (!slug) return;
        if (
            slug.length > 2 || 
            ['all', 'new'].includes(slug[0]) && slug.length !== 1 ||
            slug[0] === 'update' && slug.length !== 2
        ) router.replace('/404');
    }, [slug, router])
    
    const params = slug as QueryParams;

    return (
        <MainLayout>
            {
                slug && user &&
                <div className="container px-4 grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
                    <ManageMenu section={params[0]} className="col-span-1 self-start"/>
                    <div className="cols-span-1 md:col-span-3">
                        {
                            params[0] === 'all' ?
                                <BubblesFeed userId={user.id} managable={true}/>
                                :
                                <BubbleForm/>
                        }
                    </div>
                    
                </div>
            }
        </MainLayout>
    )
}

import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['header', 'bubbleForm', 'bubble', 'manage'])),
        // Will be passed to the page component as props
      },
    };
  }


export default ManagePage;
