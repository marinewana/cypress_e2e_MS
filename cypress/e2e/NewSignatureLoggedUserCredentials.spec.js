describe('Creating new signature/bc/page for logged user(email + password) ', () => {
  beforeEach('Login to application',()=>{
    cy.loginByCookies()
    cy.visit('https://mysignature.io/dashboard');
  })
  it('Creating the signature', () => {
    // Intercept the signature creation request
    cy.intercept('POST','**/signatures').as('saveSignature')
    // Wait until "Signatures" tab is visible, then click
    cy.navigateToCreationFlow('Signatures', 'New signature', 'Choose a signature template')
    // Hover over and select the first template
    cy.hoverAndUseFirstTemplate({
      selector: '.masonry-item',
      buttontext: 'Use template'
    })
    cy.nameAndSaveSignature({
      placeholder: 'Name',
      name: 'New test',
      buttonLabel: 'Save signature'
    })

    // Assert intercepted request
    cy.wait('@saveSignature').then(xhr=>{
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(200)
      expect(xhr.request.body.general.name).to.equal('New test')
      expect(xhr.response.body.general.name).to.equal('New test')
    })
   
  })

  it('Creating the Page',()=>{
// Intercept the signature creation request
cy.intercept('POST','**/pages').as('savePage')
// Wait until "Signatures" tab is visible, then click
cy.navigateToCreationFlow('Pages', 'New page', 'Choose a ready-made template')
// Hover over and select the first template
cy.hoverAndUseFirstTemplate({
  selector: '.masonry-column'
  
})
cy.nameAndSaveSignature({
  placeholder: 'Title',
  name: 'New test',
  buttonLabel: 'Save and publish'
})

// Assert intercepted request
cy.wait('@savePage').then(xhr=>{
  console.log(xhr)
  expect(xhr.response.statusCode).to.equal(201)
  expect(xhr.request.body.profile.title).to.equal('New test')
  //expect(xhr.response.body.general.name).to.equal('New test')
})

  })


  it('Creating the BC',()=>{
    // Intercept the BC creation request
    cy.intercept('POST','**/business-cards').as('saveCard')
    // Wait until "Signatures" tab is visible, then click
    cy.navigateToCreationFlow('Business cards', 'New business card', 'Choose page to create business card from')
    // Hover over and select the first template
    cy.hoverAndUseFirstTemplate({
      selector: '.masonry-column',
      buttontext: 'Use page'
    })
    cy.nameAndSaveSignature({
      placeholder: 'Title *',
      name: 'New test',
      buttonLabel: 'Save card'
    })
    
    // Assert intercepted request
    cy.wait('@saveCard').then(xhr=>{
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.title).to.equal('New test')
      expect(xhr.response.body.title).to.equal('New test')
    })
    
      })

})