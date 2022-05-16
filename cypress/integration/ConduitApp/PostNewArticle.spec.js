// Author: Krishna Rao

/// <reference types='Cypress'/>

describe('New Article Suite', function () {

    beforeEach('login to app', () => {
        cy.loginToConduitApp()
    })

    it('Post New Article', function () {
        cy.intercept('POST', '**/articles').as('postNewArticle')

        cy.contains('New Article').click()
        cy.get('[placeholder="Article Title"]').type('Cypress')
        cy.get('[placeholder="What\'s this article about?"]').type('Cypress Automation Tool')
        cy.get('[placeholder="Write your article (in markdown)"]').type('It is very good tool')
        cy.get('[placeholder="Enter tags"]').type('cypress')
        cy.get('.btn-primary').click({force: true})

        cy.wait('@postNewArticle').then( interception => {
            console.log(interception)
            expect(interception.request.body.article.body).to.equal('It is very good tool')
            expect(interception.request.body.article.title).to.equal('Cypress')
            expect(interception.response.statusCode).equal(200)
            expect(interception.response.body.article.author.username).equal('sathvi')
            expect(interception.response.body.article.tagList[0]).equal('cypress')
        })
        
    })

})