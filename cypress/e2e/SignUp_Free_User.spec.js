describe('Sign up from Signature/Page/BC for the Free user',()=>{
    //to avoid an error message 
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err) => {
          if (err.message.includes('ResizeObserver loop')) return false
        })
      })
    //function 
const SignUpFlow = ({url,buttonLabel,expectedPath})=>{
    cy.visit(url)
    cy.get('header').find('button').should('be.visible').click()
    cy.get('.l-header__auth').contains(buttonLabel).should('be.visible').click()
    cy.url().should('include',expectedPath)
}
    it.only('SignUpFromSignature for the Free user',()=>{
        SignUpFlow({
            url:Cypress.env('PROD_MS'),
            buttonLabel:'MySignature',
            expectedPath:'/editor'
        })
        //// Step 2: Hover over first template and use it
        cy.hoverAndUseFirstTemplate(
            {selector: '.masonry-item', 
            buttontext: 'Use template'}
        )
        //Editor steps 
        cy.completeEditorSteps()
        //Reset to free design 
        cy.resetToFree()
        //intercept the request 
        cy.fillSignUpFormAndSubmit({
            name: 'Mariana',
            email: Cypress.env('DEV_Valid_Email_MS'),
            password: Cypress.env('DEV_Valid_Password_MS')
          })
        })
    
       
    it('SignUpFromPage for Free user',()=>{

        SignUpFlow({
            url:Cypress.env('PROD_MS'),
            buttonLabel:'MyPage',
            expectedPath:'/editor-mypage'
        })
    //// Step 2: Hover over first template and use it
    cy.hoverAndUseFirstTemplate(
        {selector: '.masonry-wall', 
            buttontext: 'Use template'}
    )

    //  Step 3.Editor steps 
    cy.completeEditorSteps()
    //Reset to free 
    cy.resetToFree()
    //intercept the request 
    cy.fillSignUpFormAndSubmit({
        name: 'Mariana',
        email: Cypress.env('DEV_Valid_Email_MP'),
        password: Cypress.env('DEV_Valid_Password_MP')
      })

            })


    it('SignUpFromCard',()=>{

        SignUpFlow({
            url:Cypress.env('PROD_MS'),
            buttonLabel:'MyCard',
            expectedPath:'/editor-business-card'
        })
    
    cy.completeEditorSteps()
    //Click on the Sign up button 
    cy.contains('button','Save and Sign up').click()
    cy.fillSignUpFormAndSubmit({
        name: 'Mariana',
        email: Cypress.env('DEV_Valid_Email_BC'),
        password: Cypress.env('DEV_Valid_Password_BC')
      })
                })
    

            })
