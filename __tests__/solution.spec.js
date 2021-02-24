import {render, screen, fireEvent} from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Solution from '../src/components/Question/Solution.vue'
import Tentatives from '../src/components/Question/Tentatives.vue'
import Avancement from '../src/components/Question/Avancement.vue'
import getAvancement from '../src/util/Avancement'

// *********** TEST API METHOD

test('api method avancement', () => {
    return getAvancement('/user/jdoe/categorie_toto/question/1').then((data) => {
        expect(data.état).toEqual(2)
    })
})

test('api method avancement avec erreur 404', () => {
    return getAvancement('/user/jdoe/categorie_toto/question/inconnu').catch((err)=>{
        expect(err.toString()).toEqual("Error: Request failed with status code 404")
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


// *********** TEST COMPONENT SOLUTION

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


// *********** TEST COMPONENT AVANCEMENT

test('Avancement component with question réussie props', async () => {
    const wrapper = mount(<Avancement />, {
            propsData: {
                question: "1",
                état: 2
            }
        })
    expect(wrapper.props().question).toEqual("1")
    expect(wrapper.props().état).toEqual(2)
    expect(wrapper.find('h1').text()).toEqual("La question est RÉUSSI")
})

test('Avancement component with question non réussie props', async () => {
    const wrapper = mount(<Avancement />, {
            propsData: {
                question: "2",
                état: 1
            }
        })
    expect(wrapper.props().question).toEqual("2")
    expect(wrapper.props().état).toEqual(1)
    expect(wrapper.find('h1').text()).toEqual("La question est NON-RÉUSSI")
})


// *********** TEST COMPONENT TENTATIVE

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
    expect(wrapper.findAll('a').length).toEqual(2)
})

test('Tentative component with solution props', async () => {
    const wrapper = mount(<Tentatives />, {
            propsData: {
                tentatives: [],
                tentativeAffichee: {},
                afficherTentative: ()=>{},
                solution: {
                    "id": "1",
                    "langage": 0,
                    "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""
                }
            }
        })
    let expectedProps = {"id": "1", "langage": 0, "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""}

    expect(wrapper.props().solution).toEqual(expectedProps)
})

test('Tentative component with solution UI', async () => {
    // succes but not finished !
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
                tentativeAffichee: {
                    "date_soumission": 42352353253,
                    "id": 42352353253
                  },
                afficherTentative: ()=>{},
                solution: {
                    "id": "1",
                    "langage": 0,
                    "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""
                }
            }
        })
    let expectedSolutionProps = {"id": "1", "langage": 0, "code": "print \"Ayoye, cest pas facile de mettre un quote la dedans\""}

    expect(wrapper.props().solution).toEqual(expectedSolutionProps)
})