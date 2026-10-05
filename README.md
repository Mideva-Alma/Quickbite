# QUICKBITE - Restaurant Online Ordering System

## Project Description

**QUICKBITE** is a React-based restaurant online ordering system that allows customers to browse meals, view food details, select a table, place orders, make a simulated payment, and track their order status.

The system also provides dedicated dashboards for restaurant staff. Waiters can view and manage incoming orders, while managers can view restaurant order statistics and identify popular meals.

QUICKBITE also includes a mini-games arcade where customers can play games while waiting for their orders.

---

## Features

### Customer Features

- Browse restaurant meals
- Search for meals
- Filter meals by category
- View detailed meal information
- Add meals to cart
- Increase and decrease meal quantities
- Remove items from cart
- Clear the cart
- View order summary and total price
- Enter customer details
- Select a restaurant table
- Select a payment method
- Simulated payment
- Receive order confirmation
- Track order status
- Play mini-games while waiting for an order

### Staff Features

#### Waiter Dashboard

Waiters can:

- View incoming orders
- Search orders
- Filter orders by status
- View customer names
- View customer phone numbers
- View table numbers
- View ordered meals
- View quantities
- View order totals
- Update order status

Order statuses include:

- Pending
- Preparing
- Ready
- Served

#### Manager Dashboard

Managers can:

- View total orders
- View monthly order statistics
- View popular meals
- Monitor restaurant order activity

### Mini-Games Arcade

The Games section provides several games for customers:

- Food Trivia
- Quick Trivia
- Pokémon Guess
- Memory Match
- Rock Paper Scissors
- Number Challenge

The trivia games use the **Open Trivia DB API**, while the Pokémon game uses **PokéAPI**.

---

## Technologies Used

### Frontend

- React
- JavaScript
- HTML
- Tailwind CSS
- React Router

### APIs

- TheMealDB
- Open Trivia DB
- PokéAPI

### Storage

- Browser LocalStorage

### Development Tools

- Vite
- Git
- GitHub
- VS Code

---

## APIs Used

### TheMealDB

TheMealDB provides the meal data used throughout the QUICKBITE menu.

It is used for:

- Meal names
- Meal images
- Meal categories
- Meal descriptions
- Meal details

### Open Trivia DB

Open Trivia DB provides questions for the trivia games.

It is used for:

- Food Trivia
- Quick Trivia

### PokéAPI

PokéAPI provides Pokémon data and images for the Pokémon Guess game.

---

## Application Routes

| Route | Page | Description |
|---|---|---|
| `/` | Menu | Redirects to the menu |
| `/menu` | Menu | Browse and search meals |
| `/menu/:id` | Food Details | View meal information |
| `/cart` | Cart | View selected meals |
| `/customer-details` | Customer Details | Enter customer information |
| `/checkout` | Checkout | Review order |
| `/payment` | Payment | Complete simulated payment |
| `/order-confirmation` | Order Confirmation | View submitted order |
| `/order-status` | Order Status | Track order progress |
| `/games` | Games | Play mini-games |
| `/staff-login` | Staff Login | Staff access |
| `/waiter` | Waiter Dashboard | Manage customer orders |
| `/manager` | Manager Dashboard | View restaurant statistics |

---
## Deployment

The QUICKBITE frontend is deployed on Vercel.

**Live Application:** [QUICKBITE Live Demo](https://quickbite-dusky-tau.vercel.app/menu)

## APIs Used

### TheMealDB

Used to retrieve restaurant meal data, including meal names, images, categories, and descriptions.

**API:** [TheMealDB](https://www.themealdb.com/documentation)

### Open Trivia DB

Used for the trivia games in the Games section.

**API:** [Open Trivia DB](https://opentdb.com/api_config.php)

### PokéAPI

Used for the Pokémon guessing game and Pokémon artwork.

**API:** [PokéAPI](https://pokeapi.co/docs/v2)

---

## Customer Ordering Flow

```text
Browse Menu
     ↓
View Food Details
     ↓
Add to Cart
     ↓
View Cart
     ↓
Enter Customer Details
     ↓
Checkout
     ↓
Payment
     ↓
Order Confirmation
     ↓
Order Status
```

---

## Staff Flow

```text
Staff Login
     ↓
Choose Staff Role
     ↓
Waiter Dashboard / Manager Dashboard
```

### Waiter

```text
View Orders
     ↓
Search / Filter Orders
     ↓
Update Order Status
     ↓
Pending → Preparing → Ready → Served
```

### Manager

```text
View Order Statistics
     ↓
View Monthly Orders
     ↓
View Popular Meals
```

---

## Games Flow

```text
Games
  ↓
Choose a Game
  ↓
Play
  ↓
Receive Score / Result
  ↓
Play Again or Choose Another Game
```

---

## Project Structure

```text
quickbite/
├── public/
│
├── src/
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   └── OrderSummary.jsx
│   │   │
│   │   ├── customer/
│   │   │   ├── CustomerForm.jsx
│   │   │   ├── TableSelector.jsx
│   │   │   └── TableCard.jsx
│   │   │
│   │   └── Navbar.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── pages/
│   │   ├── Menu.jsx
│   │   ├── FoodDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── CustomerDetails.jsx
│   │   ├── Checkout.jsx
│   │   ├── Payment.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── OrderStatus.jsx
│   │   ├── Games.jsx
│   │   ├── StaffLogin.jsx
│   │   ├── WaiterDashboard.jsx
│   │   └── ManagerDashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── orderHelpers.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## User Interface

QUICKBITE uses a red and white restaurant-themed design.

The application includes:

- Fixed left-side navigation
- Responsive meal card grid
- Food images
- Food detail pages
- Shopping cart
- Checkout pages
- Staff dashboards
- Order tracking
- Games grid
- Responsive layouts

---

## Data Storage

During Phase 1, QUICKBITE uses **LocalStorage** to temporarily store:

- Cart items
- Customer information
- Orders
- Order statuses

This allows the frontend application to demonstrate the complete ordering flow without requiring a backend database.

The LocalStorage implementation will be replaced or integrated with the Flask backend during later project phases.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd Quickbite
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local Vite development server.

---

## Team Project Development

The project uses Git and GitHub for collaborative development.

Each team member works on a separate feature branch before changes are merged into the main branch.

Example:

```bash
git switch -c feature/feature-name
```

After completing a feature:

```bash
git add .
git commit -m "Describe the changes"
git push origin feature/feature-name
```

The completed feature can then be merged into the main branch.

---

## Future Development

The next development phases will extend QUICKBITE with:

- Flask backend
- Database integration
- User authentication
- User-owned orders
- Persistent restaurant data
- Real payment integration
- Improved staff authentication
- Additional restaurant management features

---

## Project Goal

The goal of QUICKBITE is to provide a complete restaurant ordering experience that connects customers, waiters, and managers through a single web application.

The project demonstrates frontend development, API integration, state management, routing, LocalStorage, responsive UI design, and collaborative Git/GitHub development.