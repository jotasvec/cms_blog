/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' }) 
} */

import { GraphQLClient, gql, graphql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req, res){
  const graphQLClient = new GraphQLClient(graphqlAPI,{
    headers: {
      authorization: `Bearer ${graphCMSToken}`
    }
  });

  const query = gql`
    mutation CreateComment($name: String!, $lastName: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, lastName: $lastName, email: $email , comment: $comment, post: { connect : { slug: $slug} }}){
        name
        lastName
        email
        comment
        post{
          slug
        }
      }
    }
  `

  try {    
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);

  }
}
