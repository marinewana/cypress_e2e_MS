const { defineConfig } = require("cypress")
require('dotenv').config()
module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  experimentalWebKitSupport: true,
   reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
  
    env: {
       LOGIN_URL: 'https://dev.mysignature.io/login',
      PROD_MS: 'https://mysignature.io/login',
      LOGIN_Email: process.env.LOGIN_Email,
      DEV_Invalid_Email: process.env.DEV_Invalid_Email,
      DEV_Valid_Email_MS: process.env.DEV_Valid_Email_MS,
      DEV_Valid_Password_MS: process.env.DEV_Valid_Password_MS,
      DEV_Valid_Email_MP: process.env.DEV_Valid_Email_MP,
      DEV_Valid_Password_MP: process.env.DEV_Valid_Password_MP,
      DEV_Valid_Email_BC: process.env.DEV_Valid_Email_BC,
      DEV_Valid_Password_BC: process.env.DEV_Valid_Password_BC,
      GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
      GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD
    
    

    },
    //retries:{
     // openMode:1,
     // runMode:1
   // },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://mysignature.io/',
    specPattern:'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  },
});
