# Samii Dev Blog

## Project Initialization
First of all, clone this repository to your machine using this command:  
```git
git clone https://github.com/saman2007/samii-dev-personal-blog.git
```
Install all packages using `pnpm install` or `npm install` or `yarn install` or the command of any package manager you use.  
After that, you must initialize the database of the project which is `postgresql`. In this project, I use `drizzle` ORM to manage database. I suppose you created a `postgresql` database already.  
To initialize database, first of all create a `.env` file in the root of the project. Then add these env vars to `.env` file:  
- `DATABASE_URL`  
It must be a string in this format: postgresql://\<username>:\<password>@\<host>:\<port>/\<database_name>

- `DATABASE_SUPPORT_SSL`: It must be a boolean that indicates whether your current database supports SSL or not.

Now you must create database tables.  
If you want to save migration files(which I strongly suggest) and then apply them to database, enter `npx drizzle-kit generate` in your terminal which generates migrations for you, then enter `npx drizzle-kit migrate` in you terminal which applies the created migration file to database.  
If you want to apply the tables immediately to database, just enter `drizzle-kit push`.  
After that you're all set to run the website on your machine. 