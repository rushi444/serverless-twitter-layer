const { ApolloServer, gql } = require('apollo-server-lambda');

const resolvers = {
  Query: {
    hello: (parent, args, context, info) => `Hi, ${args.name}`,
  },
};

const server = new ApolloServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});