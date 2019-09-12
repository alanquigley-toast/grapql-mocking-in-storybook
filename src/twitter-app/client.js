import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas
} from 'graphql-tools'

export default function client(
  schemaString,
  mocks = {},
  mockTypes = 'type Query',
  extendTypes = undefined
) {
  const currentSchema = makeExecutableSchema({
    typeDefs: schemaString,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  })

  const createClient = schema => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new SchemaLink({ schema })
    })
  }

  if (extendTypes) {
    const mockSchema = makeExecutableSchema({ typeDefs: mockTypes })
    const schema = mergeSchemas({
      schemas: [currentSchema, mockSchema, extendTypes]
    })
    addMockFunctionsToSchema({ schema, mocks })
    return createClient(schema)
  }
  const mockSchema = makeExecutableSchema({ typeDefs: mockTypes })
  const schema = mergeSchemas({ schemas: [currentSchema, mockSchema] })
  addMockFunctionsToSchema({ schema, mocks })
  return createClient(schema)
}
