# MSFS Top Aircraft API Documentation

## Authentication

Admin endpoints require Basic Authentication.
- **Username**: admin
- **Password**: admin123

## Aircraft Endpoints

### GET `/api/aircraft`
Get all aircraft with optional filters.

**Query Parameters:**
- `manufacturer`: Filter by aircraft manufacturer
- `category`: Filter by category
- `tag`: Filter by tag
- `search`: Search in name and manufacturer

**Example:** `GET /api/aircraft?category=Propeller`

### GET `/api/aircraft/:id`
Get a specific aircraft by ID.

**Example:** `GET /api/aircraft/cessna-172`

## Report Endpoints

### GET `/api/reports`
Get all report summaries (metadata only).

**Query Parameters:**
- `year`: Filter by year 
- `type`: Filter by report type (`monthly` or `yearly`)
- `month`: Filter by month (1-12)

**Example:** `GET /api/reports?type=monthly&year=2025`

### GET `/api/reports/latest`
Get the latest monthly and yearly reports.

**Example:** `GET /api/reports/latest`

### GET `/api/reports/:id`
Get a specific report by ID with all aircraft data.

**Example:** `GET /api/reports/2025-05`

### POST `/api/reports` (Admin)
Create a new report.

**Example Body:**
```json
{
  "type": "monthly",
  "year": 2025,
  "month": 6,
  "title": "Top Aircraft - June 2025",
  "description": "The most popular aircraft for June 2025",
  "aircraft": [
    { "id": "cessna-172", ... },
    { "id": "piper-pa-28", ... }
  ]
}
```

### PUT `/api/reports/:id` (Admin)
Update an existing report.

**Example:** `PUT /api/reports/2025-05`

### DELETE `/api/reports/:id` (Admin)
Delete a report.

**Example:** `DELETE /api/reports/2025-05`
