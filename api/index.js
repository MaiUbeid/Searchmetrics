const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Category {
    word: String
    score: Int
    tags: [String]
  }

  type Query {
    getKeywords(category: String): [Category]
  }
`;

const resolvers = {
  Query: {
    getKeywords: async (_parent, args) => {
      const { category } = args;
      try {
        const categories = await axios.get(
          `https://api.datamuse.com/words?ml=${category}`
        );
        return categories.data.slice(0, 3).map((item) => {
          return item;
        });
      } catch (error) {
        throw error;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
