describe('Comparing Genres', () => {

    beforeEach(() => {
        let baseUrl = 'http://localhost:8000/comparative/';
        cy.visit(baseUrl);
    });
    it('Checks that the site loads', () => {
        cy.url().should('eq', 'http://localhost:8000/comparative/');
    });
    it('Contains Comparing Genres attributes', () => {
        cy.get('h1.py-4').contains('3.Comparing Genres');
        cy.get('[data-cy="graphForm"]').should('exist');
        cy.get('#firstGenre').scrollIntoView().should('be.visible');
        cy.get('#secondGenre').scrollIntoView().should('be.visible');
        cy.get('#audioFeature').scrollIntoView().should('be.visible');
        cy.get('#dataPoints').scrollIntoView().should('be.visible');
        cy.get('#seed').should('exist');

        cy.get('[data-cy="SampleDataHistogram"]').should('not.exist');
        cy.get('[data-cy="DistributionHistogram"]').should('not.exist');
        cy.get('[data-cy="sampleMean"]').should('exist');
    });
    it('Checks tabs', () => {
        cy.get('[data-cy="0"]').should('exist');
        cy.get('[data-cy="1"]').should('exist');
        cy.get('[data-cy="2"]').should('exist');
        cy.get('[data-cy="3"]').should('exist');

        cy.get('[data-cy="SampleDataHistogram"]').should('not.exist');
        cy.get('[data-cy="DistributionHistogram"]').should('not.exist');
        cy.get('[data-cy="3"]').click();
        cy.get('[data-cy="sampleMean"]').should('exist');
        cy.get('[data-cy="DistributionHistogram"]').should('exist');
        cy.get('[data-cy="estimatedDistribution"]').should('not.exist');

    });

    it('Checks form', () => {
        cy.get('#submit-btn').click();
        cy.get('#firstGenre')
            .invoke('prop', 'validationMessage')
            .should((text) => {
                expect(text).to.contain('Please select an item in the list.');
            });
    });

    it('Tests a11y', () => {
        cy.checkPageA11y();
    });
});