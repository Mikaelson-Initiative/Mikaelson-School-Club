# Standalone Backend Developer Guide - Mikaelson School Club

This document serves as the implementation specification for the database, API layer, authentication, and background integrations. It is designed to be handed off directly to a backend developer.

---

## 1. System Architecture

The backend can be built using one of three recommended setups depending on the hosting and architecture preferences:

### Option A: Next.js API Routes / Server Actions + Prisma + PostgreSQL (Recommended)
* **Stack:** Next.js Server-Side APIs (located in `app/api/`), Prisma ORM, and PostgreSQL (hosted on Neon, Supabase, or AWS RDS).
* **Workflow:** Type-safe database operations via generated Prisma Client, relational mapping, and unified deployment with the Next.js runtime.

### Option B: Firebase (NoSQL Firestore + Firebase Auth)
* **Stack:** NoSQL Firestore cloud database, Firebase Auth, and optional Firebase Cloud Functions for backend tasks.
* **Workflow:** Clients connect directly to Firestore using serverless permissions managed via Firestore Security Rules.

### Option C: Supabase (PostgreSQL + Supabase Auth)
* **Stack:** PostgreSQL instance with built-in RESTful API generation, storage buckets, and built-in Auth.
* **Workflow:** Client query routing controlled by PostgreSQL Row-Level Security (RLS) policies.

---

## 2. Database Schema & Data Models

### 2.1. Prisma Relational Schema (PostgreSQL)

If using Option A or C, use the following model structures:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// User Accounts (For Admin Access control)
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  SUPERADMIN
  ADMIN
}

// School Chapters (Active and Registered School Clubs)
model SchoolChapter {
  id               String        @id @default(uuid())
  name             String        @unique // e.g. "Igbobi College"
  city             String        // e.g. "Lagos"
  country          String        // e.g. "Nigeria"
  status           ChapterStatus @default(REGISTERED)
  studentsCount    Int           @default(0) // Active students in this chapter
  registrationDate DateTime      @default(now())
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
}

enum ChapterStatus {
  REGISTERED
  ONBOARDING
  ACTIVE
  INACTIVE
}

// Applications submitted via /apply form
model Application {
  id               String            @id @default(uuid())
  schoolName       String
  contactName      String
  role             String            // Principal, Deputy Principal, Teacher, Student, etc.
  email            String
  phone            String?
  location         String            // City & Country
  studentsEstimate Int               @default(0)
  message          String?           @db.Text
  status           ApplicationStatus @default(PENDING)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
}

enum ApplicationStatus {
  PENDING
  REVIEWED
  SCHEDULED // Call scheduled
  TRAINING  // Champion training in progress
  LAUNCHED
  REJECTED
}

// Enquiries from contact form (/contact)
model ContactMessage {
  id        String        @id @default(uuid())
  name      String
  email     String
  type      ContactType   @default(GENERAL)
  message   String        @db.Text
  status    MessageStatus @default(UNREAD)
  createdAt DateTime      @default(now())
}

enum ContactType {
  SCHOOL_ENQUIRY
  PARTNERSHIP
  MEDIA
  GENERAL
}

enum MessageStatus {
  UNREAD
  READ
  RESPONDED
}

