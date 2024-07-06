# Library API

This repository contains the Library API for the technical test for the Backend Developer position at PT Eigen Tri Mathema. The API is built using NestJS, PostgreSQL, Prisma, and Swagger UI for API documentation.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database](#database)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/library-api.git
   cd library-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Ensure that PostgreSQL is installed and running on your machine.
2. Configure your database connection in the `prisma/schema.prisma` file:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Create a `.env` file in the root directory of the project and add your database URL:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual database credentials.

## Database

1. Run the Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

2. This will apply the migrations and set up the database schema according to the Prisma schema file.

## Running the Application

1. Start the application:

   ```bash
   npm run start
   ```

2. The application will run on `http://localhost:3000`.

## API Documentation

1. The API documentation is available at `http://localhost:3000/api` using Swagger UI.
2. You can interact with the API endpoints directly through the Swagger UI interface.
