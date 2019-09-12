import { gql } from 'graphql.macro'

export const GET_ALL_TWEETS = gql`
  query tweets {
    Tweets {
      id
      body
      Author {
        username
        avatar_url
        first_name
      }
    }
  }
`

export const CREATE_TWEET = gql`
  mutation CreateTweet($body: String) {
    createTweet(body: $body) {
      id
      body
      Author {
        username
        avatar_url
        first_name
      }
    }
  }
`

export const DELETE_TWEET = gql`
  mutation DeleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
    }
  }
`
