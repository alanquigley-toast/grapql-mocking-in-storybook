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

    const { debug, getByTestId, queryByTestId, getByText, queryByText } = render( // eslint-disable-line
      <ApolloProvider
        client={createClient(schemaString, mockResolvers(initialValues))}
      >
        <Component />
      </ApolloProvider>
    )
    // wait for the loading to complete.
    await wait()

    // grab the buttons.
    const tweetInput = await getByTestId('tweet-input')
    const addTweetBtn = await getByTestId('add-tweet-btn')

    // delete buttons - check that they are accessible..

    const deleteBtn0 = await getByTestId('delete-tweet-btn-0')
    const deleteBtn1 = await getByTestId('delete-tweet-btn-1')
    const deleteBtn2 = await getByTestId('delete-tweet-btn-2')
    const nonExistingdeleteBtn3 = await queryByTestId('delete-tweet-btn-3')

    expect(deleteBtn0).toBeInTheDocument()
    expect(deleteBtn1).toBeInTheDocument()
    expect(deleteBtn2).toBeInTheDocument()
    expect(nonExistingdeleteBtn3).toBeNull()

    // Fill out the Tweet form with a value
    fireEvent.change(tweetInput, {
      target: { value: 'a test tweet that will get added to the UI' }
    })
    // Click the submit button.
    fireEvent.click(addTweetBtn)

    // wait for the graphql roundtrip to complete.
    await wait()

    // Test that the new Tweet has been added.
    const newTweet = getByText('a test tweet that will get added to the UI')
    expect(newTweet).toBeInTheDocument()

    // Test that we can delete it again.
    const deleteBtn3 = await getByTestId('delete-tweet-btn-3')
    expect(deleteBtn3).toBeInTheDocument()
    fireEvent.click(deleteBtn3)

    // Wait for the round trip to happen
    await wait()

    // The tweet no longer exists
    expect(queryByText('a test tweet that will get added to the UI')).toBeNull()
  })
})
