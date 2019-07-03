const {buildSchema} = require("graphql")
const schema = buildSchema(`
    type User {
        id: String!
        pw: String!
    }

    type Comment {
        content: String!
        postID: String!
        author: String!
        date: String!
    }

    type Mutation {
        createUser(id: String!, pw: String!): String
        createComment(content: String!, postID: String!, author: String!, date: String!): Boolean
    }

    type Query {
        login(id: String!, pw: String!): String
        comments(postID: String!): [Comment]
        geoJSON: String
    }
`)
module.exports = schema
