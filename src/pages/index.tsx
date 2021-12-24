import type { NextPage } from 'next'
import BubblesFeed from '../components/BubblesFeed'
import MainLayout from '../components/MainLayout'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <div className="container px-4 py-16">
        <BubblesFeed/>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps({ locale }: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['header', 'bubble'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage
