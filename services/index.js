import { request, gql } from "graphql-request";
import { comment } from "postcss";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
        postsConnection(
            orderBy: createdAt_DESC
        ){
            edges {
            node {
                author {
                    id
                    name
                    photo {
                        url
                    }
                    description {
                        text
                    }
                    createdAt
                }
                excerpt
                slug
                title
                categories {
                    name
                    slug
                }
                featureImage {
                    url
                }
            }
        }
    }
    }
    `
    const result = await request(graphqlAPI, query);
    
    return result.postsConnection.edges;
}


export const getPostDetails = async ( slug ) => {
    const query = gql`
        query GetPostDetails($slug: String! ) {
            post(where: { slug: $slug } ){
                author{
                    id
                    name
                    photo {
                        url
                    }
                    description {
                        text
                    }
                    createdAt
                }
                excerpt
                slug
                title
                categories {
                    name
                    slug
                }
                featureImage {
                    url
                }
                content {
                    raw
                    html
                }
            }
        }
    
    `;
    const result = await request(graphqlAPI, query, { slug });
    
    return result.post;
}


export const getRecentPost = async () => {
    const query = gql`
        query getRecentPost(){
            posts(
                orderBy: createdAt_ASC
                last: 3
            ){
                title
                featureImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.posts;
} 

export const getSimilarPost = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]){
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ){
                title
                featureImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, { categories, slug });
    return result.posts;
} 

export const getCategories = async () => {
    const query = gql`
        query getCategories {
            categories {
                name
                slug
            }
        }
        `
    const result = await request(graphqlAPI, query);
    
    return result.categories;
}

export const submitComment = async ( obj ) =>{
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });

    return result.json();
}

export const getComments = async ( slug ) =>{
    const query = gql` 
        query GetComments($slug: String!){
        comments(
            orderBy: createdAt_ASC
            where: { post: { slug: $slug }  }
        ){
            name
            lastName
            email
            comment
            createdAt
        }
    }
`
const result = await request(graphqlAPI, query, { slug });
return result.comments;
}

export const getFeaturedPosts = async () => {
    const query = gql`
        query GetFeaturedPosts(){
            posts(where: {featuredPost: true} ){
                author{
                    name
                    photo{
                        url
                    }
                }
                title
                featureImage{
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.posts
}

export const getPostByCategories = async (slug) => {
    const query = gql`
        query GetPostByCategories($slug: String!)  {
        postsConnection(
            where: { categories_some: {slug: $slug} }
            orderBy: createdAt_DESC
        ){
            edges {
                node {
                    author {
                        id
                        name
                        photo {
                            url
                        }
                        description {
                            text
                        }
                        createdAt
                    }
                    excerpt
                    slug
                    title
                    categories {
                        name
                        slug
                    }
                    featureImage {
                        url
                    }
                }
            }
        }
    }
    `
    const result = await request(graphqlAPI, query, { slug });
    
    return result.postsConnection.edges;
}
