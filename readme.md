# Backend Projects

This is the backend of the **FoodLane** project, built with **Node.js**, **Express.js**, **Mongoose** and **MongoDB** using the **MVC (Model-View-Controller)** pattern. The backend provides APIs to manage the application's core functionalities such as authentication, search, pagination, and payments.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Custom Authentication**: Secure user login and registration.
- **Search Functionality**: Efficiently search for items.
- **Pagination**: Supports paginated data retrieval.
- **Payment Integration**: Enables online transactions.
- **Responsive API Design**: Supports front-end development with clean and structured APIs.

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **MVC Pattern**: Structured code organization.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/foodlane-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd foodlane-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

- Make API requests to the backend using a tool like **Postman** or integrate with the front-end.
- The server runs at `http://localhost:5000` by default.

---

## Folder Structure

```
backend-projects/
|-- controllers/       # Request handlers for API endpoints
|-- models/            # Mongoose models for database schema
|-- routes/            # API route definitions
|-- middlewares/       # Custom middleware functions
|-- utils/             # Utility functions and helpers
|-- config/            # Configuration files (e.g., database connection)
|-- server.js          # Entry point of the application
```

---

## API Endpoints

### Authentication login and register

- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Login a user.

### Items

- **GET** `/api/user` - Retrieve all items (supports pagination and search).
- **GET** `/api/user/:id` - Retrieve a specific item.
- **POST** `/api/items` - Add a new item (Admin only).
- **PUT** `/api/items/:id` - Update an item (Admin only).
- **DELETE** `/api/items/:id` - Delete an item (Admin only).

### Payments

- **POST** `/api/payments` - Process a payment.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
