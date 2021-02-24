import {render, screen, fireEvent} from '@testing-library/vue'
import {get_question} from "@/util/question";

/*test('Étant donnée une question, lorsque la page est chargée, alors l\'ébauche est visible', async () => {

  render(ebauche)

  expect(ebauche.data().ebauches).toBe("print(réponse)")
})

 */
test('api method charger une tentative', () => {
  let questionAttendue = {"ébauches": [
      "\nprint(réponse)",
      "\nprint(AutreRéponse)"]};

  get_question.then((data) => {
    expect(data).toBe(questionAttendue.ébauches[0])
  })
})



test('test pour tester que les tests fonctionnent', async () => {
  let laVar = "un texte qui est un string";
  expect(laVar).toBe("un texte qui est un string")
})