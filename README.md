# Shared-Wishlist-App

## Collaborative Product Wishlist Application

Shared-Wishlist-App is a full-stack web application designed to help users create, manage, and share product wishlists. It stands out with its collaborative features, allowing real-time updates and contributions from invited users.

-----

## Features

  * **User Authentication:** Secure signup and login for individual user accounts.
  * **Wishlist Management:** Create, view, update, and delete your personal wishlists.
  * **Product Management:** Add, edit, and remove products within specific wishlists.
  * **User Association:** Products are linked to the user who added them.
  * **Collaboration (Simulated):** Functionality to invite other users to collaborate on a wishlist (currently simulated, ready for extension).
  * **Real-time Sync (Bonus):** Updates to wishlists are reflected instantly for all active viewers using WebSockets.
  * **Comments/Reactions (Bonus):** Add comments to individual products within a wishlist.
  * **Responsive UI:** Designed to look great on various screen sizes, from mobile to desktop.

-----

## Tech Stack

**Backend:**

  * **Node.js:** JavaScript runtime environment
  * **Express.js:** Web application framework for Node.js
  * **MongoDB:** NoSQL database
  * **Mongoose:** ODM (Object Data Modeling) for MongoDB
  * **`bcryptjs`:** For secure password hashing
  * **`jsonwebtoken`:** For dummy user authentication and authorization
  * **`cors`:** For Cross-Origin Resource Sharing
  * **`dotenv`:** For environment variable management
  * **Socket.IO:** For real-time, bidirectional event-based communication (Bonus)

**Frontend:**

  * **React:** JavaScript library for building user interfaces
  * **Axios:** Promise-based HTTP client for making API requests
  * **Socket.IO Client:** For real-time communication with the backend (Bonus)

-----

## Project Structure

```
shared-wishlist-app/
├── backend/
│   ├── models/
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   └── wishlist.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── wishlist.routes.js
│   │   └── product.routes.js
│   ├── .env                 # Environment variables
│   ├── server.js            # Main backend server file
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── SignUp.js
    │   │   ├── Login.js
    │   │   ├── WishlistList.js
    │   │   ├── WishlistDetail.js
    │   │   ├── InviteUser.js
    │   │   └── Comments.js (Bonus)
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    ├── package.json
    └── README.md
```

-----

## Setup Instructions

Follow these steps to get Shared-Wishlist-App up and running on your local machine.

### Prerequisites

  * Node.js (LTS version recommended)
  * npm (comes with Node.js)
  * MongoDB (local installation or cloud-hosted instance like MongoDB Atlas)

### 1\. Clone the Repository

```bash
git clone <your-repository-url>
cd shared-wishlist-app
```

### 2\. Backend Setup

Navigate into the `backend` directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection string and a JWT secret:

```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=a_very_strong_secret_key_for_jwt
PORT=5000
```

*Replace `your_mongodb_connection_string_here` with your actual MongoDB URI (e.g., `mongodb://localhost:27017/sharedwishlist` or your MongoDB Atlas connection string).*
*Replace `a_very_strong_secret_key_for_jwt` with a long, random string.*

Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5000` (or the port you specified in `.env`).

### 3\. Frontend Setup

Open a **new terminal window** and navigate into the `frontend` directory:

```bash
cd ../frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend application will typically open in your browser at `http://localhost:3000`.

-----

## Usage

1.  **Register/Login:** Access the app through your browser (usually `http://localhost:3000`). Sign up for a new account or log in with existing credentials.
2.  **Create Wishlists:** Once logged in, you'll see your wishlists. Use the provided form to create new ones.
3.  **View Wishlist Details:** Click on any wishlist to see the products within it.
4.  **Add Products:** In the wishlist detail view, add new products with their name, image URL, and price.
5.  **Edit/Delete Products:** Modify or remove existing products as needed.
6.  **Collaborate:** The "Invite User" button simulates collaboration. In a fully implemented version, this would allow you to share your wishlist with others.
7.  **Real-time Updates:** Observe how changes (e.g., adding a product) are instantly reflected for all users viewing the same wishlist.
8.  **Comments:** Add comments to individual products.

-----

## Assumptions & Limitations

  * The "Invite User" feature is currently a placeholder to demonstrate potential. Full user search and invitation logic are not implemented.
  * Basic error handling is in place, but a production-grade application would require more comprehensive error management and user feedback.
  * User authentication is implemented using JWTs; however, advanced features like password reset or email verification are outside the scope of this project.

-----

## Future Improvements

  * Implement full **user search and invitation system** for collaborators.
  * Add more robust **input validation** and **error handling** on both frontend and backend.
  * Integrate **image upload** functionality for product images instead of just URLs.
  * Enhance **user profiles** and possibly add profile pictures.
  * Implement **notifications** for wishlist activities (e.g., when a collaborator adds a product).
  * Add **sorting and filtering** options for wishlists and products.
  * Deployment to cloud platforms (e.g., Heroku, Vercel for frontend, MongoDB Atlas for database).
  * Implement **database indexing** on frequently queried fields for improved performance.

-----

Feel free to explore the code, contribute, and enhance the Shared-Wishlist-App\!
