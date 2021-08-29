/// <reference types="cypress" />
describe('Testing Cart', () => {
  it('successfully loads page', () => {
    cy.intercept('http://localhost:3000/grocery?_page=1&_limit=16', {
      fixture: 'grocery'
    }).as('getListGroceries');
    cy.visit('/');
    cy.wait('@getListGroceries')
  })
})