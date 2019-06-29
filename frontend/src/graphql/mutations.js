import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $published: Boolean!
    $authorId: ID!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        published: $published
        author: $authorId
      }
    ) {
      title
      body
      author {
        name
      }
      published
    }
  }
`
export const LIKEPOST_MUTATION = gql`
  mutation (
  $likegiver: ID!
  $postId: ID!
) {
  likePost(
    data: {
      likegiver: $likegiver
      postId: $postId
    }
  ) {
    title
    body
    author {
      name
    }
    likegiver{
      name
    }
  }
}
`


