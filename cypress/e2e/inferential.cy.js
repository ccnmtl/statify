describe('Inferential Statistics', () => {

    beforeEach(() => {
        let baseUrl = 'http://localhost:8000/inferential/';
        cy.visit(baseUrl);
    });
    it('Checks that the site loads', () => {
        cy.url().should('eq', 'http://localhost:8000/inferential/');
    });
    it('Contains the Inferential Stats attributes', () => {
        cy.get('h1.py-4').contains('2.Inferential Statistics');
        cy.wait(6000);
        cy.get('[data-cy="graphForm"]').should('exist');
        cy.get('#firstGenre').scrollIntoView().should('be.visible');
        cy.get('#dataPoints').scrollIntoView().should('be.visible');
        cy.get('#seed').should('exist');
        cy.get('#secondGenre').should('not.be', 'visible');

        cy.get('[data-cy="SampleDataHistogram"]').should('exist');
        cy.get('[data-cy="sampleMean"]').should('exist');
    });
    it('Checks tabs', () => {
        cy.get('[data-cy="0"]').should('exist');
        cy.get('[data-cy="1"]').should('exist');
        cy.get('[data-cy="2"]').should('exist');

        cy.get('[data-cy="DistributionHistogram"]').should('not.exist');
        cy.get('[data-cy="2"]').click();
        cy.get('[data-cy="DistributionHistogram"]').should('exist');
        cy.get('[data-cy="estimatedDistribution"]').should('not.exist');

    });

    it('Checks form', () => {
        cy.wait(6000);
        cy.get('[data-cy="firstGenre"]').click();
        cy.get('[data-cy="Option1-0"]').click();
        cy.get('[data-cy="firstGenre"]').should('contain', '5th Wave Emo');
        cy.get('#submit-btn').click();
        cy.get('#dataPoints')
            .invoke('prop', 'validationMessage')
            .should((text) => {
                expect(text).to.contain('Please select an item in the list.');
            });
        cy.get('[data-cy="reset"]').click();
        cy.get('[data-cy="firstGenre"]').should('contain', 'Select One');
    });

    it('Tests a11y', () => {
        cy.checkPageA11y();
    });
});