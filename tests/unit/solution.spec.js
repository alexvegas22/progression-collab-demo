import {render, screen, fireEvent} from '@testing-library/vue'
import { shallowMount, mount } from '@vue/test-utils'
import Solution from '../../src/components/Question/Solution.vue'
import getAvancement from '../../src/util/Avancement'

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

    const wrapper = mount(<Solution />);
    const buttons = wrapper.findAll('button')

    await buttons[0].trigger('click')
    expect(wrapper.find('#solution-message').html()).toEqual('<h3 id="solution-message">aucune tentative à afficher</h3>')

})


test('api method avancement', () => {
    getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.état).toMatchSnapshot(2)
    })
})

test('api method tentatives', () => {
    getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.tentative.length).toMatchSnapshot(2)
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

    getAvancement('/tentative/4346436').then((data) => {
        expect(data).toEqual(tentative)
    })
})

test('api method charger une solution', () => {
    let solution = {
        "id": "1",
        "langage": 0,
        "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""
    };

    getAvancement('/solutions/1').then((data) => {
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
        expect(data).toEqual(tentative)
    })

    getAvancement(tentative.solutions).then((data) => {
        expect(data).toMatchSnapshot(solution)
    })
})

test('solution tentatives bouton un', async () => {

    const wrapper = shallowMount(Solution)

    const buttons = wrapper.findAll('button')

    await buttons[0].trigger('click')

    expect(wrapper.find('#solution-message').html()).toEqual('<h3 id="solution-message">aucune tentative à afficher</h3>')

})