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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function() {
            cy.get('#create-new').click()
            cy.get('#title').type('Test Blog')
            cy.get('#author').type('Tester')
            cy.get('#url').type('test.com')
            cy.get('#submit-blog').click()

            cy.contains('Added "Test Blog" to blogs')            
            cy.get('.blogDiv:last-child').contains('Test Blog')
        })
    })
})