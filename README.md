# SPA Server Template

This is a template for a Single Page Application (SPA) server built with Node.js and Express. It includes TypeScript, TSOA, and Prisma for building and documenting RESTful APIs.

## Getting Started

To get started, clone this repository and run `npm install` to install the dependencies. You can then use the following scripts:

- `npm run build`: Builds the TypeScript files and generates the OpenAPI spec and TSOA routes.
- `npm start`: Starts the server.
- `npm run dev`: Starts the server in development mode with live reloading.
- `npm run format`: Formats the code with Prettier.
- `npm run format:fix`: Formats the code with Prettier and fixes any errors.
- `npm run clean`: Cleans the build and spec directories.
- `npm run migration`: Runs a database migration with Prisma.

## Creating a Controller

To create a controller, follow these steps:

1. Navigate to the `./src/controllers` directory.
2. Create a new controller file with the desired name, following this structure: `TheNameYouDesired.controller.ts`.
3. Run the following command to add the new entity to your database:

```bash
npm run build
```

## Adding an Entity

To add an entity to the database, open ./src/prisma/schema.prisma and add a model to it. The model should look like this:

```typescript
model User {
  id        String @id @unique @default(uuid())
  email     String @unique
  firstName String
  lastName  String
  password  String
}
```

After defining the model, you can run the following command to perform a database migration:

```bash
npm run migration
```

##Interface
In the interface section, you should define interfaces that facilitate communication between layers. This includes interfaces for response and request objects.

##Utility
In the utility section, it's recommended to add utility functions to the utility folder for better organization and reusability.

Feel free to customize and expand upon this template to meet the specific needs of your project.
