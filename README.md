# EMS Pro

EMS Pro is a responsive Employee Management System built as a standalone React web application.

## Features

- Admin and employee login
- Employee and department management
- Attendance, leave, payroll, reports, and salary slips
- Employee self-service portal
- Excel backup and restore
- Browser-local data storage for a Vercel-friendly demonstration deployment

## Demo login

| Account | ID | Password |
|---|---|---|
| Administrator | `ADMIN001` | `Admin@123` |

New employees receive login ID `EMP<employee-id>` and default password `Emp@123`.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

## Data storage

The web app stores working data in the browser's local storage. Open **Settings** to export all data to an Excel workbook or import a previous workbook backup. Each browser/device has its own data.

## Deploy to Vercel

Import this repository into Vercel. The included `vercel.json` builds `frontend` and supports React routes.
