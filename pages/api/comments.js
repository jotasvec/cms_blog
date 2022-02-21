/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' }) 
} */

import { GraphQLClient, gql, graphql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default function comments(req, res){
  const graphQLClient = new GraphQLClient(graphqlAPI,{
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  });

  const query = gql`
    mutation createComment($name: !String, $lastName: !String, $email: !String, $comment: !String, $slug: !String){
      createComment(data: {name: $name, lastName: $lastName, email: $email , comment: $comment, post: { connect : { slug: $slug} }})
    }
  `

  try {    
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result);

  } catch (error) {
    console.log(error)
  }
}
