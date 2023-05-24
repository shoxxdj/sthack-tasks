// This is an example Cypress support file. You can customize this file to fit your needs.

// Import any commands or plugins you want to use in your tests
// You can also define custom commands or hooks in this file
import "./commands";

// You can customize Cypress behavior using these configuration options
// See the Cypress configuration documentation for more details
Cypress.config({
  viewportWidth: 1920,
  viewportHeight: 1080,
});

// This code runs before every test file
beforeEach(() => {
  // Set up any test fixtures or data here
});

// This code runs after every test file
afterEach(() => {
  // Clean up any test fixtures or data here
});

