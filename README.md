# 📝 FullStack Todo Web-App

Eine moderne, responsive Todo-Anwendung mit **Next.js 16**, **TypeScript**, **Prisma** und **PostgreSQL**. Die App bietet eine vollständige CRUD-Funktionalität mit einem eleganten, benutzerfreundlichen Frontend.

![Todo App](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.16-38B2AC)

## 🚀 Features

### Frontend Features

- ✅ **React 19.2.0** mit TypeScript für typsichere Entwicklung
- ✅ **Tailwind CSS v4** für modernes, responsives Design
- ✅ **Server-Side Rendering** mit Next.js App Router
- ✅ **Interaktive UI** mit Echzeit-Updates
- ✅ **Loading States** und **Error Handling**
- ✅ **Responsive Design** für alle Geräte

### Backend Features

- ✅ **RESTful API** mit Next.js API Routes
- ✅ **PostgreSQL** Datenbank mit Prisma ORM
- ✅ **CRUD Operationen** (Create, Read, Update, Delete)
- ✅ **Type-Safe Database Access** mit Prisma Client
- ✅ **Error Handling** und **Validation**
- ✅ **Health Check Endpoint**

### Todo-Funktionalitäten

- ✅ Todos erstellen, bearbeiten und löschen
- ✅ Todo-Status ändern (erledigt/nicht erledigt)
- ✅ Persistente Datenspeicherung
- ✅ Titel und Beschreibung für Todos
- ✅ Automatische Zeitstempel (erstellt/aktualisiert)

## 🛠 Tech Stack

| Kategorie           | Technologie  | Version | Zweck                       |
| ------------------- | ------------ | ------- | --------------------------- |
| **Frontend**        | React        | 19.2.0  | UI Library                  |
| **Framework**       | Next.js      | 16.0.1  | Full-Stack React Framework  |
| **Sprache**         | TypeScript   | 5.9.3   | Type Safety                 |
| **Styling**         | Tailwind CSS | 4.1.16  | Utility-First CSS Framework |
| **Database**        | PostgreSQL   | Latest  | Relationale Datenbank       |
| **ORM**             | Prisma       | 6.18.0  | Database Toolkit            |
| **Package Manager** | npm          | Latest  | Dependency Management       |

## 📦 Installation

### Voraussetzungen

- **Node.js** >= 18.0.0
- **npm** oder **yarn**
- **PostgreSQL** Datenbank

### Setup

1. **Repository klonen**

```bash
git clone https://github.com/steffenvolbeat/FullStack-Todo-Web-App.git
cd FullStack-Todo-Web-App
```

2. **Dependencies installieren**

```bash
npm install
```

3. **Umgebungsvariablen einrichten**

```bash
# .env.local erstellen
echo "DATABASE_URL='postgresql://username:password@localhost:5432/prisma_todos'" > .env.local
```

4. **Datenbank einrichten**

```bash
# Prisma migrieren
npm run db:migrate

# Prisma Client generieren
npm run db:generate
```

5. **Development Server starten**

```bash
npm run dev
```

Die App ist jetzt verfügbar unter: **http://localhost:3000**

## 🗂 Projektstruktur

```
FullStack-Todo-Web-App/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── health/              # Health Check Endpoint
│   │   └── todos/               # Todo CRUD API
│   │       └── [id]/            # Dynamic Route für einzelne Todos
│   ├── globals.css              # Global Styles (Tailwind)
│   ├── layout.tsx               # Root Layout
│   └── page.tsx                 # Hauptseite
├── components/                   # React Components
│   ├── TodoApp.tsx              # Haupt-Todo-Component
│   ├── TodoForm.tsx             # Formular für neue Todos
│   ├── TodoItem.tsx             # Einzelne Todo-Darstellung
│   ├── TodoList.tsx             # Todo-Liste
│   └── LoadingSpinner.tsx       # Loading Component
├── lib/                         # Shared Libraries
│   └── prisma.ts                # Prisma Client Singleton
├── prisma/                      # Prisma Configuration
│   └── schema.prisma            # Database Schema
├── types/                       # TypeScript Type Definitions
│   └── todo.ts                  # Todo Interface
├── package.json                 # Dependencies & Scripts
├── next.config.js               # Next.js Configuration
├── tailwind.config.ts           # Tailwind Configuration
├── postcss.config.js            # PostCSS Configuration
└── tsconfig.json                # TypeScript Configuration
```

