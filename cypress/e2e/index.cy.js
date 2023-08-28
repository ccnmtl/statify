describe('Home Page', () => {

    beforeEach(() => {
        let baseUrl = 'http://localhost:8000/';
        cy.visit(baseUrl);
        cy.get('#cu-privacy-notice-button').click();
    });
    it('Checks that the site loads', () => {
        cy.get('h1').contains('Introduction');
    });
    it('Tests a11y on the home page', () => {
        cy.checkPageA11y();
    });
    it('Has link that takes you to first module', () => {
        // cy.get('[data-cy="statify-start"]').should('contain',
        //     'Good question.');
        cy.get('[data-cy="statify-start"]').click();
        cy.url().should('eq', 'http://localhost:8000/descriptive/');
    });
});