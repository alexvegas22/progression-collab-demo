import {render, screen, fireEvent} from '@testing-library/vue'
import ebauche from 'src/components/Question/Ebauche'

test('Étant donnée une question, lorsque la page est chargée, alors l\'ébauche est visible', async () => {
  // The `render` method renders the component into the document.
  // It also binds to `screen` all the available queries to interact with
  // the component.
  render(ebauche)

  // queryByText returns the first matching node for the provided text
  // or returns null.
  expect(screen.queryByText('print(réponse)')).toBeTruthy()
})

test('test pour tester que les tests fonctionnent', async () => {
  let laVar = "un texte qui est un string";
  expect(laVar).toBeTruthy()
})