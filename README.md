# Bazario – MERN Shopping App

Bazario is a full-stack shopping web application built using the MERN stack.  
Users can browse products, add them to cart, place orders, and view their order history.

## Tech Stack

- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Token)

## Features

- User authentication using JWT
- Product listing
- Add products to cart
- Increase / decrease cart item quantity
- Automatic cart total calculation
- Place order from cart
- View order history
- Protected routes for cart and orders

## Application Flow

1. User logs in using email and password
2. JWT token is generated and stored in localStorage
3. User can browse products
4. Products can be added to cart
5. Cart quantity can be increased or decreased
6. User places order from cart
7. Order is saved and cart is cleared
8. User can view order history

## How to Run Locally

### Backend

```bash
cd server
npm install
npm run dev