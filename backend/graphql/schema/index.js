const { gql } = require('apollo-server-core');

module.exports = gql(`
scalar Upload

type File {
	filename: String!
	mimetype: String!
	encoding: String!
}

type Query {
	uploads: [File!]!
}

type Mutation {
	singleUpload(file: Upload!): File!
	multipleUpload(files: [Upload!]!): [File!]!
}
`);