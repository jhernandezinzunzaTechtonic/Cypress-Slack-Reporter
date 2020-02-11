// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
  const { parent } = runnable;
  const { title } = test;
  let screenshotFileName;

  console.log(parent);
  // Checking the parent here requires your tests to be in the following structure:
  // describe >> context >> it
  if(parent.parent.title != "") {
    screenshotFileName = `${parent.parent.title} -- ${parent.title} -- ${title} (failed).png`;
  } else {
    screenshotFileName = `${parent.title} -- ${title} (failed).png`;
  }

  if (test.state === 'failed') {
    console.log("SCREENSHOT FILE NAME: ", screenshotFileName);
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
    console.log("SCREENSHOT DIR: ", `assets/${Cypress.spec.name}/${screenshotFileName}`);
  }
})