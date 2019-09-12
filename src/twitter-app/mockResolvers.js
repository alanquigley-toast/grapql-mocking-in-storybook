import { hacker, internet } from 'faker'
import mockStore from './store'
import uniqid from 'uniqid'

export default initialValues => {
  const store = mockStore(initialValues)

  return {
    Mutation(parent, args) {
      return {
        createTweet() {
          const newTweet = { id: uniqid() }
          store.set(newTweet.id, newTweet)
          return newTweet
        },
        deleteTweet(parent, args) {
          const deleted = store.get(args.id)
          store.delete(args.id)
          return deleted
        }
      }
    },
    Query() {
      return {
        Tweets: () => store.values()
      }
    },
    Tweet() {
      return {
        body: () => hacker.phrase()
      }
    },
    User() {
      return {
        username: () => internet.userName(),
        avatar_url: () => internet.avatar()
      }
    }
  }
}
