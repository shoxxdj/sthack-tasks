// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

var url = "http://client:3000"
describe('Open the app', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit(url)

    //cy.contains('Get Message').click()
    cy.get('#login')
    .type("admin@sthack.fr");
    cy.get('#password')
    .type('wjT0PefHfJ4uV-SvJ9wYwjT0PefHfJ4uV-SvJ9wY')
    cy.contains('Sign In').click()
    cy.wait(2000)

    cy.contains('Get Message').click()
    cy.wait(2000)
    //cy.contains('GetFlag').click()
  })
})

// describe('Click the get flag button',()=>{
//  it('Click the button',()=>{

//  })
// });
