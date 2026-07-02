# 🏗️ Material Pro — Construction Material Management System

A full-featured ERP web application designed for construction material businesses. Manage materials, customers, suppliers, vehicles, drivers, purchases, sales, diesel entries, expenses, payments, and reports — all from a single, modern dashboard.

---

## ✨ Features

| Module | Description |
|---|---|
| **Dashboard** | Real-time KPIs — today's sales, purchases, profit, stock levels, diesel costs, expenses, and pending dues from customers/suppliers. Includes line charts, a donut chart for material-wise sales breakdown, recent transactions, and low-stock alerts. |
| **Materials** | Manage construction materials (Reti/Sand, Kapchi, Dust, Stone, Gravel, etc.) with stock tracking, unit pricing, minimum stock thresholds, and category/unit management. |
| **Customers** | Full customer records with contact info, GST number, address, city, state, and pincode. |
| **Suppliers** | Supplier management with GST details and full contact information. |
| **Vehicles** | Vehicle fleet management — registration numbers, model, type, capacity, fuel type, chassis/engine numbers, and owner details. |
| **Drivers** | Driver registry with license numbers, contact info, and address details. |
| **Purchases** | Record material purchases from suppliers with invoice numbers, quantity, unit price, GST, and final amounts. Automatically updates stock. |
| **Sales** | Record sales to customers with invoicing, GST calculation, and automatic stock deduction. |
| **Diesel Entries** | Track fuel fill-ups per vehicle — quantity, rate, and amount per entry. |
| **Expenses** | Log miscellaneous business expenses by category. |
| **Payments** | Record customer payments by method (Cash, UPI, etc.). |
| **Reports** | Aggregated reporting across all modules. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Database** | SQLite (via [Prisma ORM](https://www.prisma.io/)) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
construction-material-erp/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, analytics)
│   ├── page.tsx                # Root redirect → /login
│   ├── globals.css             # Global styles & CSS variables
│   ├── api/                    # Next.js API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── dashboard/          # Dashboard stats endpoint
│   │   └── materials/          # Materials CRUD endpoints
│   └── dashboard/              # Protected dashboard pages
│       ├── layout.tsx          # Dashboard shell (sidebar + header)
│       ├── page.tsx            # Dashboard overview
│       ├── materials/          # Materials management
│       ├── customers/          # Customers management
│       ├── suppliers/          # Suppliers management
│       ├── vehicles/           # Vehicle fleet management
│       ├── drivers/            # Driver management
│       ├── purchases/          # Purchases management
│       ├── sales/              # Sales management
│       ├── diesel/             # Diesel entry tracking
│       ├── expenses/           # Expense logging
│       ├── payments/           # Payment recording
│       └── reports/            # Reports & analytics
├── components/
│   ├── sidebar.tsx             # Navigation sidebar
│   ├── header.tsx              # Top header bar
│   └── ui/                     # Reusable shadcn/ui components
├── lib/                        # Utilities & API helpers
├── prisma/
│   ├── schema.prisma           # Database schema (SQLite)
│   ├── seed.js                 # Database seed script
│   └── migrations/             # Prisma migrations
├── public/                     # Static assets & favicon
├── next.config.mjs             # Next.js configuration
├── package.json
└── .env                        # Environment variables
```

---

## 🗄️ Database Schema

The application uses **SQLite** via **Prisma ORM**. Core models:

- **Admin** — system administrator credentials
- **Material** — stock items with code, category, unit, quantity, min-stock, and unit price
- **Customer** — buyer records with GST and address
- **Supplier** — vendor records with GST and address
- **Vehicle** — fleet with registration, chassis, engine, fuel type
- **Driver** — driver profiles with license numbers
- **Purchase** — purchase invoices linking suppliers and materials
- **Sale** — sales invoices linking customers and materials
- **DieselEntry** — fuel log per vehicle
- **Expense** — miscellaneous expense records
- **Payment** — customer payment records by method

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **pnpm** (`npm install -g pnpm`)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd construction-material-erp
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Set Up the Database

```bash
# Push schema to the SQLite database
pnpm prisma db push

# (Optional) Seed with sample data
node prisma/seed.js
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
pnpm build
pnpm start
```

---

## 🔐 Authentication

The app uses a simple admin login system. After seeding the database, use the credentials defined in `prisma/seed.js` to log in at `/login`.

---

## 📊 Dashboard KPIs

The dashboard provides the following real-time metrics:

- **Today's Sales** — total sales revenue
- **Today's Purchases** — total purchase cost
- **Today's Profit** — sales minus purchases and expenses
- **Total Stock** — aggregate stock across all materials (in Tons)
- **Diesel Cost** — today's diesel expenditure
- **Expenses** — today's miscellaneous expenses
- **Pending Customer Dues** — outstanding customer balances
- **Pending Supplier Dues** — outstanding supplier payables

---

## 📦 Key Dependencies

```json
{
  "next": "16.2.6",
  "react": "^19",
  "prisma": "^5.22.0",
  "recharts": "^3.9.1",
  "react-hook-form": "^7.80.0",
  "zod": "^4.4.3",
  "shadcn": "^4.8.0",
  "lucide-react": "^1.16.0",
  "tailwindcss": "^4.2.0",
  "date-fns": "^4.4.0"
}
```

---

## 🧪 Development Notes

- TypeScript build errors are intentionally ignored (`ignoreBuildErrors: true`) to allow rapid prototyping — remove this flag before deploying to production.
- Images are unoptimized (`unoptimized: true`) for local/static deployment flexibility.
- The project uses **Vercel Analytics** which is only active in production mode.

---

## 📄 License

This project is proprietary. All rights reserved.

---

> Built with ❤️ for construction material businesses to streamline their daily operations.
