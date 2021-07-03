describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test User',
            username: "testuser",
            password: "salainen"
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('form')
            .should('contain', 'login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Test User logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('wrong password')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })
})