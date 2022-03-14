import { mount } from '@vue/test-utils';
import Avancement from '@/components/question/avancement/avancement.js';

describe('avancement.js: ', () => {
    const wrapper = mount(Avancement);
    console.log(wrapper)

    it('Test marche assurement', () => {
        expect(true).toBe(true);
    })

    it('Avancemnt exist', () => {
        expect(wrapper.exists).toBeTruthy();
    })
    
    it('étatVerChaîne selon la position', () => {
        //const spy = jest.spyOn(Avancement.methods, 'étatVersChaîne');
        expect(Avancement.methods.étatVersChaîne(0)).toBe('premièreTentative');
        expect(Avancement.methods.étatVersChaîne(1)).toBe('questionNonRésolue');
        expect(Avancement.methods.étatVersChaîne(2)).toBe('questionRésolue');
        expect(Avancement.methods.étatVersChaîne(3)).toBe('questionIndéterminée');
    })
    /*it('filtrerTentativesParLangage', () => {
        const mock = jest.fn().mockReturnValue('python')
        mock();
        //expect(Avancement.methods.filtrerTentativesParLangage('python')).toBe('python');
        expect(mock.data).toBe('d')
    })*/
})