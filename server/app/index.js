const prisma = require('~prisma');
const { GraphQLServer } = require('graphql-yoga');

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers: require('./resolvers'),
  context: {
    prisma,
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
