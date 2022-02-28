import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
        postsConnection {
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
