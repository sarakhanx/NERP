# Authentication Component

This project contains an authentication component for a Next.js application. The component handles user sign-up and sign-in using JWT tokens and integrates with a backend API for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/your-project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-project
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the development server, run:


npm run dev


Navigate to `http://localhost:3000` in your browser to see the application.

## Components

### `LoginComponent`

This component handles user sign-up and sign-in. It uses JWT tokens for authentication and integrates with a backend API.

#### Props

- None

#### State

- `isSignUp`: Boolean state to toggle between sign-up and sign-in forms.
- `form`: Object state to manage form inputs.

#### Methods

- `handleChange`: Updates form state based on user input.
- `handleRoleChange`: Updates the roles in the form state.
- `handleSubmit`: Handles form submission for both sign-up and sign-in.

## API Endpoints

- **Sign Up**: `POST /signup`
  - Description: Registers a new user.
  - Request Body: JSON object containing user details (name, email, password, etc.)
  - Response: JSON object containing a JWT token.

- **Sign In**: `POST /signin`
  - Description: Authenticates an existing user.
  - Request Body: JSON object containing user credentials (email, password)
  - Response: JSON object containing a JWT token.

## Environment Variables

The following environment variables are required for the authentication component to work:

- `NEXT_PUBLIC_API_URL`: The base URL of the backend API.
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js.

Example `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXTAUTH_SECRET=your-nextauth-secret
```