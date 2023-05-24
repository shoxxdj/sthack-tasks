var urltwo = "http://website/admin_interface_JntjKPI5Awrqih_cant_guess/admin_secure_page.php"
var url = "http://website/"


// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit(url);
//     cy.visit(urltwo);
//     cy.wait(10000);
//     expect(add(1, 2)).to.eq(3)
//   })
// });

describe("Example test", () => {
  it("Visits a URL and waits for 10 seconds", () => {
    // Visit the URL you want to test
    cy.visit(url);
    cy.visit(urltwo);

    // Wait for 10 seconds
    cy.wait(10000);
    cy.url().should("equal", urltwo);
    cy.wait(5000);
  });
});
