## Getting Started

First, run the development server:

# Clone the repository

```bash

git clone git@github.com:Jithin7777/Online-Marketplace-Dashboard.git

# Go into the project directory
cd Online-Marketplace-Dashboard

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mock Data

Products are stored in src/data/products.json
Example structure:

```bash
{
  "id": "1756043493617",
  "name": "Sample Product",
  "price": 99.99,
  "stock": 25,
  "category": "Electronics",
  "vendor": "Vendor A",
  "status": "active",
  "createdAt": "2025-08-24T12:00:00.000Z"
}
```

1.Get All Products

method:GET

```bash
http://localhost:3000/api/products
```

2.Add New Product

method:POST

```bash
 /api/products
```

Example Request:

```bash
http://localhost:3000/api/products
```

Request Body:

```json
{
  "name": "Test Product",
  "price": 100,
  "stock": 5,
  "category": "Test",
  "vendor": "Me",
  "status": "active"
}
```

2. Delete Product By ID
   method: DELETE

```bash
DELETE /api/products/[id]
```

Example Request:

```bash
DELETE http://localhost:3000/api/products/1
```

## AI Tools Used

ChatGPT: Assisted with generating API routes and React components
Figma: Design reference for layout and styling
Tailwind CSS IntelliSense: Faster styling


## API Overview

Products are stored in src/data/products.json. No database (MongoDB) is used, all data is hardcoded and imported.

⚠️ Note: POST and DELETE endpoints modify the local JSON file. These changes only work locally. On Vercel, the serverless functions cannot write to files, so POST/DELETE will not persist data. GET works fine.