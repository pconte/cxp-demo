context('Index', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('perform a search', () => {
        cy.get('#search-form')
          .find('[type="text"]').type(`test{enter}`)
        
        cy.get('#search-form')
          .find('[type="text"]').should('contain', '')
    })
})