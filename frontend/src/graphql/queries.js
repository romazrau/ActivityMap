import { gql } from 'apollo-boost'

export const ACTINFO_INDIVIDUAL_QUERY   = gql`
  query($id: ID!) {
    actInfo(id: $id){
    id
    title
    }
  }
`;

export const POSTS_QUERY = gql`
  query {
    posts {
      title
      body
      author {
        name
      }
      likegiver{
        id
        name
      }
      published
    }
  }
`
export const USERS_QUERY = gql`
  query {
    users{
      id
      name
      posts{
        id
      }
    }
  }
`
