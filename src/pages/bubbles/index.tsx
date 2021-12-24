import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import BubblesFeed from '../../components/BubblesFeed';
import MainLayout from '../../components/MainLayout';
import type {BubblesResponse} from '../../types/responses';

const UserBubbles: NextPage = () => {
    const router = useRouter();

    const userId = parseInt(router.query['userId'] as string);

    const {data} = useSWR<BubblesResponse>(
        userId ? process.env.NEXT_PUBLIC_API_HOST + `/bubbles?user_id=${userId}` : null);
    
    const {data: user} = useSWR<{username: string}>(
        userId ? process.env.NEXT_PUBLIC_API_HOST + `/user?user_id=${userId}` : null
    )
    return (
        <MainLayout>
            {
                userId && user &&
                <div className='container px-4 py-8 flex flex-col'>
                    <h2 
                        className='text-xl mb-4'
                    >
                        Bubbles пользователя <span className='font-bold'>{user.username}</span>
                    </h2>
                    <BubblesFeed userId={userId}/>
                </div>
            }
            
        </MainLayout>
    )
}

import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['user'])),
        // Will be passed to the page component as props
      },
    };
  }


export default UserBubbles
