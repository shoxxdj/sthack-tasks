// const { defineConfig } = require('cypress')

// module.exports = defineConfig({

//   "projectId": "xyz123",
//   "integrationFolder": "cypress/integration",
//   "testFiles": "**/*.*",

//   e2e: {

//   },
//   browser:{
// 	  chromeWebSecurity:false,
// 	  modifyObstructiveCode:false
//  }
// })
module.exports = {
  e2e: {
   baseUrl:'http://website/',
   videoRecording: false,
   video:false,
   supportFile:false, 
    specPattern: '**/cypress/e2e/*.cy.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
 path:"toto"
    },
  },
};

