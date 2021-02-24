import { mount } from '@vue/test-utils'

import Question from '../../src/views/Question.vue'

test('Mise a jour du texte par clique', async () => {
  const spy = jest.spyOn(Question.methods, 'obtenirRetroaction');
  const wrapper = mount(Question)
  await wrapper.find('button.valider').trigger('click')
  expect(spy).toHaveBeenCalled();
})
