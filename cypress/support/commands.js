// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('LoginToApplication',()=>{

    //cy.visit('/login')


    cy.visit('mysignature.io/login')
    cy.get('[placeholder="Email *"]').type('mariana.h@solva.io')
    cy.get('[placeholder="Password *"]').type('Pjhzyf1992')
    cy.get('form').submit()
})

Cypress.Commands.add('fillSignUpFormAndSubmit',({ name, email, password })=>{

    cy.intercept('POST','https://devapi.mysignature.io/app/registration/register').as('AfterLogin')
 //Step 9:Fill and submit the form 
 cy.get('form').find('[placeholder="Name *"]').clear().type(name)
 cy.get('form').find('[placeholder="Email *"]').clear().type(email)
 cy.get('form').find('[placeholder="Password *"]').clear().type(password)
 cy.get('button[type="submit"]').click()

 cy.wait('@AfterLogin').then(xhr=>{
    console.log(xhr)
    //expect(xhr.response, 'response should be defined').to.not.be.undefined
    expect(xhr.response.statusCode).to.equal(200)
 })
 // Check that URL includes dashboard after login 
 cy.url().should('include', '/dashboard')
 cy.get('form').should('not.exist')
})


Cypress.Commands.add('hoverAndUseFirstTemplate',({selector = '.masonry-item', buttontext='Use template'})=>{
    cy.get(selector).first().scrollIntoView().trigger('mouseover')
        cy.contains('button', buttontext).first().click({ force: true })
})

Cypress.Commands.add('completeEditorSteps', () => {
    // Step 3: Name & Next
    cy.get("[placeholder=\"What's your name? *\"]").type('Mariana')
    cy.contains('button', 'Next').should('be.visible').click()
  
    // Step 4: Industry
    cy.get('.m-select.u-ta-left').first().as('industryDropdown')
    cy.get('@industryDropdown').click()
    cy.get('@industryDropdown').invoke('attr', 'class').should('include', 'e--open')
    cy.get('.m-select__list').contains('Real Estate and Construction').click({ force: true })
    cy.get('@industryDropdown').should('contain', 'Real Estate and Construction')
  
    cy.get("[placeholder=\"What's your position? *\"]").type('Position')
    cy.contains('button', 'Next').click()
  
    // Step 5: Usage
    cy.get('.m-select.u-ta-left').first().as('usageDropdown')
    cy.get('@usageDropdown').click()
    cy.get('@usageDropdown').invoke('attr', 'class').should('include', 'e--open')
    cy.get('.m-select__item').contains('Myself').click()
    cy.get('button').contains('Next').should('be.visible').click()
  
    // Step 6: Platform
    cy.contains('label', 'Facebook').click()
    cy.contains('button', 'Next').click()
  
    // Step 7: Integrations
    cy.contains('label', 'Outlook').click()
    cy.contains('label', 'Other').click()
    cy.contains('button', 'Get started').should('be.visible').click()
  
  })

//Reset to free 
  Cypress.Commands.add('resetToFree',()=>{
    cy.get('.o-editor-preview__email.u-br-20.u-of-hidden.u-bs-2').contains('Reset to free design.').click()
        cy.get('button').contains('Reset to free').click()
        cy.contains('button','Save and Sign up').click()
  })

//Navigate to the the signature/bc/page template using "New.." button 
Cypress.Commands.add('navigateToCreationFlow',(sidebarLabel, newButtonLabel, templateTitle)=>{

    cy.get('.o-tabs-sidebar__group').contains(sidebarLabel).should('be.visible').click()
    // Wait until "New signature" is visible, then click
    cy.contains(newButtonLabel).click()
    // Wait for signature template modal
    cy.contains(templateTitle, { timeout: 10000 }).should('be.visible')
    // Hover over and select the first template

})

//Save signature/BC/Page by pressing Save signature/BC/Mypage button 
Cypress.Commands.add('nameAndSaveSignature',({placeholder, name, buttonLabel})=>{
    cy.get(`[placeholder="${placeholder}"]`).clear().type(name)
    // Submit creating the signature
    cy.get('button').contains(buttonLabel).should('be.visible').click()
})



Cypress.Commands.add('loginByCookies', () => {
  const cookies = [
    { name: 'token', value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTc5NDk1NTksImV4cCI6MTc2MDU0MTU1OSwicm9sZXMiOltdLCJ1c2VybmFtZSI6Im1hcmlhbmFnbGFkaWlAZ21haWwuY29tIn0.uufLuZpKDHoeqn3_COC4plRGk8ueascsxMqYvtx_NPTU5d2E9IrC0HLIk9yg1yOwqEz0mvSsc1-yviLYLNhOjOwit4DOylL_eTYebPUxTgjipFE4br0oLUBTAC0sJzs6LdL1hPISiEotvgAXQbGY3IPVUbynXc03QjhHk8lXWu4CDUoxEUErWIq9OFkCCmmQ0gTjzHW6zuxxetr2fivkTV803NdB578y_MUgbj_3MiI_w4L_wxVsSciKYE3UK9f_C9Vv9Y3W9bGbXmkFIBi7S8D1F-GZnKpzbcEW2YXo_Ejsfmn9U2_G34TwLlIVs5RwLOyPrJGVJ1MK60hVNkOgI7dN1wqA9Iqr64sbo_9r3WT01XwaF4UK8CO_ObkBKesdjAHzXXxfqcn_KKnfgw2XLgckR_s6UCg2G8kkRYDkF9FPVNTD543G14uN30OnRGzzXS5OnY1poBYhT7LUyTyB2sJQi7vphbSQkZEJWrYlmun2hEUwvbrIrJtLNQP4wGBwICE66SnPO6Sc_1hFmyf20ErZDUdgPYvH4KNghgjmoe0HjDaauVq265PKCJJSSrkV0-BGwrlhyOA2hzsGKbfMUZF3i5yX6PQQZ1ne1s9WNkEuDox2V60NeM9P0INPedgID51vtGM56GEFv14L6Cyvu2BdWHEFhdoh49YIAi8F31M', domain: 'mysignature.io' },
    { name: 'xs', value: '27%3Ay-ybCDHiKL04QA%3A2%3A1745491498%3A-1%3A15709', domain: 'mysignature.io' },
    { name: 'SSID', value: 'AnG7bRqhMw-eT7ZIK', domain: 'mysignature.io' },
    { name: 'SID', value: 'g.a0001Qh0p1XryPYNu6pQ_pRPI4ScuaDVzwxQWSNuDDIp_baD0KJ0EK_I3iHEjYAijkYaPVG0TAACgYKAWsSARISFQHGX2MiTAgD_kppVEfcy8rEMLQvLxoVAUF8yKqm8Mb7g1p0RPE4sh0DDmYN0076', domain: 'mysignature.io' },
    { name: 'SIDCC', value: 'AKEyXzW-Jg3xzmnUlsvlRykyl5TxdadnhcXtSAz2YacZnRQonuDpv7JSMU29CuH5m7v0sb_ZAU2X', domain: 'mysignature.io' },
    { name: 'SAPISID', value: 'AzY3gwKsXC-FYQsW/ADUO8Opd2zHDt1yY8', domain: 'mysignature.io' }
  ];

  cookies.forEach(c => {
    cy.setCookie(c.name, c.value, { domain: c.domain });
  });
});



Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body)
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      }

      window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
      cy.visit('/')
    })
  })
})