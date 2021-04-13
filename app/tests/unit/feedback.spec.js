import { render, screen, fireEvent } from '@testing-library/vue'
import { mount } from '@vue/test-utils'

import Feedback from '../../src/components/Question/Feedback.vue'

describe('Feedback.vue', () => {
  it('renders props.feedback when passed', () => {
    const feedBack = 'Rétroaction'
    const wrapper = mount(Feedback, {
      props: {
        feedBack
      }
    })
    expect(wrapper.props().feedBack).toEqual(feedBack)
  })
})
