# Computational Puzzles

## Requirement:
- Docker
- Node (recommend version 14+)

## Start dev server
Create a `.env` file and add the following code to it
```text
DATABASE_URL=postgresql://computational_puzzles:computational_puzzles@localhost:5432/mydb?schema=public
GOOGLE_CLIENT_ID=10889722286-8uek1esq4uicv31an6tehi60c7ev5lvp.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FACEBOOK_CLIENT_ID=sth
FACEBOOK_CLIENT_SECRET=sth
LINKEDIN_CLIENT_ID=sth
LINKEDIN_CLIENT_SECRET=sth
GITHUB_CLIENT_ID=Iv1.ed27403666d384d5
GITHUB_CLIENT_SECRET=977ed0034007c155e37c87635d2e71809a41a48b
JWT_SECRET=secret
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
