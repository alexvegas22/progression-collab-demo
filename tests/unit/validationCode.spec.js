import {render, screen, fireEvent} from '@testing-library/vue'
import  envoyerTentative from '../../src/util/solution'
//import Editeur from '@/components/Question/Editeur.vue';

test('test la reception de la reponse API apres lenvoie', () => {
    //TODO: tester la requete a l'API mock en premier et ensuite tester le composant qui traite la reponse
    // The `render` method renders the component into the document.
    // It also binds to `screen` all the available queries to interact with
    // the component.
    //render(Editeur)

    // queryByText returns the first matching node for the provided text
    // or returns null.
    //On verifie qu'il n'y a aucun retour de reponse
   // expect(screen.queryByText('Ta reponse est')).toBeFalsy()

    // getByText returns the first matching node for the provided text
    // or throws an error.
   // const button = screen.getByText('envoie ta reponse')

    // Click a couple of times.
    //on clique sur le boutton(envoie d'une requete a l'api)
    //await fireEvent.click(button)
    //on verifie qu'une reponse s'affiche

    //await expect(screen.queryByText('Ta reponse est')).toBeTruthy()


    return envoyerTentative("python","un petit code").then((data) => {
        expect(data.résultats.length).toBeGreaterThan(0)
    })

    /*test('api method avancement', () => {
        return getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
            expect(data.état).toEqual(2)
        })
    })*/

})
