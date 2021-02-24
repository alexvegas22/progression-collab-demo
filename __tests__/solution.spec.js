import {render, screen, fireEvent} from '@testing-library/vue'
import Tentatives from '@/components/Tentatives'

describe('Tentatives.vue', () => {
    it("displays a non authorized message", () => {
      const msg = "submit"
      const wrapper = mount(SubmitButton,{
        propsData: {
          msg: msg
        }
      })
  
      console.log(wrapper.html())
  
      expect(wrapper.find("span").text()).toBe("Not Authorized")
      expect(wrapper.find("button").text()).toBe("submit")
    })
  })

// test('increments value on click', async () => {
//   // The `render` method renders the component into the document.
//   // It also binds to `screen` all the available queries to interact with
//   // the component.
//   render(Tentatives)

//   // queryByText returns the first matching node for the provided text
//   // or returns null.
//   expect(screen.queryByText('Times clicked: 0')).toBeTruthy()

//   // getByText returns the first matching node for the provided text
//   // or throws an error.
//   const button = screen.getByText('increment')

//   // Click a couple of times.
//   await fireEvent.click(button)
//   await fireEvent.click(button)

//   expect(screen.queryByText('Times clicked: 2')).toBeTruthy()
})
