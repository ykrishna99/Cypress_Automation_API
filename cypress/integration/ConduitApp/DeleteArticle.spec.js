// Author: Krishna Rao

///<reference types='Cypress'/>

describe('Delete an Article Suite', function () {

    beforeEach('Login to App', function () {        
        cy.loginToConduitApp()
    })

    it('Delete Article', function () {

        cy.intercept('DELETE', '**/articles/*').as('deleteArticle')

        cy.contains('Global Feed').click()
        cy.get('h1').first().click()
        cy.wait(5000)
        cy.contains(' Delete Article').first().click()
        
        cy.wait('@deleteArticle').then( interception => {
             console.log(interception)
             expect(interception.response.statusCode).equal(204)
             expect(interception.response.body).equal('')
             expect(interception.request.url).equal(interception.response.url)   
        })    
    })
})