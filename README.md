# Computational Puzzles

## Requirement:
- Docker
- Node (recommend version 14+)

## Start dev server
Create a `.env` file and add the following code to it
```text
DATABASE_URL="postgresql://computational_puzzles:computational_puzzles@localhost:5432/mydb?schema=public"
```
Then run the following lines in the terminal
```bash
docker-compose up -d db
npm i
npm run dev
```
To add database manually
```bash
npx prisma studio
```

## Start production server
```bash
docker-compose build
docker-compose up
```