import {render, screen, fireEvent} from '@testing-library/vue'
import Editeur from '@/components/Question/Editeur'

test('test la reception de la reponse API apres le click du boutton', async () => {
    // The `render` method renders the component into the document.
    // It also binds to `screen` all the available queries to interact with
    // the component.
    render(Editeur)

    // queryByText returns the first matching node for the provided text
    // or returns null.
    //On verifie qu'il n'y a aucun retour de reponse
    expect(screen.queryByText('Ta reponse est')).toBeFalsy()

    // getByText returns the first matching node for the provided text
    // or throws an error.
    const button = screen.getByText('envoie ta reponse')

    // Click a couple of times.
    //on clique sur le boutton(envoie d'une requete a l'api)
    await fireEvent.click(button)
    //on verifie qu'une reponse s'affiche

    await expect(screen.queryByText('Ta reponse est')).toBeTruthy()
})
