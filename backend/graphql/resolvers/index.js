const graphQLUpload = require('graphql-upload');

const { storeUpload } = require('./helpers/storeUpload');
const File = require('../../models/file');

module.exports = {
	Upload: graphQLUpload, //Resolves the `Upload` scalar
	Query: {
		// Retrieves metadata of all files from MongoDB.
		uploads: async () => {
			return (await File.find()).map((file) => file._doc);
		}
	},
	Mutation: {
		singleUpload: async (parent, args) => {
			return storeUpload(args.file);
		},
		multipleUpload: async (parent, { files }) => {
			if (!files) files = []; // If files is undefined, turn it into an empty list
			// Ensure an error storing one upload doesn’t prevent storing the rest.
			const results = await Promise.allSettled(files.map(storeUpload));
			return results.reduce((storedFiles, { value, reason }) => {
				if (value) storedFiles.push(value);
				// Realistically you would do more than just log an error.
				else console.error(`Failed to store upload: ${reason}`);
				return storedFiles;
			}, []);
		},
	},
};