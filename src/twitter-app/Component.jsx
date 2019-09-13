import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import styles from './Component.module.css'
import cx from 'classname'
import { GET_ALL_TWEETS, CREATE_TWEET, DELETE_TWEET } from './queries'

const Component = props => {
  const [tweetValue, setTweetValue] = React.useState()

  const { data, loading } = useQuery(GET_ALL_TWEETS)

  const [createTweet] = useMutation(CREATE_TWEET, {
    update(store, result) {
      const data = store.readQuery({
        query: GET_ALL_TWEETS
      })
      data.Tweets.push(result.data.createTweet)
      store.writeQuery({ query: GET_ALL_TWEETS, data })
    },
    onCompleted() {
      setTweetValue('')
    }
  })

  const [deleteTweet] = useMutation(DELETE_TWEET, {
    update(store, result) {
      const data = store.readQuery({
        query: GET_ALL_TWEETS
      })
      data.Tweets = data.Tweets.filter(
        tweet => tweet.id !== result.data.deleteTweet.id
      )
      store.writeQuery({
        query: GET_ALL_TWEETS,
        data
      })
    }
  })

  return loading ? (
    'loading...'
  ) : (
    <div className={cx(styles.tweets, 'p-8')}>
      <h1 className="text-6xl text-toast font-bold">Mocking Tweets</h1>
      <div data-testid="tweet-container">
        {data.Tweets.map((tweet, index) => (
          <div
            key={tweet.id}
            className={cx(
              styles.tweets,
              'flex justify-between items-start',
              'bg-grey-1 hover:bg-grey-3',
              'rounded my-2 p-4'
            )}
          >
            <img
              className="object-cover rounded"
              src={tweet.Author.avatar_url}
              alt="none"
              height="42"
              width="42"
            />
            <div className="flex-auto ml-4">
              <p className="font-bold mb-4">{tweet.body}</p>
              <p className="italic">{tweet.Author.username}</p>
              <p className="text-sm">{tweet.Author.first_name}</p>
            </div>
            <button
              data-testid={`delete-tweet-btn-${index}`}
              className={cx(
                styles.button,
                'bg-toast hover:bg-toast-burnt ml-2'
              )}
              onClick={() => {
                return deleteTweet({
                  variables: { id: tweet.id }
                })
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div>
        <textarea
          data-testid="tweet-input"
          className="border rounded border-grey-2 w-full p-2"
          placeholder="Heavy on the sarcasm..."
          value={tweetValue}
          onChange={e => setTweetValue(e.target.value)}
        ></textarea>
        <button
          data-testid="add-tweet-btn"
          className={cx(styles.button, 'bg-primary hover:bg-primary-dark')}
          onClick={() => createTweet({ variables: { body: tweetValue } })}
        >
          Add New Tweet
        </button>
      </div>
    </div>
  )
}

Component.propTypes = {}

export default Component
