# Mønster – Strikkemønster-app

En full-stack applikasjon for å designe strikkemønstre, holde oversikt over fremgang, og generere ferdige diagrammer.

Bygget som et personlig verktøy for egen strikking, og som portefølje-prosjekt.

## Funksjonalitet

- Opprett mønstre med egendefinert størrelse, eller bruk en ferdig mal (per nå er det kun tilgjengelig diagram for vott)
- Tegn mønsteret rute for rute
- Lås mønsteret etter lagring for å unngå utilsiktede endringer mens du strikker
- Marker rader som strikket for å holde oversikt over fremgang
- Full CRUD: opprett, vis, rediger og slett mønstre

## Teknisk stack

**Frontend**

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Axios
- Sonner (varsler)

**Backend**

- Node.js + Express
- Prisma ORM
- MySQL

## Kom i gang lokalt

### Forutsetninger

- Node.js
- MySQL kjørende lokalt

### Backend

Sørg for at MySQL kjører lokalt før du starter serveren.

```bash
cd backend
npm install
```

Opprett en `.env`-fil i `backend/`-mappen med følgende innhold, og fyll inn din egen MySQL-tilkoblingsinfo:

```
DATABASE_URL="mysql://root:DITT_PASSORD@127.0.0.1:3306/knit_pattern_db"
DATABASE_HOST="127.0.0.1"
DATABASE_USER="root"
DATABASE_PASSWORD="DITT_PASSORD"
DATABASE_NAME="knit_pattern_db"
```

Opprett databasen, kjør migrasjoner:

```bash
mysql -u root -p -e "CREATE DATABASE knit_pattern_db;"
npx prisma migrate dev
```

Start serveren:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Appen kjører nå på `http://localhost:5173`, koblet til backend på `http://localhost:3000`.

## Fremtidige forbedringer

- Mal for høyre vott (nåværende mal er tilpasset venstre)
- Flere maler
