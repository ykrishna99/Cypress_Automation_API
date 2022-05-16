// Author: Krishna Rao

/// <reference types='Cypress'/>

describe('Tags Suite', function () {

    beforeEach('Mock Tags', function () {
        cy.intercept('GET', '**/tags', (req) => {
            req.reply({
                fixture:'tags.json'
            })
        })
    })

    it('Home Page Tags test', function () {
        cy.visit('/')
        cy.get('.sidebar .tag-list')
            .should('contain', 'cypress')
            .and('contain', 'automation')
            .and('contain', 'testing')
    })

    it('Post Login Tags test', function () {
        cy.loginToConduitApp()
        cy.get('.sidebar .tag-list')
            .should('contain', 'cypress')
            .and('contain', 'automation')
            .and('contain', 'testing')
    })
})