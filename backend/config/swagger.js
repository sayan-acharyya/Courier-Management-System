 import swaggerJSDoc from "swagger-jsdoc";

const definition = {
  openapi: "3.0.0",
  info: {
    title: "Courier Delivery API",
    version: "1.0.0",
    description: "API documentation for the Courier Delivery Web Application",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  definition,              // ✅ Correct property name
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);