import { ApolloServer, gql } from "apollo-server-express"; 
import express from "express";
import http from "http";
import config from 'config';

const app = express();

const PORT = config.get<number>('port');
const TestAPI = require('./graphql/datasources/testAPI');

const typeDefs = gql`
  type Query {
    hello: String
    dataHello: Message
  }
  type Mutation {
    sayMessage(param: String): Message
  }
  type Message {
    message: String
  }
`
const dataSources = () => ({
  testAPI: new TestAPI()
})

const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  dataSources,
  introspection: true,
  playground: true, 
})

server.applyMiddleware({app});

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

(async () => {
  await new Promise(resolve => httpServer.listen(PORT, resolve as any));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  return { server, app, httpServer };
})()

app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to A GraphQL Service", localGraphQLAPI: "http://localhost:4000/graphql"})
})