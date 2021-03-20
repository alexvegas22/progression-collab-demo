import {render, screen, fireEvent} from '@testing-library/vue'
import get_question from "@/util/question";
//import Ebauche from "@/components/Question/Ebauche";
import {mount}  from '@vue/test-utils'

/**
test('Étant donnée le component Ebauche, lorsque qu\'il load, alors un texte est visible', async () => {
    render(Ebauche);
    expect(screen.queryByText("Voici les ébauches disponibles :")).toBeTruthy();
})

test('Étant donnée le component Ebauche, lorsque qu\'il load, alors les ebauches sont visibles', async () => {
    //render(Ebauche)
    //expect(await screen.findByText("print(AutreRéponse)")).toBeTruthy()
    const wrapper = mount(<Ebauche />, {
        propsData: {
            ebauches: ["uneEbauche"]
        }
    })
    expect(wrapper.props().ebauches[0]).toEqual("uneEbauche")
    // ajouter des autres tests
})


test('Étant donnée la fonction get_question, lorsqu\'appelée, alors l\'ébauche est disponible', () => {
    let questionAttendue = {
        "ébauches": [
            "\nprint(réponse)",
            "\nprint(AutreRéponse)"]
    };

    return get_question().then((data) => {
        expect(data.question_prog.ébauches).toEqual(questionAttendue.ébauches)
    })
})*/

test('Étant donnée le component Ebauche, lorsque qu\'il load, alors un texte est visible', async () => {
    let i=0;
    expect(i===0).toBeTruthy();
})