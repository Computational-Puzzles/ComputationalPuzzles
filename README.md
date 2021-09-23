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
npm i
npm run dev
```


## Start production server
```bash
docker-compose build
docker-compose up
```