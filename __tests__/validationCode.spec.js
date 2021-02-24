import {render, screen, fireEvent} from '@testing-library/vue'
import  envoyerTentative from '../src/util/solutionTest'

//import Editeur from '@/components/Question/Editeur.vue';

test('test la reception de la reponse API apres lenvoie', async () => {

    return envoyerTentative('python','un petit code').then((data) => {
        expect(data.résultats.length).toBeGreaterThan(0)
    })

})

/*test('api method avancement', () => {
    return getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.état).toEqual(2)
    })
})*/