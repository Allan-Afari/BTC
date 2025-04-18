# Client Management System with Bitcoin Integration

A web application that manages client data and integrates with Bitcoin payments for product purchases.

## Features

- Client data management
- Product catalog with Bitcoin pricing
- Shopping cart functionality
- Wishlist feature
- User accounts and authentication
- Order tracking
- Product recommendations
- Advanced filtering and search

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm (Node Package Manager)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd client-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up MySQL database:
- Create a new database named `client_data`
- Import the `Client data.sql` file into your MySQL database

4. Configure the database connection:
- Open `server.js`
- Update the MySQL connection details if needed:
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'client_data'
});
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

## Project Structure

- `server.js` - Main server file
- `views/` - EJS templates
  - `index.ejs` - Main application view
- `public/` - Static assets
- `Client data.sql` - Database schema and initial data

## API Endpoints

- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get client by ID

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 