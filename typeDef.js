const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        todos: [String]
    }
`;

module.exports = {
    typeDefs
}