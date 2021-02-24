import { render, fireEvent,screen } from '@testing-library/vue'
import Editeur from '@/components/Question/Editeur'

test('Test#1', async () => {
    render(Editeur)
    expect(await screen.getByText(''))
    const code = screen.getByLabelText(/code/i)
    await fireEvent.update(code, 'print(\'lol\')')
    expect(await screen.getByText('print(\'lol\')')).toBeTruthy()

  })
