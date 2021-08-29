/// <reference types="cypress" />
describe('Testing Cart', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3000/grocery?_page=1&_limit=16', {
      fixture: 'grocery'
    }).as('getListGroceries');
    cy.visit('/');
    cy.wait('@getListGroceries')

    cy.wait(500);
    cy.intercept('http://localhost:3000/grocery?_page=1&_limit=16', {
      fixture: null
    }).as('getListGroceries');
  })
  it('test adding to cart', () => {

    cy.get(`.productItemContainer`).should('have.length', 16)
    // We had an item to the cart
    cy.get(`[data-testid=add-button]:first`).click()
    // Make sure the item is there
    cy.get(`.cartItem`).should('have.length', 1)
    // We had a second unit of the same item
    cy.get(`[data-testid=add-button]:first`).click()
    // Make there is still only one element in the cart
    cy.get(`.cartItem`).should('have.length', 1)

    // Add a second item
    cy.get(`[data-testid=add-button]`).eq(2).click()
    // Now there should be two items
    cy.get(`.cartItem`).should('have.length', 2)

    // Check total of first item
    cy.get(`[data-testid=total-items]`).eq(0).should('contain.html', '2')

  })
  it('test removing from cart', () => {
    cy.get(`.productItemContainer`).should('have.length', 16)
    // We had an item to the cart
    cy.get(`[data-testid=add-button]:first`).click()
    // Remove it from cart
    cy.get(`[data-testid=remove-from-cart]:first`).click()

    //Now there should only be one item in the cart
    cy.get(`.cartItem`).should('have.length', 0)
  })

  it('to toggle favorite and be able to see it', () => {
    // First we check the amount of favorites that exist
    cy.get(`[aria-label="Favorited"]`).should('have.length', 3)
    // Toggle the favorite toggle and see if it the same number
    cy.get(`[aria-label="Favorite toggle"]`).click()
    cy.get(`.productItemContainer`).should('have.length', 3)
    // We remove one of the favorites and it should reflect
    cy.get(`[aria-label="Favorited"]`).eq(1).click()
    cy.get(`.productItemContainer`).should('have.length', 2)
    // It should also reflect on the general view
    cy.get(`[aria-label="Favorite toggle"]`).click()
    cy.get(`[aria-label="Favorited"]`).should('have.length', 2)
  })

  it('should not let me to add more items that there are in stock', () => {
    // Add another item from the cart
    cy.get(`[data-testid=add-button]:first`).click()
    // Test to not be able to add more items to the cart than possible
    for (let index = 0; index < 12; index++) {
      cy.get(`[data-testid=add-from-cart]`).eq(0).click()
      cy.wait(100);
    }
    for (let index = 0; index < 12; index++) {
      cy.get(`[data-testid=add-button]:first`).click()
      cy.wait(100);
    }
    cy.get(`[data-testid=total-items]`).eq(0).should('contain.html', '8')
  })
})