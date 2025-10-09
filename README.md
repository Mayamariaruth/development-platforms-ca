# Development-platforms-ca

## Motivation

I chose to build a custom backend API (option 1) because I wanted to focus more on server-side development. I’ve worked with Python and Django before, but I had never set up an API or worked with Express. This was something completely new for me — and it turned out to be both fun and simpler than I expected.

It was really nice to get a better understanding of how APIs actually work, especially since we use them so much in development. What I liked most about the process was seeing how everything connected: writing routes, setting up authentication, and testing everything through Swagger. What I didn’t enjoy as much was dealing with small errors, especially SQL or validation issues that weren’t always clear at first.

The hardest part was making sure authentication and validation worked properly. But overall, it was very rewarding to build it from scratch.
I think one of the biggest benefits of creating a custom API is understanding and controlling every part of it. A SaaS option like Supabase is faster to set up and very useful, but I feel more well-rounded as a developer by understanding what happens under the hood.

## How to Run

To view this project locally, you can clone the repository:

```bash
git clone https://github.com/Mayamariaruth/development-platforms-ca
```

#### Navigate into the project folder:

```bash
cd express-api
```

#### Install dependencies (Make sure you have Node.js installed):

```bash
npm install
```

#### Set up the database:

- Make sure you have MySQL running locally.
- Create a new database.
- Import the tables from the included SQL file:

```bash
mysql -u your_username -p your_database < database/news.sql
```

#### Configure environment variables:

- Create a .env file in the express-api directory with below variables:

```bash
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
PORT=4000
```

#### Run the development server:

```bash
npm run dev
```

Once the server is running, go to: http://localhost:4000/api-docs

Here you can explore and test all API endpoints with the Swagger UI.

**Note:** For protected endpoints (like submitting a new article), you first need to log in via /auth/login. Copy the returned JWT token and click the lock icon in the Swagger UI to authorize. All requests to protected routes will then use this token.
