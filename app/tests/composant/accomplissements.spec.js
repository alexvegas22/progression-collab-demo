// Importation de la méthode `mount()` de Vue Test Utils
import { mount } from '@vue/test-utils'
import Accomplissement from "../../src/components/accomplissements/tableauExercices.vue";

// Le composant à tester

test('displays message', () => {
  // mount() renvoie un composant Vue enveloppé avec lequel nous pouvons interagir
  const wrapper = mount(Accomplissement);

  const titre = wrapper.find('h1');

  // Faire valoir le texte rendu du composant
  expect(titre.text()).toContain("Liste d'exercices")
})