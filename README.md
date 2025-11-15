# Query Builders & ORMs : Prisma

There are lots of tools that can help us connect to our Postgres database, send queries and map the results to JavaScript objects and arrays. The `postgres` package we used before is very simple: It allows us to send SQL queries to the database and returns the results as an array of objects. In addition, it helps to prevent [SQL Injection](https://www.w3schools.com/sql/sql_injection.asp) by validating the variable parts / parameters of our queries.
The `kysely` package offers a slightly higher level of abstraction and gives us typesafe handling of our SQL queries as a major benefit.
ORM (Object Relational Mapper) tools operate on an even higher level of abstraction, they come with their own language and translate it into SQL under the hood. In theory we wouldn't need to know SQL at all to work with these tools, however that would not be a good idea :-).

In this exercise we want to take a loook at [`Prisma`](https://www.prisma.io/), which is a full ORM (Object Relational Mapper) that hides away most of the underlying SQL queries and lets us interact with JavaScript Objects instead of sending raw queries.

## Task 1: Watch a tutorial

- Watch the video [Prisma in Next.js](https://www.youtube.com/watch?v=QXxy8Uv1LnQ), which gives a great introduction into Prisma in conjunction with Next.js. You should be able to translate the demo to an Express API, there is nothing special about the Next.js integration.

🚨 The tutorial uses a SQLite database for development. SQLite is not a real database server you would use in production, but it's easy to handle in development. They use SQLite in the tutorial because it does not require lengthy and complicated installation. But as you have Postgres installed already, it should be easy to connect Prisma to your local Postgres as well. As you don't write actual SQL in Prisma, there will be no difference in the commands.

## Task 2: Build a CRUD API

- Create a CRUD API for Todos, similar to the one we built for our Todo App Demo. It does not need to have users, it just needs to have these routes:

```zsh
GET /todos
GET /todos/:id
POST /todos
DELETE /todos/:id
PATCH /todos/:id
```

Use Prisma for setting up this API and test it with Postman. // Gebe es auf Deutsch 
