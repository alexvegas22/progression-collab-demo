import {render, screen, fireEvent} from '@testing-library/vue'
import  {envoyerTentative} from '../src/util/solution'
import {describe} from '@vue/test-utils'
import Editeur from '@/components/Question/Editeur.vue';
import AffichageValidation from '@/components/Question/AffichageValidation';
import { mount }from '@vue/test-utils'

    it('test la reception de la reponse API apres lenvoie', async () => {
        return envoyerTentative('python', 'un petit code').then((data) => {
            expect(data.résultats.length).toBeGreaterThan(0)
        })
    });

        test('aaaaaaa', async () => {
        const wrapper = mount(<AffichageValidation />, {
        propsData: {
        résultats: [
            {
        résultat: "true",
            sortie_erreur: "",
                sortie_observée: "itération 0\n",
                feedback: "Bravo!"
        },
            {
        résultat: "true",
            sortie_erreur: ":(",
                sortie_observée: "",
                feedback: "Non!"
            },
            {
        résultat: "false",
            sortie_erreur: ":(",
                sortie_observée: "",
                feedback: "Non!"
            }
        ],
            feedback: "Feddback dependant du prof"
        }
        })
            expect(wrapper.props().résultats[0].feedback).toEqual("Bravo!")
        // ici tu peux tester d'autre propriété
        // ici tu peux chercher un element dans ton dom et vérifié qu'il affiche la bonne chose
        })






/*test('solution affichage aucun résultat à afficher', async () => {
    render(Solution)
    expect(screen.queryByText('aucune tentative à afficher')).toBeTruthy()
    const buttons = screen.getAllByText('Voir les solutions')

    await fireEvent.click(buttons[2])
    expect(screen.queryByText('aucune tentative à afficher')).toBeTruthy()
})

test('solution tentatives bouton un check message', async () => {
    // succes but wrong !
    const wrapper = mount(<Solution />);
    const buttons = wrapper.findAll('button')

    return buttons[1].trigger('click').then(data => {
        let result = wrapper.find('h3').html()
        expect(result).toEqual('<h3>aucune tentative à afficher</h3>')
    })
})*/


/*test('api method avancement', () => {
    return getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.état).toEqual(2)
    })
})

test('Avancement component with question réussie props', async () => {
const wrapper = mount(<Editeur />, {
propsData: {
question: "1",
    état: 2
}
})
    expect(wrapper.props().question).toEqual("1")
    expect(wrapper.props().état).toEqual(2)
    expect(wrapper.find('h1').text()).toEqual("La question est RÉUSSI")
})*/