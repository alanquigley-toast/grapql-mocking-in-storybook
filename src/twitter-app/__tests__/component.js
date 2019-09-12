import React from 'react'
import { render, wait, fireEvent } from '@testing-library/react'
import Component from '../Component'
import { ApolloProvider } from 'react-apollo'
import createClient from '../client'
import mockResolvers from '../mockResolvers'
import { loader } from 'graphql.macro'
const schemaString = loader('../schema.graphql')

console.error = jest.fn()

describe('my integration test', () => {
  it('should do something', async () => {
    const initialValues = [
      { id: '1' }, // body and other props will be mocked.
      { id: '2' },
      { id: '3', body: 'I am not faked!' } // Body is explictly set here.
    ]

    const { debug, getByTestId } = render(
      <ApolloProvider
        client={createClient(schemaString, mockResolvers(initialValues))}
      >
        <Component />
      </ApolloProvider>
    )
    // wait for the loading to complete.
    await wait()

    // get the tweet container.
    const tweetContainer = await getByTestId('tweet-container')

    // grab the buttons.
    const addTweetBtn = await getByTestId('add-tweet-btn')

    // delete buttons.
    const deleteBtn0 = await getByTestId('delete-tweet-btn-0')
    const deleteBtn1 = await getByTestId('delete-tweet-btn-1')
    const deleteBtn2 = await getByTestId('delete-tweet-btn-2')

    // click the button too add a new element.
    fireEvent.click(addTweetBtn)
    // wait for the addition to complete.
    await wait()

    debug(tweetContainer)
    // debug()
  })
})
