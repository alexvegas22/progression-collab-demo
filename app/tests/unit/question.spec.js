import { mount } from '@vue/test-utils'

import Question from '@/views/question/question.js'

test('Mise a jour du texte par clique', async () => {
  const spy = jest.spyOn(Question.methods, 'obtenirRetroaction');
  const wrapper = mount(Question)
  await wrapper.find('button.valider').trigger('click')
  expect(spy).toHaveBeenCalled();
})
