describe('Login', () => {
    it('should redirect and login', () => {
        cy.visit('http://localhost:3000/')
        cy.get('button').click();

        cy.url().should('include', '/login');
        cy.get('a[href="/register"]').click();
        cy.url().should('include', '/register');

        cy.fixture('user').then(user => {
            cy.get('#email').type(user.email)
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('button').click()
            cy.url().should('include', '/')
            cy.get('a[href="/bubbles/manage/all"]').click()
            cy.url().should('include', '/bubbles/manage/all')
        })
    }),
    it('should redirect on create bubble', () => {
        cy.visit('http://localhost:3000/')
        cy.get('a[href="/bubbles/manage/all"]').click()

        cy.url().should('include', '/login')
    })
})