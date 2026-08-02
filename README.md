# Fixano

![Fixano Banner](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Fixano Banner](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Fixano Banner](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Fixano Banner](https://img.shields.io/badge/shadcn%2Fui-Ready-111827?style=for-the-badge)

A modern frontend experience for a home services marketplace where customers can discover services, book trusted technicians, and leave feedback.

## Table of Contents

- [About the Project](#about-the-project)
- [Features by Role](#features-by-role)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [API Endpoints](#api-endpoints)
- [Related Repositories](#related-repositories)
- [License](#license)

## About the Project

Fixano is a home services marketplace built to connect customers with qualified professionals across categories such as plumbing, electrical work, cleaning, painting, and more. Customers can browse available services, discover technicians, book appointments, make payments, and leave reviews. Technicians can create service profiles, manage availability, and handle bookings, while admins oversee the marketplace by managing users and service categories. The platform is designed to deliver a smooth, secure, and scalable experience for all three roles.

## Features by Role

### 👤 Customer

- Browse services and explore available categories
- Browse and filter technicians by specialty, rating, and availability
- Book a technician for a preferred service
- Pay securely through Stripe
- Leave and delete reviews for completed services
- View booking history and payment status

### 🔧 Technician

- Create and manage a professional service profile
- Set and update availability for bookings
- Manage incoming bookings and accept or reject requests
- View earnings-related dashboard insights

### 🛡️ Admin

- Manage all platform users, including activation and deactivation
- View all bookings across the system
- Manage service categories and platform content

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui, Radix UI |
| Forms & Validation | React Hook Form, Zod |
| State Management | Zustand |
| Motion & UX | Motion, Sonner |
| Authentication | JWT, httpOnly cookies |

## Project Structure

The frontend follows a clear App Router structure under the src directory:

```text
src/
  app/               # Route-based pages and layouts
  components/        # Reusable UI and shared interface components
  store/             # Zustand state stores
  lib/               # Utility helpers and shared logic
  utils/             # Auth, token, and helper utilities
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or bun

### Clone the repository

```bash
git clone https://github.com/mdabdurrahman07/fixano_frontend.git
cd fixano_frontend
```

### Install dependencies

Using npm:

```bash
npm install
```

Or using bun:

```bash
bun install
```

### Environment Variables

Create a local environment file and add the following values:

```env
BACKEND_API_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
```

### Run the development server

Using npm:

```bash
npm run dev
```

Or using bun:

```bash
bun dev
```

## API Integration

All frontend API requests are routed through the proxy middleware in [src/proxy.ts](src/proxy.ts) to avoid CORS issues and centralize communication with the backend. For the complete endpoint mapping and integration details, see [API_INTEGRATION.md](API_INTEGRATION.md).

## API Endpoints

| # | Method | Endpoint | Role |
|---|--------|----------|------|
| 1 | POST | /api/auth/register | Public |
| 2 | POST | /api/auth/login | Public |
| 3 | GET | /api/auth/me | All roles |
| 4 | POST | /api/auth/refreshToken | Public |
| 5 | GET | /api/services | Public |
| 6 | GET | /api/services/:id | Public |
| 7 | GET | /api/technicians | Public |
| 8 | GET | /api/technicians/:id | Public |
| 9 | GET | /api/categories | Public |
| 10 | POST | /api/bookings | CUSTOMER, ADMIN |
| 11 | GET | /api/bookings | CUSTOMER, ADMIN |
| 12 | GET | /api/bookings/:id | CUSTOMER, ADMIN |
| 13 | POST | /api/payment/checkout/:id | CUSTOMER, ADMIN |
| 14 | POST | /api/payment/webhook | Stripe (server) |
| 15 | GET | /api/payment/status/:id | CUSTOMER, ADMIN |
| 16 | POST | /api/reviews | CUSTOMER, ADMIN |
| 17 | DELETE | /api/reviews/:id | CUSTOMER, ADMIN |
| 18 | GET | /api/reviews | CUSTOMER, ADMIN, TECHNICIAN |
| 19 | POST | /api/technician/service | TECHNICIAN, ADMIN |
| 20 | PUT | /api/technician/profile | TECHNICIAN, ADMIN |
| 21 | PUT | /api/technician/availability | TECHNICIAN, ADMIN |
| 22 | GET | /api/technician/bookings | TECHNICIAN, ADMIN |
| 23 | PATCH | /api/technician/bookings/:id | TECHNICIAN, ADMIN |
| 24 | GET | /api/admin/users | ADMIN |
| 25 | PATCH | /api/admin/users/:id | ADMIN |
| 26 | GET | /api/admin/bookings | ADMIN |
| 27 | GET | /api/admin/categories | ADMIN |
| 28 | POST | /api/admin/categories | ADMIN |

## Related Repositories

- Backend: https://github.com/mdabdurrahman07/fixano_backend

## License

This project is licensed under the MIT License.
