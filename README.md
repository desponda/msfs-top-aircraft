# MSFS Top Aircraft

A web application to track and display the most popular aircraft for Microsoft Flight Simulator, with monthly and yearly reports.

## Features

- **Monthly & Yearly Reports**: View aircraft popularity rankings by month or year
- **Historical Data**: Access past reports to track changes in aircraft popularity over time
- **Admin Interface**: Password-protected admin area to create and manage reports
- **Report Comparison**: Easily compare aircraft ranking changes between different time periods
- **RESTful API**: Backend API for aircraft and report data
- **Responsive UI**: Modern, mobile-friendly interface built with Material UI

## Tech Stack

- **Backend**: Node.js with Express and TypeScript
- **Frontend**: React, TypeScript, and Vite
- **UI Framework**: Material UI
- **Routing**: React Router
- **API Communication**: Axios

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   make install
   ```
3. Ensure the Prisma client is generated (only needed if you encounter Prisma errors):
   ```bash
   make ensure-client
   ```
3. Start development servers:
   ```bash
   make dev-up
   ```
4. Access the application:
   - Frontend: http://localhost:5173
   - API: http://localhost:3001/api

## Development

- **Backend Development**: `make dev-backend`
- **Frontend Development**: `make dev-frontend`
- **Full Stack Development**: `make dev-up`

## Admin Access

The admin interface is available at `/admin`. Use the following credentials for access:
- Username: `admin`
- Password: `admin123`

## Testing Reports

To reset report data for testing:
```bash
make reset-reports
```