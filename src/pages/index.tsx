import type { NextPage } from 'next'
import BubblesFeed from '../components/BubblesFeed'
import MainLayout from '../components/MainLayout'

const HomePage: NextPage = () => {
  return (
    <MainLayout>
      <div className="container px-4 py-16">
        <BubblesFeed/>
      </div>
    </MainLayout>
  )
}

export default HomePage
