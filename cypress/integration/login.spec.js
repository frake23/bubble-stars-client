describe('Login', () => {
    it('should redirect and login', () => {
        cy.visit('http://localhost:3000/')
        cy.get('button').click();

        cy.url().should('include', '/login');
        
    }),
    it('should redirect on create bubble', () => {

    })
})