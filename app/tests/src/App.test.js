import App from "@/App.vue"
import x from "@/App.vue"
import store from "@/store/store.js"

console.log(store)

//vi.mock('store')

test('test App', async () => {
    expect(App).toBeTruthy()
  })

  test('test traiter paramètres url', async () => {
    x.methods.traiterParamètresURL("url_test?tkres=token_ressources")
    vi.spyOn(store, 'dispatch')
    expect(store.dispatch).toHaveBeenCalled()
  })