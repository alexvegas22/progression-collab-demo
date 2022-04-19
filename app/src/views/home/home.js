import { useMeta } from "vue-meta";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { ScrollSpy } from "bootstrap";

library.add(faUserSecret);

export default {
	name: "Home",
	setup () {
		useMeta({
			htmlAttrs: {
				lang: "fr-CA"
			},
			title: "accueil",
		});

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
