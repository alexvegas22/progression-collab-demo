import { createStore } from "vuex";

export default createStore({
	state: vi.fn(),
	getters: vi.fn(),
	actions: vi.fn(),
	mutations: vi.fn(),
});
