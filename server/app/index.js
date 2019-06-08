require('dotenv').config();

const { prisma } = require('~prisma');
const { GraphQLServer } = require('graphql-yoga');

require('./subscriber');

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers: require('./resolvers'),
  context: {
    prisma,
  },
});

server.start({ port: 7336 }, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
