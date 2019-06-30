import { gql } from 'apollo-boost'

export const ACTINFO_INDIVIDUAL_QUERY   = gql`
  query($id: ID!) {
    actInfo(id: $id){
    id
    title
    }
  }
`;


