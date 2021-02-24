import {render, screen, fireEvent} from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Solution from '../src/components/Question/Solution.vue'
import Tentatives from '../src/components/Question/Tentatives.vue'
import getAvancement from '../src/util/Avancement'

test('solution affichage aucune donnée', async () => {
    render(Solution)
    
    expect(screen.queryByText('aucune tentative à afficher')).toBeTruthy()
})

test('solution affichage aucun résultat à afficher', async () => {
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
})


test('api method avancement', () => {
    return getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.état).toEqual(2)
    })
})

test('api method tentatives', () => {
    return getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.tentative.length).toEqual(2)
    })
})


test('api method charger une tentative', () => {
    let tentative = {
        "date_soumission": 4346436,
        "id": 4346436,
        "feedback": "Blalalala",
        "solutions": "/solutions/1",
        "résultats": []
    };

    return getAvancement('/tentative/4346436').then((data) => {
        expect(data).toEqual(tentative)
    })
})

test('api method charger une solution', () => {
    let solution = {
        "id": "1",
        "langage": 0,
        "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""
    };

    return getAvancement('/solutions/1').then((data) => {
        expect(data).toEqual(solution)
    })
})

test('api method charger une tentative la solution correspondante', () => {
    let tentative = {
        "date_soumission": 4346436,
        "id": 4346436,
        "feedback": "Blalalala",
        "solutions": "/solutions/1",
        "résultats": []
    };

    let solution = {
        "id": "1",
        "langage": 0,
        "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""
    };

    getAvancement('/tentative/4346436').then((data) => {
        tentative = data
    })

    return getAvancement(tentative.solutions).then((data) => {
        expect(data).toEqual(solution)
    })
})

test('Tentative component with tentatives props', async () => {

    const wrapper = mount(<Tentatives />, {
            propsData: {
                tentatives: [
                    {
                      "date_soumission": 42352353253,
                      "id": 42352353253
                    },
                    {
                      "date_soumission": 4346436,
                      "id": 4346436
                    }
                  ],
                tentativeAffichee: {},
                afficherTentative: ()=>{},
                solution: {}
            }
        })

    let expectedProps = [{"date_soumission": 42352353253,"id": 42352353253},{"date_soumission": 4346436,"id": 4346436}]

    expect(wrapper.props().tentatives).toEqual(expectedProps)

})