import {render, screen, fireEvent} from '@testing-library/vue'
import ebauche from '@/components/Question/Ebauche'
import get_question from "@/util/question";

test('Étant donnée une question, lorsque la page est chargée, alors l\'ébauche est visible', async () => {

  ebauches:[] // liste d'ébauche

  question: get_question('programmation_1', 'les_variables', 'introduction_aux_variables', 'python').then(
          response => {
            this.question = response;
            this.ebauches = response.question_prog.ébauches;
          }
      )
  // eslint-disable-next-line no-undef
  expect(ebauches[0]).toBe(" print(réponse)")
})


test('test pour tester que les tests fonctionnent', async () => {
  let laVar = "un texte qui est un string";
  expect(laVar).toBe("un texte qui est un string")
})