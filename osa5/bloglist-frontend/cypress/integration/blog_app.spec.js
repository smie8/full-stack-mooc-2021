const { wait } = require("@testing-library/dom")

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
            createNewBlog('Test Blog')

            cy.contains('Added "Test Blog" to blogs')            
            cy.get('.blogDiv:last-child').contains('Test Blog')
        })

        it('A blog can be liked', function() {
            createNewBlog('Test Blog')

            cy.get('.blogDiv:last-child span').click()
            cy.get('.blogDiv:last-child').contains('likes: 0')
            cy.get('.blogDiv:last-child button:nth-child(2)').click()
            cy.get('.blogDiv:last-child').contains('likes: 1')
        })

        it('A blog can be deleted', function() {
            createNewBlog('Test Blog')

            cy.get('.blogDiv:last-child span').click()
            cy.get('.blogDiv:last-child button:last-child').click()

            cy.contains('Deleted blog: "Test Blog"')
        })
        
        it('Blog list is arranged by the number of blog likes (liking last blog should move it to be the first)', function() {
            createNewBlog("Test Blog 1")
            createNewBlog("Test Blog 2")

            cy.get('.blogDiv').should('not.contain', 'Test Blog 2')

            cy.wait(2500)

            cy.get('.blogDiv span', { timeout: 10000 }).then( blogs => {
                console.log('number of blogDivs', blogs.length)
                cy.wrap(blogs[1]).click()
                cy.get('.blogDiv:last-child button:nth-child(2)').click()
            })

            cy.get('.blogDiv').should('contain', 'Test Blog 2')
        })
    })
})

function createNewBlog(title) {
    cy.get('#create-new', { timeout: 5000 }).click()
    cy.get('#title').type(title)
    cy.get('#author').type('Tester')
    cy.get('#url').type('test.com')
    cy.get('#submit-blog').click()
}