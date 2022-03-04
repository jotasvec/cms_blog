import { useRouter } from 'next/router';
import React from 'react';

import { getCategories, getPostByCategories } from "../../services";

import { PostCard, Categories, Loader } from "../../components";

const postsCategories = ({posts}) => {

    const router = useRouter();

    if (router.isFallback){
        return <Loader />
    }
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    { 
                        posts.map((post, index) => (
                            <PostCard post={post.node} key={index} />
                        ))
                    }
                </div>
                {/* sidebar */}
                <div className="col-span-1 lg:col-span-4">
                    <div className="lg:sticky relative top-8">
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default postsCategories;

export async function getStaticProps({params}){
    const posts = (await getPostByCategories(params.slug)) || [];

    return{
        props: {posts}
    }
}
export async function getStaticPaths(){
    const categories = await getCategories();

    return{
        paths: categories.map(({slug})=> ({params: { slug }})),
        fallback: true,
    }
}
