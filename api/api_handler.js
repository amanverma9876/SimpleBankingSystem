const fs = require("fs");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require("./graphql_date.js");
const about = require("./about.js");
const customer = require("./customer.js");
const transfer = require("./transfer.js");
const resolvers = {
  Query: {
    about: about.getMessage,
    getAllCustomers: customer.get,
    getCustomer: customer.getOne,
    getAllTransfers: transfer.get,
  },
  Mutation: {
    setAboutMessage: about.setMessage,
    transferFunds: transfer.funds,
    addCustomer: customer.add,
  },
  GraphQLDate,
};
const server = new ApolloServer({
  typeDefs: fs.readFileSync("./schema.graphql", "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || "true") === "true";
  console.log("CORS setting:", enableCors);
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: enableCors });
}

module.exports = { installHandler };
