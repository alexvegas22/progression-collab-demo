describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('http://ordralphabetix.dti.crosemont.quebec:8022') // change URL to match your dev URL
    })

    it('affiche correctement le titre Progression', () => {
        cy.get('div.container').children().within(
            () => {
                cy.get('span').first()
                cy.contains('Prog')

            }
        )
    });

    it('affiche la couleur de Prog', () => {
        cy.get('div.container').children().within(

            () => {
                cy.get('span').first()
                cy.should('have.css', 'color', 'rgb(13, 202, 240)')
            }
        )
    });
    it('défile correctement à Je veux', () => {
        
        cy.get('header').children().within(

            () => {
                cy.get('a')
                    .should("have.attr", "href", "#débuter")
                    .click();

                cy.url().should('eq', 'http://ordralphabetix.dti.crosemont.quebec:8022/#d%C3%A9buter')

            }
        )
        
    });
})
