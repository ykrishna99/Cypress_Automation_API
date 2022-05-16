// Author: Krishna Rao

/// <reference types='Cypress'/>

describe('Tags Suite', function () {

    beforeEach('Mock Articles', function () {
        
        cy.intercept('GET', '**/articles/feed*', (req) => {
            req.reply(
                '{"articles":[],"articlesCount":0}'
            )
        })

        cy.intercept('GET', '**/articles*', (req) => {
            req.reply({
                fixture:'articles.json'
            })
        })

        cy.loginToConduitApp()
    })

    it('Get articles', function () {
        cy.contains('Global Feed').click()
        cy.wait(200)
        cy.get('button.btn-outline-primary').then( likes => {
            expect(likes[0]).to.contain('2')
            expect(likes[1]).to.contain('5')
        })

        //Mocking likes count
        cy.fixture('articles').then ( file => {
            const likeLink = file.articles[1].slug
            cy.intercept('POST', '**/articles/'+ likeLink + '/favorite', (req) => {
                req.reply(file)
            })
            cy.get('button.btn-outline-primary')
                .contains(5)
                .click()
                .should('contain', '6')
        })
    })

})