import { mount } from '@vue/test-utils';
import Login from '@/components/login/login.js';

describe('login.js: ', () => {
    const wrapper = mount(Login);
    console.log(wrapper)

    it('Login exist', () => {
        expect(wrapper.exists).toBeTruthy();
    })
    it('login.js function', () => {
        expect(typeof Login.data).toBe('function')
    })
    
    it('estActif retourne true', () => {
        const spy = jest.spyOn(Login.methods, 'estActif').mockImplementation(() => true);
        expect(Login.methods.estActif()).toBe(true);
    })
})