import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getFeaturedPosts } from "../services";
import { FeaturedPostCard } from "../components";

const FeaturedPost = () => {
    const [topPosts, setTopPosts] = useState([])
    // const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        getFeaturedPosts().then((res) => {
            setTopPosts(res)
            // setDataLoaded(true)
        });
        
    }, [])

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 768, min: 640 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 640, min: 0 },
          items: 1,
        },
      };
    
    console.log('featurePosts', topPosts)
    
    return (
        <div className='snap-x mb-8'>
            <Carousel
                responsive={responsive} 
                className='gap-16' 
                infinite={true}
                showDots={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass='px-4'
                arrows={true}
                >
                {
                    topPosts.length > 0 && topPosts.map((post)=>(
                        <FeaturedPostCard key={post.slug}  post={post} />
                    ))
                }
            </Carousel>
        </div>
    );
}

export default FeaturedPost;