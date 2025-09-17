describe('Log in with the Gmail credentials', () => {
  it('Opens dashboard as authenticated user', () => {
    cy.loginByCookies();
    cy.visit('https://mysignature.io/dashboard');

    // Перевірка, що ми реально в акаунті
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
  });
});