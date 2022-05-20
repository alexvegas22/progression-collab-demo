import { copie_profonde } from "@/util/commun"

test('test étant donné un objet json lorsquon appelle copie_profonde on obtient un clone de cet objet', () => {
    const objetOriginal = { nom: "objet", mission: "test" }
    const objetCloné = copie_profonde(objetOriginal);
    expect(objetOriginal).not.toBe(objetCloné);
    expect(objetOriginal).toEqual(objetCloné);
  })
