describe ('Invalid login',()=>{

it.only('Log in with the Invalid credentials (Invalid email)',()=>{

    cy.visit(Cypress.env('PROD_MS'))
    cy.get('[placeholder="Email *"]').type(Cypress.env('DEV_Invalid_Email'))
    cy.get('[placeholder="Password *"]').type(Cypress.env('DEV_Valid_Email_MS'))
    cy.get('form').submit()

    cy.get('.a-login-error.e--auth-error').should('contain','Invalid credentials.')
})

 it('Forgot password:Valid email',()=>{

    cy.intercept('https://api.mysignature.io/app/registration/forgot-password').as('SendEmail')


    cy.visit(Cypress.env('PROD_MS'))
    cy.get('form').contains('Forgot password?').click()
    cy.get('[placeholder="Email *"]').type('mariana.h@solva.io')
    cy.get('button').contains('Send').click()
    cy.get('[class="l-wrapper u-wd-full u-wd-auto@xl"]').should('contain',"We've sent a password recovery link to your email.")

    cy.wait('@SendEmail').then(xhr =>{
        console.log(xhr)
        expect(xhr.response.statusCode).to.equal(200)
        expect(xhr.request.body.email).to.equal('mariana.h@solva.io')
    })
 })

it('Forgot password: Invalid email', () => {
  const EMAIL = Cypress.env('DEV_Invalid_Email') || 'invalid.user+e2e@example.com';

  cy.visit(Cypress.env('PROD_MS'));
  cy.contains('Forgot password?').click();

  cy.get('form.m-auth-form', { timeout: 10000 }).as('form');

  const INPUT = '@form input[type="email"], @form input[type="text"]';

  // окремі re-query кроки
  cy.get('@form').find('input[type="email"], input[type="text"]').first()
    .should('be.visible')
    .and('not.be.disabled');

  cy.get('@form').find('input[type="email"], input[type="text"]').first().clear({ force: true });

  // друкуємо швидко, щоб зменшити шанс ререндеру під час набору
  cy.get('@form').find('input[type="email"], input[type="text"]').first()
    .type(EMAIL, { delay: 0 });

  cy.get('@form')
    .contains('button', /^Send$/)
    .should('be.enabled')
    .click();

  cy.contains('.a-login-error', 'User not found', { timeout: 10000 })
    .should('be.visible');
});



})