# Computational Puzzles

## Requirement:
- Docker
- Node (recommend version 14+)

## Start dev server
Create a `.env` file and add the following code to it
```text
NODE_ENV=development

DATABASE_URL=postgresql://computational_puzzles:computational_puzzles@localhost:5432/mydb?schema=public
GOOGLE_CLIENT_ID=10889722286-8uek1esq4uicv31an6tehi60c7ev5lvp.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
SECRET=secret
AUTH_SECRET=secret
AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN=uTyRuREEmko5kblSVwhb
```
Then run the following lines in the terminal
```bash
npm i
npm run dev
```
If you want to have some puzzle without inputing every of them manually, run:
```bash
npx prisma db seed
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

## For testing
Create another file named `.env.test`
```text
NODE_ENV=testing

DATABASE_URL=postgresql://computational_puzzles:computational_puzzles@localhost:5432/testdb?schema=public
GOOGLE_CLIENT_ID=10889722286-8uek1esq4uicv31an6tehi60c7ev5lvp.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
SECRET=secret
AUTH_SECRET=secret
AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MAPTILER_ACCESS_TOKEN=uTyRuREEmko5kblSVwhb
```
Then run the following lines to the terminal
```bash
npm i
npm test
```
