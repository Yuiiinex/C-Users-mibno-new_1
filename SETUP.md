# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Create .env file
Create a `.env` file in the root directory with:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

**Important**: Generate a secure NEXTAUTH_SECRET:
```bash
# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use: openssl rand -base64 32
```

## 3. Initialize Database
```bash
npm run db:generate
npm run db:push
npm run init-admin
```

## 4. Start Development Server
```bash
npm run dev
```

## 5. Access the Application
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
  - Email: admin@example.com
  - Password: admin123

## Troubleshooting

If you get errors:
1. Make sure `.env` file exists with all required variables
2. Run `npm run db:generate` to regenerate Prisma client
3. Run `npm run db:push` to sync database schema
4. Run `npm run init-admin` to create admin user
5. Restart the dev server

