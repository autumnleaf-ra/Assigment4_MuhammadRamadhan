const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Helmet Store API',
    version: '1.0.0',
    description: 'CRUD NodeJS with Authentication JWT'
  },
  servers: [
    {
      url: 'http://phincon-dev.uk.to:8080'
    }
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Bearer token for API authentication'
      }
    }
  }
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./docs/*.js'] // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, options, swaggerDefinition };
