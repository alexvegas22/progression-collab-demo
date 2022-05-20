import { createStore } from "vuex";

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = vi.fn((createState) => {
  const store = createStore(createState)
  return store
})

export default create