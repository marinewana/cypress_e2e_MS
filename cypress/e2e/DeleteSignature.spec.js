describe('Login via gmail(cookies) and deleting a signature/page/bc', () => {
  it('Opens dashboard as authenticated user and deleting a signature', () => {
    cy.loginByCookies();
    cy.visit('https://mysignature.io/dashboard');

    // Перевірка, що ми реально в акаунті
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
cy.intercept('DELETE','https://api.mysignature.io/_/signatures/*').as('AfterDeleteSignature')


    cy.get('.o-tabs-sidebar.u-wd-12\\@xl').contains('Signatures').click()

    cy.get('.o-all-cards__sign.u-mr-t0').first().within(()=>{
        cy.get('.a-tooltip').first().click()
         cy.get('.o-menu__list.u-mr-b0.u-pd-l0',{ timeout: 10000 })
          .should('be.visible')
    .contains('Delete')
    .click()
    cy.get('.o-popup-block.u-br-15').find('button').contains('Delete').click()
        
    
    })
   
    cy.wait('@AfterDeleteSignature').then(xhr=>{
    console.log(xhr)
    //expect(xhr.response, 'response should be defined').to.not.be.undefined
    expect(xhr.response.statusCode).to.equal(200)
 })
  });


it('Opens dashboard as authenticated user and deletes a page', () => {
  cy.loginByCookies();
  cy.visit('https://mysignature.io/dashboard');

  // Перевірка, що ми реально в акаунті
  cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

  // Слухаємо DELETE-запит
  cy.intercept('DELETE', 'https://api.mysignature.io/_/pages/*').as('AfterDeletePage');

  // Переходимо у Pages
  cy.get('.o-tabs-sidebar.u-wd-12\\@xl').contains('Pages').click();

  // Беремо першу картку і відкриваємо меню
  cy.get('.o-page-card__header.u-br-t1f5').first().within(  () => {
    cy.get('.u-ps-rel').first().click();
  });

  // Вибираємо Delete у меню
  cy.get('.o-menu__list.u-mr-va0.u-pd-l0', { timeout: 10000 })
    .should('be.visible')
    .contains('Delete')
    .click();

  // Тепер чекаємо на модалку й тицяємо "Delete page"
  cy.contains('button', 'Delete page', { timeout: 10000 }).click();

  // Чекаємо на DELETE-запит і перевіряємо статус
  cy.wait('@AfterDeletePage').then(xhr=>{
    console.log(xhr)
    expect(xhr.response.statusCode).to.equal(204)
  })



  // Перевіряємо, що картка зникла з DOM
  //cy.get('.o-page-card__header.u-br-t1f5').should('have.length.lessThan', 1);
})




  it('Opens dashboard as authenticated user and deleting a card',()=>{
    cy.loginByCookies();
    cy.visit('https://mysignature.io/dashboard');

    // Перевірка, що ми реально в акаунті
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
cy.intercept('DELETE','https://api.mysignature.io/_/business-cards/*').as('AfterDeleteCard')
 cy.get('.o-tabs-sidebar.u-wd-12\\@xl').contains('Business cards').click()

 
  // Рахуємо картки до видалення
  let initialCount;
  cy.get('.o-page-card__header.u-br-t1f5')
    .its('length')
    .then(count => {
      initialCount = count
      console.log(initialCount);
    });
// Відкриваємо меню у першої картки
cy.get('.o-page-card__header.u-br-t1f5').first().within( ()=>{
cy.get('.u-ps-rel').first().click() 
 })
cy.get('.o-menu__list.u-mr-va0.u-pd-l0',{ timeout: 10000 })
          .should('be.visible')
    .contains('Delete')
    .click()

 // Тепер чекаємо на модалку й тицяємо "Delete bc"
  cy.contains('button', 'Delete', { timeout: 10000 }).click();

  // Чекаємо на DELETE-запит і перевіряємо статус
  cy.wait('@AfterDeleteCard').then(xhr=>{
    console.log(xhr)
    expect(xhr.response.statusCode).to.equal(204)
  })


   //cy.get('.o-page-card__header.u-br-t1f5', { timeout: 10000 })
    //.should('have.length', initialCount - 1);

})





})
