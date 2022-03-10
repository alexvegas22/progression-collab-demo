describe('Page Login', () => {
    it('charge la page', () => {
        cy.visit('http://ordralphabetix.dti.crosemont.quebec:8018/login') // change URL to match your dev URL
    })

    it('type() - stub mauvais username', () => {
        cy.intercept(
            'POST',
            'http://ordralphabetix.dti.crosemont.quebec:9018/auth',
            (request) => {
                request.reply({
                    statusCode: 401,
                    body: {"erreur":"Accès interdit."} 
                })
            }
        ).as("auth")

        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
            .type('test').should('have.value', 'test')

            cy.get('#passwd')
            .type('test').should('have.value', 'test')

            cy.get('input[type="submit"]').click()
        })
        cy.get('#app').within(() => {
            cy.get('div.alert', { timeout: 10000 })
            .should('have.css', 'display', 'block')
        })
    })

    it('type() - mauvais username', () => {
        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
            .clear()
            .type('unUser').should('have.value', 'unUser')

            cy.get('#passwd')
            .clear()
            .type('unPasswd').should('have.value', 'unPasswd')

            cy.get('input[type="submit"]').click()
        })
        cy.get('#app').within(() => {
            cy.get('div.alert', { timeout: 10000 })
            .should('have.css', 'display', 'block')
        })
    })

    it('type() - bon username', () => {
        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
            .clear()
            .type('test').should('have.value', 'test')

            cy.get('#passwd')
            .clear()
            .type('test').should('have.value', 'test')

            cy.get('input[type="submit"]').click()
        })
        cy.location('pathname').should('match', /\/$/);
    })
})
