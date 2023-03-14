import { useMeta } from "vue-meta";
import { ScrollSpy } from "bootstrap";

export default {
	name: "Home",
	data() {
		return { version: "source : " + import.meta.env.VITE_APP_VERSION };
	},
	setup () {
		useMeta({
			htmlAttrs: {
				lang: "fr-CA"
			},
			title: "accueil",
		});

		// Contourne un bogue de Chrome
		// https://stackoverflow.com/questions/38588346/anchor-a-tags-not-working-in-chrome-when-using
		var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		if (window.location.hash && isChrome) {
			setTimeout(function () {
				var hash = window.location.hash;
				window.location.replace(hash);
			}, 300);
		}
		
		window.addEventListener("DOMContentLoaded", () => {

			// Navbar shrink function
			var navbarShrink = function () {
				const navbarCollapsible = document.body.querySelector("#mainNav");
				if (!navbarCollapsible) {
					return;
				}
				if (window.scrollY === 0) {
					navbarCollapsible.classList.remove("navbar-shrink");
				} else {
					navbarCollapsible.classList.add("navbar-shrink");
				}

			};

			// Shrink the navbar 
			navbarShrink();

			// Shrink the navbar when page is scrolled
			document.addEventListener("scroll", navbarShrink);

			// Activate Bootstrap scrollspy on the main nav element
			const mainNav = document.body.querySelector("#mainNav");
			if (mainNav) {
				new ScrollSpy(document.body, {
					target: "#mainNav",
					offset: 74,
				});
			}

			// Collapse responsive navbar when toggler is visible
			const navbarToggler = document.body.querySelector(".navbar-toggler");
			const responsiveNavItems = [].slice.call(
				document.querySelectorAll("#navbarResponsive .nav-link")
			);
			responsiveNavItems.map(function (responsiveNavItem) {
				responsiveNavItem.addEventListener("click", () => {
					if (window.getComputedStyle(navbarToggler).display !== "none") {
						navbarToggler.click();
					}
				});
			});

		});
		
	}
};
