import { mount } from '@vue/test-utils';
import Avancement from '@/components/question/avancement/avancement.js';

describe('avancement.js: ', () => {
    const wrapper = mount(Avancement);
    console.log(wrapper)
    console.log(Avancement.methods.timestampVersDate(1647456327))
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
    it('timestampVersDate', () => {
        expect(Avancement.methods.timestampVersDate(1647456327)).toBe('2022-03-16, 18 h 45 min 27 s')
    })
    /*it('filtrerTentativesParLangage', () => {
        const mock = jest.fn().mockReturnValue('python')
        mock();
        //expect(Avancement.methods.filtrerTentativesParLangage('python')).toBe('python');
        expect(mock.data).toBe('d')
    })*/
})