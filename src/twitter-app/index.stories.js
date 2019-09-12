import React from 'react'
import { storiesOf } from '@storybook/react'
import { ApolloProvider } from 'react-apollo'
import createClient from './client'
import schemaString from './schema.graphql'
import Component from './Component'
import mockResolvers from './mockResolvers'

const stories = storiesOf('Connected component', module)
const initialValues = [
  { id: '1' },
  { id: '2' },
  { id: '3', body: 'I am not faked!' }
]

stories.add('A simple example', () => (
  <ApolloProvider
    client={createClient(schemaString, mockResolvers(initialValues))}
  >
    <Component />
  </ApolloProvider>
))
