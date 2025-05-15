import { GraphQLScalarType, Kind } from "graphql";

export const JSONObject = new GraphQLScalarType({
  name: "JSON",
  description: "Arbitrary JSON",
  parseValue: (value) => value,
  serialize: (value) => value,
  parseLiteral: (ast) =>
    ast.kind === Kind.STRING ? JSON.parse(ast.value) : null,
});