// Activity & Event Calendar (/events)
model Event {
  id          String   @id @default(uuid())
  title       String
  date        DateTime
  time        String   // e.g. "6:00 PM - 8:00 PM"
  location    String   // e.g. "School Auditorium"
  description String   @db.Text
  isPast      Boolean  @default(false)
  attendees   String?  // e.g. "120 attendees" (visible for past events)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Stories & Blog Posts (/blog)
model BlogPost {
  id          String    @id @default(uuid())
  slug        String    @unique
  category    String    // e.g. "Student Story", "Session Recap"
  title       String
  author      String    // e.g. "Amara O., JSS 2, Lagos"
  excerpt     String    @db.VarChar(500)
  content     String    @db.Text
  imageUrl    String?   // URL to cover photo
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// Core Team Members (/team)
model TeamMember {
  id        String   @id @default(uuid())
  name      String
  role      String   // e.g. "Project Manager"
  email     String   @unique
  avatarUrl String?  // Photo URL
  createdAt DateTime @default(now())
}
```

### 2.2. NoSQL Firestore Schema (Firebase Option)

If using Option B, organize collections and documents as follows:

* **Collection: `users`**
  * Document ID: `uid` (Firebase Authentication User ID)
  * Data:
    ```json
    {
      "email": "admin@mikaelsoninitiative.org",
      "name": "Admin User",
      "role": "admin" // "admin" | "superadmin"
    }
    ```
* **Collection: `chapters`**
  * Document ID: Auto-generated UUID
  * Data:
    ```json
    {
      "name": "Igbobi College",
      "city": "Lagos",
      "country": "Nigeria",
      "status": "REGISTERED", // "REGISTERED" | "ONBOARDING" | "ACTIVE" | "INACTIVE"
      "studentsCount": 0,
      "registrationDate": Timestamp
    }
    ```
* **Collection: `applications`**
  * Document ID: Auto-generated UUID
  * Data:
    ```json
    {
      "schoolName": "Ghana National College",
      "contactName": "John Doe",
      "role": "Principal",
      "email": "johndoe@school.edu.gh",
      "phone": "+233201234567",
      "location": "Cape Coast, Ghana",
      "studentsEstimate": 45,
      "message": "We want to launch a chapter.",
      "status": "PENDING", // "PENDING" | "REVIEWED" | "SCHEDULED" | "TRAINING" | "LAUNCHED" | "REJECTED"
      "createdAt": Timestamp
    }
    ```
* **Collection: `contacts`**
  * Document ID: Auto-generated UUID
  * Data:
    ```json
    {
      "name": "Jane Smith",
      "email": "janesmith@company.com",
      "type": "PARTNERSHIP", // "SCHOOL_ENQUIRY" | "PARTNERSHIP" | "MEDIA" | "GENERAL"
      "message": "Interested in sponsorship.",
      "status": "UNREAD", // "UNREAD" | "READ" | "RESPONDED"
      "createdAt": Timestamp
    }
    ```
* **Collection: `events`**
  * Document ID: Auto-generated UUID
  * Data:
    ```json
    {
      "title": "Leadership Workshop",
      "date": Timestamp,
      "time": "3:30 PM - 5:00 PM",
      "location": "Room 301",
      "description": "Learn leadership skills.",
      "isPast": false,
      "attendees": ""
    }
    ```
* **Collection: `blog_posts`**
  * Document ID: Auto-generated UUID or custom Slug
  * Data:
    ```json
    {
      "slug": "30-day-habit-tracking",
      "category": "Student Story",
      "title": "How tracking my habits changed my grades",
      "author": "Amara O., JSS 2, Lagos",
      "excerpt": "A short summary...",
      "content": "Full markdown content goes here...",
      "imageUrl": "https://...",
      "isPublished": true,
      "publishedAt": Timestamp
    }
    ```
* **Collection: `team`**
  * Document ID: Auto-generated UUID
  * Data:
    ```json
    {
      "name": "Michael Olukayode",
      "role": "Team Lead",
      "email": "michael@mikaelsoninitiative.org",
      "avatarUrl": "https://..."
    }
    ```

---

## 3. REST API Specifications

All administrative endpoints must require authorization. Standard error codes (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`) must be returned with an error body matching: `{ "error": "Detailed error message" }`.

### 3.1. School Applications (`/apply`)
* **`POST /api/apply`** (Public - Rate limited)
  * Payload:
    ```json
    {
      "schoolName": " Ghana National College",
      "contactName": "John Doe",
      "role": "Principal",
      "email": "johndoe@school.edu.gh",
      "phone": "+233201234567",
      "location": "Cape Coast, Ghana",
      "studentsEstimate": 45,
      "message": "We would love to establish a leadership chapter."
    }
    ```
  * Responses:
    * `201 Created`: `{ "success": true, "id": "uuid-here" }`
    * `400 Bad Request`: Validation failure.
* **`GET /api/admin/applications`** (Admin Only)
  * Responses:
    * `200 OK`: Array of applications sorted by `createdAt` descending.
* **`PATCH /api/admin/applications/[id]`** (Admin Only)
  * Payload: `{ "status": "REVIEWED" | "SCHEDULED" | "TRAINING" | "LAUNCHED" | "REJECTED" }`
  * Responses:
    * `200 OK`: Updated application object.

### 3.2. Contact Messages (`/contact`)
* **`POST /api/contact`** (Public - Rate limited)
  * Payload:
    ```json
    {
      "name": "Jane Smith",
      "email": "janesmith@company.com",
      "type": "PARTNERSHIP",
      "message": "Partnership proposal details."
    }
    ```
  * Responses:
    * `200 OK`: `{ "success": true }`
* **`GET /api/admin/contacts`** (Admin Only)
  * Responses:
    * `200 OK`: Array of messages.
* **`PATCH /api/admin/contacts/[id]`** (Admin Only)
  * Payload: `{ "status": "READ" | "RESPONDED" }`

### 3.3. Chapter Management
* **`GET /api/schools`** (Public)
  * Responses:
    * `200 OK`: Array of active chapters `{ id, name, city, country, status, studentsCount, registrationDate }`.
* **`POST /api/admin/schools`** (Admin Only)
  * Payload: `{ name, city, country, status, studentsCount }`
  * Responses:
    * `201 Created`: `{ success: true, id: "uuid" }`
* **`PATCH /api/admin/schools/[id]`** (Admin Only)
  * Payload: `{ status, studentsCount }`
* **`DELETE /api/admin/schools/[id]`** (Admin Only)

### 3.4. Events Management (`/events`)
* **`GET /api/events`** (Public)
  * Responses:
    * `200 OK`: `{ upcoming: [...], past: [...] }`
* **`POST /api/admin/events`** (Admin Only)
  * Payload: `{ title, date, time, location, description, isPast, attendees }`
* **`PATCH /api/admin/events/[id]`** / **`DELETE /api/admin/events/[id]`** (Admin Only)

### 3.5. Blog / Stories (`/blog`)
* **`GET /api/blog`** (Public)
  * Responses:
    * `200 OK`: Array of blog posts where `isPublished` is true, sorted by `publishedAt` descending.
* **`GET /api/blog/[slug]`** (Public)
  * Responses:
    * `200 OK`: Full blog post object.
    * `404 Not Found`: Post doesn't exist.
* **`POST /api/admin/blog`** (Admin Only)
  * Payload: `{ category, title, author, excerpt, content, imageUrl, isPublished }` (slug must be derived from title).
* **`PATCH /api/admin/blog/[id]`** / **`DELETE /api/admin/blog/[id]`** (Admin Only)

### 3.6. Metrics Dashboard
* **`GET /api/admin/metrics`** (Admin Only)
  * Responses:
    * `200 OK`:
      ```json
      {
        "schoolsRegistered": 10,
        "activeChapters": 5,
        "studentsEnrolled": 150,
        "trainedChampions": 3,
        "volunteerApplications": 12,
        "schoolEnquiries": 8,
        "sponsorEnquiries": 2
      }
      ```

---

## 4. Backend Authentication & Authorization

The platform must transition from local client-side PIN storage (`PIN = '2026'` in `app/admin/page.tsx`) to secure server-side session checks.

1. **Session Enforcement:**
   * Protect all administrative routes (pages starting with `/admin` and APIs starting with `/api/admin`) using backend middlewares.
   * If using Option A (Next.js), use **Auth.js (NextAuth.js)** or secure HTTP-only cookie sessions. Add a `middleware.ts` in the root:
     ```typescript
     import { NextResponse } from 'next/server';
     import type { NextRequest } from 'next/server';
     import { getToken } from 'next-auth/jwt';

     export async function middleware(req: NextRequest) {
       const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
       const { pathname } = req.nextUrl;

       if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
         if (!token || token.role !== 'ADMIN') {
           return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
         }
       }
       return NextResponse.next();
     }
     ```
2. **Firestore Security Rules:** If using Option B (Firebase), enforce data protection using user document lookup in rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       function isAdmin() {
         return request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'superadmin'];
       }

       match /applications/{appId} {
         allow create: if true;
         allow read, write: if isAdmin();
       }
       match /contacts/{msgId} {
         allow create: if true;
         allow read, write: if isAdmin();
       }
       match /events/{eventId} {
         allow read: if true;
         allow write: if isAdmin();
       }
       match /blog_posts/{postId} {
         allow read: if true;
         allow write: if isAdmin();
       }
       match /chapters/{chapterId} {
         allow read: if true;
         allow write: if isAdmin();
       }
     }
   }
   ```

---

## 5. Mailing Integration

Integrate transactional emails using **Resend** or SMTP Nodemailer.

1. **Trigger on Application (`POST /api/apply`):**
   * Send a welcome email to the applicant's email address confirming receipt of application.
   * Send an alert message containing applicant details to `hello@mikaelsoninitiative.org`.
2. **Trigger on Contact Enquiry (`POST /api/contact`):**
   * route emails to appropriate target channels:
     * Partnerships -> `partners@mikaelsoninitiative.org`
     * Media -> `media@mikaelsoninitiative.org`
     * General/School -> `hello@mikaelsoninitiative.org`

---

## 6. Seed Configuration

To migrate existing layouts successfully, write database seeding code (e.g. `prisma/seed.ts` for Prisma ORM) that reads the static mock values from the current codebase and inserts them into the database tables:
* **Initial Chapters:** 10 registered schools located in `app/admin/page.tsx` (`SCHOOLS`).
* **Initial Core Team:** 11 members located in `app/admin/page.tsx` (`TEAM`).
* **Initial Blog Posts:** 3 stories located in `app/blog/page.tsx` (`POSTS`).
* **Initial Calendar Events:** 3 upcoming and 3 past events located in `app/events/page.tsx` (`upcomingEvents`, `pastEvents`).
