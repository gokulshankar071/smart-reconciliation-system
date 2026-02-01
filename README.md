# Smart Reconciliation System

## Overview

This project is a Smart Reconciliation System designed to reconcile financial
transactions between two data sources (e.g., bank records and internal system records).

The system supports secure authentication, role-based access control, CSV/Excel uploads,
transaction matching logic, reconciliation dashboards, manual corrections, and audit logging.

The application is built as a full-stack MERN solution with a focus on scalability,
clarity, and real-world enterprise reconciliation workflows.

## Architecture

The application follows a client-server architecture:

- Frontend (React):
  - Handles user authentication, dashboards, file uploads, reconciliation views,
    and audit timelines.
  - Communicates with backend APIs using JWT-based authentication.

- Backend (Node.js + Express):
  - Exposes REST APIs for authentication, uploads, reconciliation processing,
    dashboards, and audit logs.
  - Implements role-based authorization at route level.

- Database (MongoDB):
  - Stores users, transactions, reconciliation results, and audit logs.

The system is modular, separating concerns across controllers, routes, models,
and middleware layers.

## Tech Stack

Frontend:

- React
- React Router
- Fetch API
- Custom CSS (no UI frameworks)

Backend:

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- CSV Parser

Tools:

- Git & GitHub
- Postman (API documentation)

## Features Implemented

- Secure login with JWT authentication
- Role-based access control (Admin, Analyst, Viewer)
- CSV file upload with preview of first 20 rows
- Column mapping before data submission
- Automated reconciliation logic
- Detection of matched, mismatched, missing, and duplicate transactions
- Interactive dashboard with filters (date, status, uploaded by)
- Reconciliation view with manual correction support
- Audit timeline capturing user actions and changes

## Role-Based Access Control

- Admin:
  - Full access to all features
  - Upload files, run reconciliation, view dashboards and audit logs

- Analyst:
  - Upload files and run reconciliation
  - View dashboards and reconciliation results

- Viewer:
  - Read-only access
  - Can view dashboards and reconciliation results

## API Documentation

All APIs are documented using Postman.

The Postman collection is included in the repository under:
postman/Smart-Reconciliation.postman_collection.json

## Sample Input Files

Sample CSV files used for testing are included under:
sample-files/

- bank.csv
- internal.csv

These files contain sample transaction data demonstrating
matched, mismatched, missing, and duplicate scenarios.

## Assumptions

- Uploaded files are well-formed CSV or Excel files.
- Transaction ID is used as the primary key for reconciliation.
- Amount differences within a defined tolerance are treated as partial matches.
- User roles are predefined and assigned during registration.

## Trade-offs

- CSV parsing is performed synchronously for simplicity.
- Large file streaming and background job processing are not implemented.
- Dashboard charts are implemented using custom CSS instead of chart libraries.

## Limitations

- Not optimized for very large datasets (millions of records).
- No real-time updates (manual refresh required).
- Email notifications are not implemented.

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   cd backend
   npm install

3. Configure environment variables:
   Create a .env file based on .env.example

4. Start backend server:
   npm run dev

5. Install frontend dependencies:
   cd frontend
   npm install

6. Start frontend:
   npm run dev

## Demo Video

## Hosted URL
