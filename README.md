# Computational Puzzles

## Requirement:
- Docker
- Node (recommend version 14+)

## Start dev server
Create a `.env` file and add the following code to it
```text
NEXT_PUBLIC_DATABASE_URL=postgresql://computational_puzzles:computational_puzzles@localhost:5432/mydb?schema=public
NEXT_PUBLIC_GOOGLE_CLIENT_ID=10889722286-8uek1esq4uicv31an6tehi60c7ev5lvp.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=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
NEXT_PUBLIC_AUTH_SECRET=secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```
Then run the following lines in the terminal
```bash
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
