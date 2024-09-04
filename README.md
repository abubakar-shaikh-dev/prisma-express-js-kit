# Prisma Express JS Kit

This is a boilerplate project for building applications using Node.js, Express.js, MySQL, and Prisma. The goal of this project is to provide a solid foundation for your application, including a scalable folder structure, essential packages, and configurations.

## Table of Contents

-   [Folder Structure](#folder-structure)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Environment Variables](#environment-variables)
-   [Packages Used](#packages-used)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Folder Structure

The project is organized as follows:

```plaintext
prisma-express-js-kit-main/
├── .env.example               # Environment variable example file
├── .gitignore                 # Git ignore file
├── .nvmrc                     # Node version manager configuration
├── .prettierignore            # Prettier ignore file
├── .prettierrc.json           # Prettier configuration file
├── package-lock.json          # Lockfile for npm dependencies
├── package.json               # Project metadata and dependencies
├── .husky/                    # Husky configuration for Git hooks
│   └── pre-commit             # Pre-commit hook script
├── src/                       # Main source code directory
│   ├── app.js                 # Main application entry point
│   ├── server.js              # Server setup
│   ├── config/                # Configuration files
│   │   ├── index.js           # Configuration index
│   │   └── logger.js          # Logger configuration
│   ├── controllers/           # Route handlers
│   │   └── auth.controller.js # Authentication controller
│   ├── middlewares/           # Custom middleware functions
│   │   ├── api_compression.middleware.js    # API compression middleware
│   │   ├── global_error_handler.middleware.js # Global error handler middleware
│   │   └── token.middleware.js              # Token validation middleware
│   ├── prisma/                # Prisma ORM configuration
│   │   └── schema.prisma      # Prisma schema definition
│   ├── routes/                # Route definitions
│   │   ├── auth.route.js      # Authentication routes
│   │   └── index.js           # Route index
│   ├── services/              # Business logic and services
│   │   ├── token.service.js   # Token service
│   │   └── user.service.js    # User service
│   ├── utils/                 # Utility functions
│   │   └── password.utils.js  # Password utilities
│   └── validations/           # Request validation
│       └── auth.validation.js # Authentication validation schema
```

## Installation

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version specified in `.nvmrc`)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   [MySQL](https://www.mysql.com/)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/abubakar-shaikh-dev/prisma-express-js-kit.git
    cd prisma-express-js-kit
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables:

    Copy the `.env.example` file to `.env` and update the values accordingly.

    ```bash
    cp .env.example .env
    ```

4. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

## Usage

### Development

To run the project in development mode with hot-reloading:

```bash
npm run dev
```

### Production

To build and start the project for production:

```bash
npm run build
npm start
```

## Environment Variables

The project requires certain environment variables to be configured. You can find examples in the `.env.example` file.

-   `DATABASE_URL`: The connection string for your MySQL database.
-   `JWT_SECRET`: Secret key for signing JWT tokens.
-   `PORT`: Port on which the server will run.

## Packages Used

Here are some of the key packages used in this project:

-   [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
-   [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js and TypeScript.
-   [Winston](https://github.com/winstonjs/winston): A logger for just about everything.
-   [JWT](https://github.com/auth0/node-jsonwebtoken): JSON Web Token implementation.
-   [Husky](https://github.com/typicode/husky): Git hooks made easy.

Refer to the `package.json` file for a full list of dependencies.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [shaikhabubakar2380@gmail.com](mailto:shaikhabubakar2380@gmail.com).
