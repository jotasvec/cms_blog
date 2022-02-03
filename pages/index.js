import Head from 'next/head'
import { Categories, PostCard, PostWidget } from '../components'

// import Image from 'next/image'
// import styles from '../styles/Home.module.css'


const posts = [
  {title: 'React Testing', excerpt: 'Learn React Testing'},
  {title: 'React with Tailwind', excerpt: 'Learn React with tailwind'}
];

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Body */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Main Content  */}
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>

        {/* sidebar */}
        <div className='lg:col-span-4 col-span-1'>
          <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
          </div>
        </div>
        
      </div>
    </div>
  )
}
