export default function store(initialValues = []) {
  const store = new Map()
  initialValues.forEach(item => {
    store.set(item.id, item)
  })
  return {
    set: (key, value) => {
      return store.set(key, value)
    },
    get: key => {
      return store.get(key)
    },
    delete: key => {
      return store.delete(key)
    },
    values: () => {
      return [...store.values()]
    },
    entries: () => {
      return [...store.entries()]
    }
  }
}
