import type { NextPage } from 'next';
import React from 'react';
import BubbleStats from '../../../components/BubbleStats';
import MainLayout from '../../../components/MainLayout';
import useBubbleId from '../../../hooks/useBubbleId';

const StatsPage: NextPage = () => {
    const {bubbleId} = useBubbleId();

    return (
        <MainLayout>
            <div className="container px-4 py-12 flex-grow flex flex-col">
                <BubbleStats bubbleId={bubbleId}/>
            </div>
        </MainLayout>
    )
}

import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }: {locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['header', 'stats'])),
        // Will be passed to the page component as props
      },
    };
  }


export default StatsPage
