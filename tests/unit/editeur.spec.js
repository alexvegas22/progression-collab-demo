import { render } from '@testing-library/vue'
import Editeur from '@/components/Question/Editeur'
import { mount } from '@vue/test-utils'

test('Test#1', async () => {
  const question = JSON.parse('{ "nom": "les_variables",  "titre": "Introduction aux variables", "description": "Exercices dintroduction aux variables.", "enoncé": "Déclarez une variable dont lidentifiant est «réponse» et affectez-lui la valeur 42.", "langage": "python"}')

  const wrapper = mount(Editeur, {
    propsData: { question: question }
  })

  expect(wrapper.vm.code).toBe("")
})
