import parseMD from "@/util/parse";
import { createPopper } from '@popperjs/core';

export default {
	name: "RetroactionTentative",
	data() {
		return {
			conseil: null,
			tooltip: null,
		}
	},
	computed: {
		tentative(){
			return this.$store.state.tentative;
		},
		retroactionTentative() {
			let tentative = this.$store.state.retroactionTentative;

			return tentative
				 ? new Proxy(tentative, {
					 get: function (obj, prop) {
						 return prop == "feedback" ? parseMD(obj[prop]) : obj[prop];
					 },
				 })
				 : null;
		},
		testsRéussisPct() {
			return {width: ((this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length) * 100) + "%"};
		},
		testsRatésPct() {
			return {width: (100-(this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length) * 100) + "%"};
		},
		nbTests(){
			return this.$store.state.question.tests.length;
		},
		msgReponseApi() {
			return this.$store.state.msgReponseApi;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
	mounted() {
		const button = document.querySelector('#btn_conseil');
		this.tooltip = document.querySelector('#tooltip');
		this.conseil = createPopper(btn_conseil, tooltip, {
			placement: 'right',
		});

		const showEvents = ['mouseenter', 'focus'];
		const hideEvents = ['mouseleave', 'blur'];

		showEvents.forEach(event => {
			button.addEventListener(event, this.montrer_conseil);
		});

		hideEvents.forEach(event => {
			button.addEventListener(event, this.cacher_conseil);
		});
	},
	methods: {
		montrer_conseil(){
			this.tooltip.setAttribute('data-show', '');
			this.conseil.update();
		},
		cacher_conseil(){
			this.tooltip.removeAttribute('data-show');
		},
		
	}
};
