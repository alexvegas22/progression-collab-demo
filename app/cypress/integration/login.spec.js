describe('Page Login', () => {
    it('charge la page', () => {
        cy.visit('/login');
    });

    it('type() - stub mauvais username', () => {
        cy.fixture('auth_échec.json').then(json_erreur_connexion => {
            cy.intercept(
                'POST',
                `${Cypress.env('backend_url')}${Cypress.env('endpoint_auth')}`,
                requête => {
                    requête.reply({
                        statusCode: 401,
                        body: json_erreur_connexion
                    });
                }
            );
        });

        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
            .type('test').should('have.value', 'test');

            cy.get('#passwd')
            .type('test').should('have.value', 'test');

            cy.get('input[type="submit"]').click();
        })
        cy.get('#app').within(() => {
            cy.get('div.alert', { timeout: 10000 })
            .should('have.css', 'display', 'block');
        });
    });

    it('type() - mauvais username', () => {
        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
            .clear()
            .type('unUser').should('have.value', 'unUser');

            cy.get('#passwd')
            .clear()
            .type('unPasswd').should('have.value', 'unPasswd');

            cy.get('input[type="submit"]').click();
        })
        cy.get('#app').within(() => {
            cy.get('div.alert', { timeout: 10000 })
            .should('have.css', 'display', 'block');
        });
    });

    it('type() - bon username', () => {
        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
            .clear()
            .type('utilisateurTest').should('have.value', 'utilisateurTest');

            cy.get('#passwd')
            .clear()
            .type('utilisateurTest').should('have.value', 'utilisateurTest');

            cy.get('input[type="submit"]').click();
        })
        cy.location('pathname').should('match', /\/$/);
    })
})
