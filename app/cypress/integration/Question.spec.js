describe('La page question', () => {

    it('si pas connecté on est sur la page login, ', () => {

        cy.visit('http://ordralphabetix.dti.crosemont.quebec:8022/question?uri=aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9jb250ZW51L3Byb2dfMS9hMmE4NTM2ZS03YTA5LTRmOGMtYTU5MC00NDUzNTI3YTQwMWQvaW5mby55bWw') // change URL to match your dev URL
        cy.get('div[id=login]').should('be.visible')
    })


    it('si pas connecté, mais on se connecte, on ne devrait plus être sur la page login', () => {
        cy.get('div[val="STANDARD"]').within(() => {
            cy.get('#username')
                .clear()
                .type('utilisateurTest').should('have.value', 'utilisateurTest')

            cy.get('#passwd')
                .clear()
                .type('utilisateurTest').should('have.value', 'utilisateurTest')

            cy.get('input[type="submit"]').click()
        })

        cy.url().should('eq', 'http://ordralphabetix.dti.crosemont.quebec:8022/question?uri=aHR0cHM6Ly9wcm9ncmVzc2lvbi5wYWdlcy5kdGkuY3Jvc2Vtb250LnF1ZWJlYy9jb250ZW51L3Byb2dfMS9hMmE4NTM2ZS03YTA5LTRmOGMtYTU5MC00NDUzNTI3YTQwMWQvaW5mby55bWw');
        cy.get('div[id=login]').should('not.exist')


        
        cy.get('.CodeMirror textarea').type(
            "{ctrl+a}{del}int nombre1 = 0;\ndouble nombre2 = 120.275;\nchar lettre1 = ' ';\nchar lettre2 = '1';\nboolean statut = false;\n", {
                force: true
            }).then(
            () => {
                cy.get('[id=btn_soumettre_tentative]').click()
            }
        )
        

    })



})
