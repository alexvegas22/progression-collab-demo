import {render, screen, fireEvent} from '@testing-library/vue'
import { shallowMount, mount } from '@vue/test-utils'
import Tentatives from "@/components/Question/Tentatives";

describe("Tests unitaires sur le component Tentatives", ()=>{

    it('Lien tentative affichée', async ()=>{
        const wrapper = mount(Tentatives, {
            propsData:{
                tentatives:[{date_soumission:242424}, {date_soumission: 985444892}],
                tentativeAffichee:22,
                solution:22
            }
        })
        expect(wrapper.findAll('a')[0].html()).toEqual('<a>Solution du 3/1/1970 à 14:20</a>')
        expect(wrapper.findAll('a')[1].html()).toEqual('<a>Solution du 24/3/2001 à 9:41</a>')
    })

})