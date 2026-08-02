# API Integration Documentation

**Project:** Fixano — Home Services Marketplace  
**Frontend:** Next.js (App Router, TypeScript, Server Actions)  
**Backend:** Node.js / Express / Prisma / PostgreSQL  
**Base URL:** Configured via `src/proxy.ts`

---

## Table of Contents

1. [Auth](#1-auth)
2. [Public — Services & Technicians](#2-public--services--technicians)
3. [Bookings (Customer)](#3-bookings-customer)
4. [Payments (Customer)](#4-payments-customer)
5. [Reviews (Customer)](#5-reviews-customer)
6. [Technician Dashboard](#6-technician-dashboard)
7. [Admin Dashboard](#7-admin-dashboard)
8. [Endpoint Reference](#8-full-endpoint-reference)

---

## 1. Auth

| Method | Endpoint | Auth Required | Frontend Action / Component |
|--------|----------|:-------------:|----------------------------|
| `POST` | `/api/auth/register` | No | `src/app/(auth)/_authActions/authAction.ts` → `RegisterForm.tsx` |
| `POST` | `/api/auth/login` | No | `src/app/(auth)/_authActions/authAction.ts` → `LoginForm.tsx` |
| `GET` | `/api/auth/me` | Yes (all roles) | `src/lib/auth/getServerUser.ts` → `AuthProvider.tsx`, `NavbarServer.tsx` |
| `POST` | `/api/auth/refreshToken` | No | `src/utils/refreshToken.ts` (called transparently on token expiry) |

**Flow:** `LoginForm` / `RegisterForm` submit via the `authAction` server action → tokens stored via httpOnly cookies → `AuthProvider` hydrates Zustand store (`src/store/auth.store.ts`) → `getServerUser` calls `/me` on SSR to populate server components.

---

## 2. Public — Services & Technicians

All endpoints in this section are **unauthenticated** and served from the public route group.

| Method | Endpoint | Frontend Action / Component |
|--------|----------|-----------------------------|
| `GET` | `/api/services` | `src/app/(public)/_publicAction/getAllServices.ts` → `service-grid.tsx`, `Service.tsx` (homepage section) |
| `GET` | `/api/services/:id` | `src/app/(dashboards)/user-dashboard/_userActions/getSingleService.ts` → `BookingForm.tsx` |
| `GET` | `/api/technicians` | `src/app/(public)/_publicAction/getAllTechnicians.ts` → `technician-grid.tsx`, `technician-card.tsx` |
| `GET` | `/api/technicians/:id` | `src/app/(public)/_publicAction/getSingleTechnician.ts` → `TechnicianHeader.tsx`, `TechnicianAbout.tsx`, `TechnicianAvailabilityCard.tsx` |
| `GET` | `/api/categories` | `src/app/(public)/_publicAction/getAllCategories.ts` → `CategoryList.tsx`, `Categories.tsx` (homepage section) |

---

## 3. Bookings (Customer)

**Role required:** `CUSTOMER`, `ADMIN`

| Method | Endpoint | Frontend Action / Component |
|--------|----------|-----------------------------|
| `POST` | `/api/bookings` | `src/app/(dashboards)/user-dashboard/_userActions/createMyBooking.ts` → `BookingForm.tsx` |
| `GET` | `/api/bookings` | `src/app/(dashboards)/user-dashboard/_userActions/getMyBookings.ts` → `BookingTable.tsx`, `MetricsCards.tsx` |
| `GET` | `/api/bookings/:id` | `src/app/(dashboards)/user-dashboard/_userActions/getSingleBooking.ts` → `BookingContent.tsx`, `ContextualActions.tsx` |

**Supporting utilities:**  
- `src/app/(dashboards)/user-dashboard/createBooking/_utils/isTimeWithinAvailability.ts` — client-side guard that cross-references technician availability before submitting to `POST /api/bookings`.

---

## 4. Payments (Customer)

**Role required:** `CUSTOMER`, `ADMIN`

| Method | Endpoint | Frontend Action / Component |
|--------|----------|-----------------------------|
| `POST` | `/api/payment/checkout/:id` | `src/app/(dashboards)/user-dashboard/_userActions/paymentAction.ts` → `PaymentButton.tsx` |
| `GET` | `/api/payment/status/:id` | `src/app/(dashboards)/user-dashboard/_userActions/paymentStatus.ts` → `PaymentStatusBadge.tsx`, `paymentStatus/[bookingId]/page.tsx` |
| `POST` | `/api/payment/webhook` | Stripe webhook (server-to-server, not called from frontend) |

**Flow:** `PaymentButton` triggers `paymentAction` → redirects to Stripe Checkout → on return, `payment/page.tsx` renders success/failure → `PaymentStatusBadge` polls `paymentStatus` action to show current payment state.

---

## 5. Reviews (Customer)

**Role required:** `CUSTOMER`, `ADMIN` (write); `CUSTOMER`, `ADMIN`, `TECHNICIAN` (read)

| Method | Endpoint | Frontend Action / Component |
|--------|----------|-----------------------------|
| `POST` | `/api/reviews` | `src/app/(dashboards)/user-dashboard/_userActions/addReview.tsx` → `AddReviewForm.tsx` |
| `DELETE` | `/api/reviews/:id` | `src/app/(dashboards)/user-dashboard/_userActions/deleteReview.tsx` → `DeleteReviewButton.tsx` |
| `GET` | `/api/reviews` | `src/app/(dashboards)/user-dashboard/_userActions/getReview.tsx` → `user-dashboard/myReview/page.tsx` |

---

## 6. Technician Dashboard

**Role required:** `TECHNICIAN`, `ADMIN`

| Method | Endpoint | Frontend Action / Component |
|--------|----------|-----------------------------|
| `POST` | `/api/technician/service` | `src/app/(dashboards)/technician-dashboard/_technicianActions/addService.ts` → `addServiceModal.tsx` |
| `PUT` | `/api/technician/profile` | `src/app/(dashboards)/technician-dashboard/_technicianActions/updateTechnicianProfile.ts` → `TechnicianProfileClient.tsx`, `updateProfileModal.tsx` |
| `PUT` | `/api/technician/availability` | `src/app/(dashboards)/technician-dashboard/_technicianActions/addAvailability.ts` → `AvailabilityModal.tsx`, `AvailabilityClient.tsx` |
| `GET` | `/api/technician/bookings` | `src/app/(dashboards)/technician-dashboard/_technicianActions/getTechnicianBooking.ts` → `TechnicianDashboard.tsx` |
| `PATCH` | `/api/technician/bookings/:id` | `src/app/(dashboards)/technician-dashboard/_technicianActions/updateBookingStatus.ts` → `TechnicianDashboard.tsx` |

**Supporting data fetches (read-only, reuse public endpoints):**
- `getAllServices.ts` → `servicesTableClient.tsx` (lists technician's own services)
- `getAllTechnician.ts` → technician profile page context
- `getAllCategories.ts` → `addServiceModal.tsx` (category picker)

---

## 7. Admin Dashboard

**Role required:** `ADMIN`

| Method | Endpoint | Frontend Action / Component |
|--------|----------|-----------------------------|
| `GET` | `/api/admin/users` | `src/app/(dashboards)/admin-dashboard/_adminActions/getAllUsers.ts` → `admin-dashboard/page.tsx`, `UserActionButton.tsx` |
| `PATCH` | `/api/admin/users/:id` | `src/app/(dashboards)/admin-dashboard/_adminActions/updateUserStatus.ts` → `UserActionButton.tsx` |
| `GET` | `/api/admin/bookings` | `src/app/(dashboards)/admin-dashboard/_adminActions/getAllBookings.ts` → `getAllBookings/page.tsx` |
| `GET` | `/api/admin/categories` | `src/app/(dashboards)/admin-dashboard/_adminActions/getAllCategories.ts` → `Categories/page.tsx` |
| `POST` | `/api/admin/categories` | `src/app/(dashboards)/admin-dashboard/_adminActions/createCategory.ts` → `AddCategoryModal.tsx` |

---

## 8. Full Endpoint Reference

| # | Method | Endpoint | Role | Module |
|---|--------|----------|------|--------|
| 1 | `POST` | `/api/auth/register` | Public | Auth |
| 2 | `POST` | `/api/auth/login` | Public | Auth |
| 3 | `GET` | `/api/auth/me` | All roles | Auth |
| 4 | `POST` | `/api/auth/refreshToken` | Public | Auth |
| 5 | `GET` | `/api/services` | Public | Service |
| 6 | `GET` | `/api/services/:id` | Public | Service |
| 7 | `GET` | `/api/technicians` | Public | Service |
| 8 | `GET` | `/api/technicians/:id` | Public | Service |
| 9 | `GET` | `/api/categories` | Public | Service |
| 10 | `POST` | `/api/bookings` | CUSTOMER, ADMIN | Booking |
| 11 | `GET` | `/api/bookings` | CUSTOMER, ADMIN | Booking |
| 12 | `GET` | `/api/bookings/:id` | CUSTOMER, ADMIN | Booking |
| 13 | `POST` | `/api/payment/checkout/:id` | CUSTOMER, ADMIN | Payment |
| 14 | `POST` | `/api/payment/webhook` | Stripe (server) | Payment |
| 15 | `GET` | `/api/payment/status/:id` | CUSTOMER, ADMIN | Payment |
| 16 | `POST` | `/api/reviews` | CUSTOMER, ADMIN | Review |
| 17 | `DELETE` | `/api/reviews/:id` | CUSTOMER, ADMIN | Review |
| 18 | `GET` | `/api/reviews` | CUSTOMER, ADMIN, TECHNICIAN | Review |
| 19 | `POST` | `/api/technician/service` | TECHNICIAN, ADMIN | Technician |
| 20 | `PUT` | `/api/technician/profile` | TECHNICIAN, ADMIN | Technician |
| 21 | `PUT` | `/api/technician/availability` | TECHNICIAN, ADMIN | Technician |
| 22 | `GET` | `/api/technician/bookings` | TECHNICIAN, ADMIN | Technician |
| 23 | `PATCH` | `/api/technician/bookings/:id` | TECHNICIAN, ADMIN | Technician |
| 24 | `GET` | `/api/admin/users` | ADMIN | Admin |
| 25 | `PATCH` | `/api/admin/users/:id` | ADMIN | Admin |
| 26 | `GET` | `/api/admin/bookings` | ADMIN | Admin |
| 27 | `GET` | `/api/admin/categories` | ADMIN | Admin |
| 28 | `POST` | `/api/admin/categories` | ADMIN | Admin |

---

*Total endpoints consumed: **28***