## 🔌 API Endpunkte

### Health Check

```
GET /api/health
```

**Response**: System status information

### Todos

```
GET    /api/todos           # Alle Todos abrufen
POST   /api/todos           # Neues Todo erstellen
GET    /api/todos/[id]      # Einzelnes Todo abrufen
PATCH  /api/todos/[id]      # Todo aktualisieren
DELETE /api/todos/[id]      # Todo löschen
```

### Beispiel API Calls

**Neues Todo erstellen:**

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Neue Aufgabe", "description": "Beschreibung der Aufgabe"}'
```

**Todo als erledigt markieren:**

```bash
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 💾 Database Schema

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("todos")
}
```

## 📜 Verfügbare Scripts

| Script          | Befehl                | Beschreibung                |
| --------------- | --------------------- | --------------------------- |
| **Development** | `npm run dev`         | Development Server starten  |
| **Build**       | `npm run build`       | Production Build erstellen  |
| **Start**       | `npm run start`       | Production Server starten   |
| **Lint**        | `npm run lint`        | Code Linting                |
| **Database**    | `npm run db:migrate`  | Prisma Migration ausführen  |
|                 | `npm run db:generate` | Prisma Client generieren    |
|                 | `npm run db:studio`   | Prisma Studio öffnen        |
|                 | `npm run db:push`     | Schema direkt zur DB pushen |

## 🔧 Entwicklung

### Development Server starten

```bash
npm run dev
```

### Database verwalten

```bash
# Prisma Studio für visuelle DB-Verwaltung
npm run db:studio

# Neue Migration erstellen
npm run db:migrate

# Database Schema aktualisieren
npm run db:push
```

### Production Build

```bash
npm run build
npm run start
```

## 🎨 Styling & UI

- **Design System**: Tailwind CSS v4 mit custom utilities
- **Color Scheme**: Dark theme mit Grau- und Indigo-Akzenten
- **Responsive**: Mobile-first Design
- **Animations**: Smooth Hover- und Transition-Effekte
- **Icons**: Emoji-basierte Icons für bessere Zugänglichkeit

## 🛡 Error Handling

- **Client-Side**: React Error Boundaries und Zustandsverwaltung
- **Server-Side**: Strukturierte API Error Responses
- **Database**: Prisma Error Handling mit aussagekräftigen Meldungen
- **TypeScript**: Compile-time Type Checking

## 🚀 Deployment

### Vercel (Empfohlen)

```bash
# Vercel CLI installieren
npm i -g vercel

# Deployment
vercel

# Environment Variables in Vercel Dashboard setzen:
# DATABASE_URL=your_postgresql_connection_string
```

### Andere Plattformen

- **Netlify**: Mit `npm run build` und Static Export
- **Docker**: Dockerfile verfügbar für Container Deployment
- **Heroku**: Mit PostgreSQL Add-on

## 📚 Weiterführende Dokumentation

- **[API Routes Explained](./API-ROUTES-EXPLAINED.md)** - Detaillierte API Dokumentation
- **[Dynamic Routes Explained](./DYNAMIC-ROUTES-EXPLAINED.md)** - Next.js Routing System
- **[Database Management](./DATABASE-MANAGEMENT.md)** - Prisma & PostgreSQL
- **[Full-Stack Architecture](./FULL-STACK-ARCHITECTURE.md)** - Architektur Overview
- **[Deployment Success](./DEPLOYMENT-SUCCESS.md)** - Deployment Guide

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne eine Pull Request

## 📄 License

Dieses Projekt steht unter der ISC License.

## 👨‍💻 Autor

**Steffen Volbeat**

- GitHub: [@steffenvolbeat](https://github.com/steffenvolbeat)

## 🙏 Acknowledgments

- **Next.js Team** für das großartige Framework
- **Prisma Team** für das moderne ORM
- **Tailwind CSS** für das utility-first CSS Framework
- **Vercel** für die hervorragende Deployment Platform

---

**Happy Coding! 🚀**
