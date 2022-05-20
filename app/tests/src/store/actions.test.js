import x from "@/store/actions.js"

vi.mock('store')

test('test setErreurs', async () => {
    x.setErreurs(null, "erreur");
  })
