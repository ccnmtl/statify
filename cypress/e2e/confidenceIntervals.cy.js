describe('Confidence Intervals', () => {

    beforeEach(() => {
        let baseUrl = 'http://localhost:8000/confidence/';
        cy.visit(baseUrl);
    });
    it('Checks that the site loads', () => {
        cy.url().should('eq', 'http://localhost:8000/confidence/');
    });
    it('Contains Confidence Intervals attributes', () => {
        cy.get('h1.py-4').contains('4.Confidence Intervals');
        cy.get('[data-cy="graphForm"]').should('exist');
        cy.get('#firstGenre').scrollIntoView().should('be.visible');
        cy.get('#secondGenre').scrollIntoView().should('be.visible');
        cy.get('#audioFeature').scrollIntoView().should('be.visible');
        cy.get('#dataPoints').should('not.exist');
        cy.get('#seed').should('exist');

        cy.get('[data-cy="SampleDataHistogram"]').should('exist');
        cy.get('[data-cy="DistributionHistogram"]').should('not.exist');
        cy.get('[data-cy="sampleMean"]').should('not.exist');
    });
    it('Checks tabs', () => {
        cy.get('[data-cy="0"]').should('exist');
        cy.get('[data-cy="1"]').should('not.exist');
        const histos = cy.get('[data-cy="SampleDataHistogram"]');
        histos.should('have.length', 2);
        cy.get('[data-cy="DistributionHistogram"]').should('not.exist');

        cy.get('[data-cy="sampleMean"]').should('not.exist');
        cy.get('[data-cy="DistributionHistogram"]').should('not.exist');
        cy.get('[data-cy="estimatedDistribution"]').should('exist');
    });

    it('Checks form', () => {
        cy.get('[data-cy="secondGenre"]').click();
        cy.get('[data-cy="Option2-0"]').click();
        cy.get('[data-cy="secondGenre"]').should('contain', '5th Wave Emo');
        cy.get('[data-cy="reset"]').click();
        cy.get('[data-cy="secondGenre"]').should('contain', 'Select One');

        cy.get('#submit-btn').click();
        cy.get('#audioFeature')
            .invoke('prop', 'validationMessage')
            .should((text) => {
                expect(text).to.contain('Please select an item in the list.');
            });
    });

    it('Tests a11y', () => {
        cy.checkPageA11y();
    });
});