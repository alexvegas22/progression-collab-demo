import {render, screen, fireEvent} from '@testing-library/vue'
import { shallowMount, mount } from '@vue/test-utils'
import Tentatives from "@/components/Question/Tentatives";
import getAvancement from "@/util/Avancement";


describe("Tests unitaires sur le component Tentatives", ()=>{
    let tentativesMock;
    beforeAll(async()=>{
        await getAvancement('/user/jdoe/categorie_toto/question/1').then((data)=>tentativesMock= data.tentative)
        console.log(tentativesMock)
    })

    it('Lien tentative affichée', async ()=>{
        const wrapper = mount(Tentatives, {
            propsData:{
                tentatives:tentativesMock
            }
        })
        expect(wrapper.findAll('a')[0].html()).toEqual('<a>Solution du 11/2/2021 à 13:51</a>')
        expect(wrapper.findAll('a')[1].html()).toEqual('<a>Solution du 6/1/1970 à 3:44</a>')
    })

})