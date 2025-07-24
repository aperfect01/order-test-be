# Order Test Backend

## Getting Started

This is a setup readme for the **order-test-be** project. It's a backend application that uses Node.js, Express, and TypeScript, with a SQLite database.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: You can download it from the official [Node.js website](https://nodejs.org/).
- **npm**: This is included with Node.js.

### Installation

1.  **Clone the repository**: First, get the project files onto your local machine.

2.  **Install dependencies**: Use npm to install all the required packages for the project.

    ```bash
    npm install
    ```

### Configuration

This project uses environment variables for configuration. A sample file is provided.

1.  **Create a `.env` file**: Copy the `sample.env` file and rename it to `.env`.

    ```bash
    cp sample.env .env
    ```

### Database

This project uses a SQLite database. You'll need to run a seed script to create the database file and populate it with initial data.

```bash
npm run seed
```

This command creates a file named `data.db` and fills it with the necessary tables and records.

### Running the Application

You have a few options for running the application:

- **Development**: To run the server in development mode, which includes live reloading, use the following command:

  ```bash
  npm run dev
  ```

- **Production**: To run the server for a production environment, use this command:

  ```bash
  npm run start
  ```
