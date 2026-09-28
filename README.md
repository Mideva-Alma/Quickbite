# QUICKBITE - Restaurant Online Ordering System

## 1. PROJECT DESCRIPTION

**QUICKBITE** is a React-based restaurant ordering application that allows customers to browse food from an external API, search for meals, select their table, enter their name and phone number, add food to their order, make a simulated payment, and submit their order.

A **Waiter Dashboard** allows restaurant staff to view incoming orders, see customer and table information, view ordered food, and update the order status.

A **Manager Dashboard** allows restaurant management to monitor restaurant performance, including total orders, sales, popular meals, and order statistics.

The application will be built as a **frontend-only React project**. Orders and temporary data can be stored using **React state** and **localStorage** because there is no backend.

---

# 2. MAIN PROJECT PAGES

The application will contain the following pages:

| Page                        | Route                 |
| --------------------------- | --------------------- |
| Home                        | `/`                   |
| Menu                        | `/menu`               |
| Food Details                | `/menu/:id`           |
| Cart                        | `/cart`               |
| Checkout / Customer Details | `/checkout`           |
| Payment                     | `/payment`            |
| Order Confirmation          | `/order-confirmation` |
| Waiter Dashboard            | `/waiter`             |
| Manager Dashboard           | `/manager`            |

## Routes

```text
/ → Home
/menu → Menu
/menu/:id → Food Details
/cart → Cart
/checkout → Customer Details
/payment → Demo Payment
/order-confirmation → Order Confirmation
/waiter → Waiter Dashboard
/manager → Manager Dashboard
```

---

# 3. TEAM COMPONENTS

## PERSON 1 - CUSTOMER & TABLE MANAGEMENT

**Responsibility:** Build the customer information and table selection section.

### Features

* Customer name
* Phone number
* Table number
* Available tables
* Table selection
* Form validation
* Save customer information

### Page

```text
/checkout
```

### Components

```text
CustomerForm.jsx
TableSelector.jsx
TableCard.jsx
```

### Example

```text
Customer enters:

Name: Robert Mmasi
Phone: 0712345678
Table: 7

        ↓

Customer information is saved

        ↓

Customer proceeds to payment
```

---

## PERSON 2 - MENU & EXTERNAL API

**Responsibility:** Build the restaurant menu and connect the application to the external API.

### API

**TheMealDB API**

TheMealDB will provide meal information such as:

* Meal names
* Meal images
* Categories
* Ingredients
* Meal details

Since **TheMealDB does not provide restaurant-specific prices**, QUICKBITE will assign prototype prices to menu items on the frontend.

### Features

* Fetch meals from the API
* Display meal images
* Display meal names
* Display categories
* Search food
* Filter food
* View food details
* Loading state
* Error handling

### Pages

```text
/menu
/menu/:id
```

### Components

```text
Menu.jsx
FoodCard.jsx
SearchBar.jsx
CategoryFilter.jsx
FoodDetails.jsx
Loading.jsx
ErrorMessage.jsx
```

### API Flow

```text
TheMealDB API
      ↓
   fetch()
      ↓
  api.js
      ↓
  Menu.jsx
      ↓
  FoodCard.jsx
      ↓
Customer views meals
```

---

## PERSON 3 - CART & ORDER MANAGEMENT

**Responsibility:** Build the customer's shopping cart and manage selected food.

### Features

* Add food to cart
* Remove food
* Increase quantity
* Decrease quantity
* Calculate total
* Clear cart
* Continue shopping
* Proceed to checkout

### Page

```text
/cart
```

### Components

```text
Cart.jsx
CartItem.jsx
QuantityControl.jsx
OrderSummary.jsx
```

### Example

```text
Customer selects:

Chicken Curry × 2
Price: KSh 450 each

Beef Burger × 1
Price: KSh 500

        ↓

Cart calculates:

Chicken Curry = KSh 900
Beef Burger = KSh 500

Total = KSh 1,400
```

---

## PERSON 4 - CHECKOUT & DEMO PAYMENT

**Responsibility:** Build the final checkout and simulated payment process.

### Features

* Display customer name
* Display phone number
* Display table number
* Display selected food
* Display total amount
* Select payment method
* Simulate payment
* Generate order number
* Place order
* Show order confirmation

### Pages

```text
/checkout
/payment
/order-confirmation
```

### Components

```text
CheckoutSummary.jsx
PaymentMethod.jsx
DemoPayment.jsx
OrderConfirmation.jsx
```

### Example

```text
Checkout
    ↓
Customer Information
    ↓
Order Summary
    ↓
Payment Method
    ↓
Demo Payment
    ↓
Generate Order Number
    ↓
Order Confirmation
```

---

# PERSON 5 - WAITER & MANAGER DASHBOARDS

**Responsibility:** Build the staff side of the application, including the **Waiter Dashboard** for managing incoming orders and the **Manager Dashboard** for monitoring restaurant performance.

---

## WAITER DASHBOARD

### Features

* View incoming orders
* View customer name
* View customer phone
* View table number
* View food ordered
* View quantity
* View total amount
* View payment status
* Update order status
* Mark orders as **Preparing**
* Mark orders as **Served**

### Page

```text
/waiter
```

### Components

```text
WaiterDashboard.jsx
OrderCard.jsx
OrderDetails.jsx
OrderStatus.jsx
```

### Example

```text
--------------------------------------------------
ORDER #ORD-1001
--------------------------------------------------
Customer: Robert Mmasi
Phone: 0712345678
Table: 7

Food:
- Chicken Curry × 2
- Beef Burger × 1

Total: KSh 1,400
Payment: Paid
Status: Pending

[ Preparing ] [ Served ]
--------------------------------------------------
```

---
## MANAGER DASHBOARD

**Responsibility:** Build the Manager Dashboard for monitoring restaurant performance, sales, orders, and popular meals.

### Features

* View total number of orders
* View total sales
* View orders for the current month
* View most ordered meal
* View order statistics by day
* View order statistics by week
* View order statistics by month
* View pending orders
* View completed orders
* View popular meals
* View basic restaurant performance statistics

### Page

```text
/manager
```

### Components

```text
ManagerDashboard.jsx
StatisticsCard.jsx
PopularMeals.jsx
SalesSummary.jsx
OrderStatistics.jsx
```

### Dashboard Example

```text
==================================================
             QUICKBITE MANAGER DASHBOARD
==================================================

STATISTICS

┌──────────────────┐  ┌──────────────────┐
│ Total Orders     │  │ Total Sales      │
│                  │  │                  │
│      125         │  │  KSh 85,500      │
└──────────────────┘  └──────────────────┘

┌──────────────────┐  ┌──────────────────┐
│ Pending Orders   │  │ Completed Orders │
│                  │  │                  │
│       12         │  │      113         │
└──────────────────┘  └──────────────────┘


POPULAR MEALS

1. Chicken Curry       - 45 orders
2. Beef Burger         - 32 orders
3. Grilled Chicken     - 28 orders
4. Fish & Chips        - 20 orders


SALES SUMMARY

Today:        KSh 4,500
This Week:    KSh 22,300
This Month:   KSh 85,500


ORDER STATISTICS

Day       Orders       Sales
--------------------------------
Monday      18        KSh 12,500
Tuesday     21        KSh 14,200
Wednesday   16        KSh 10,800
Thursday    24        KSh 16,500
Friday      27        KSh 18,700
Saturday    12        KSh 7,800
Sunday       7        KSh 5,000


ORDER STATUS

Pending:      12
Preparing:     8
Served:      105
Completed:   113
==================================================
```

### Manager Dashboard Data Flow

```text
Customer Places Order
        ↓
Order Saved to localStorage
        ↓
OrderContext.jsx
        ↓
ManagerDashboard.jsx
        ↓
Calculate Statistics
        ↓
┌─────────────────────────────────────┐
│ Total Orders                        │
│ Total Sales                         │
│ Pending Orders                      │
│ Completed Orders                    │
│ Popular Meals                       │
│ Daily / Weekly / Monthly Statistics │
└─────────────────────────────────────┘
```

### Manager Dashboard Statistics

The Manager Dashboard will calculate statistics from the shared order data stored in the application.

For example:

```javascript
const totalOrders = orders.length;

const totalSales = orders.reduce(
  (total, order) => total + order.total,
  0
);

const pendingOrders = orders.filter(
  (order) => order.orderStatus === "Pending"
).length;

const completedOrders = orders.filter(
  (order) => order.orderStatus === "Completed"
).length;
```

### Popular Meals

The dashboard should identify the meals that have been ordered most frequently.

Example:

```text
Popular Meals

Chicken Curry       45 orders
Beef Burger         32 orders
Grilled Chicken     28 orders
Fish & Chips        20 orders
```

### Sales Summary

The dashboard should display sales for different time periods.

```text
Today
↓
This Week
↓
This Month
```

Example:

```text
Today's Sales:       KSh 4,500
Weekly Sales:        KSh 22,300
Monthly Sales:       KSh 85,500
```

### Order Statistics

Managers should be able to view order activity over different periods:

```text
Daily
Weekly
Monthly
```

The statistics can be displayed using tables, cards, or charts.

### Manager Dashboard Component Structure

```text
ManagerDashboard.jsx
│
├── StatisticsCard.jsx
│   ├── Total Orders
│   ├── Total Sales
│   ├── Pending Orders
│   └── Completed Orders
│
├── PopularMeals.jsx
│   └── Most Ordered Meals
│
├── SalesSummary.jsx
│   ├── Daily Sales
│   ├── Weekly Sales
│   └── Monthly Sales
│
└── OrderStatistics.jsx
    ├── Daily Statistics
    ├── Weekly Statistics
    └── Monthly Statistics
```

### Example Manager Dashboard Data

```javascript
const managerStats = {
  totalOrders: 125,
  totalSales: 85500,
  pendingOrders: 12,
  completedOrders: 113,
  mostOrderedMeal: "Chicken Curry",
  currentMonthOrders: 95
};
```

---

# 4. COMPLETE PROPOSED PROJECT STRUCTURE

```text
quickbite/
│
├── public/
│   └── ...
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── Navbar.jsx
│   │   │
│   │   ├── customer/
│   │   │   ├── CustomerForm.jsx
│   │   │   ├── TableSelector.jsx
│   │   │   └── TableCard.jsx
│   │   │
│   │   ├── menu/
│   │   │   ├── FoodCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── QuantityControl.jsx
│   │   │   └── OrderSummary.jsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── CheckoutSummary.jsx
│   │   │   ├── PaymentMethod.jsx
│   │   │   └── DemoPayment.jsx
│   │   │
│   │   ├── waiter/
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrderDetails.jsx
│   │   │   └── OrderStatus.jsx
│   │   │
│   │   └── manager/
│   │       ├── StatisticsCard.jsx
│   │       ├── PopularMeals.jsx
│   │       ├── SalesSummary.jsx
│   │       └── OrderStatistics.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── FoodDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Payment.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── WaiterDashboard.jsx
│   │   └── ManagerDashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── OrderContext.jsx
│   │
│   ├── utils/
│   │   ├── priceCalculator.js
│   │   └── orderHelpers.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── README.md
└── .gitignore
```

## 5. CUSTOMER ORDER FLOW

```text
HOME
  ↓
MENU
  ↓
FOOD DETAILS
  ↓
ADD TO CART
  ↓
CART
  ↓
CHECKOUT
  ↓
CUSTOMER INFORMATION
  ↓
TABLE SELECTION
  ↓
PAYMENT
  ↓
ORDER CONFIRMATION
  ↓
ORDER SAVED
  ↓
WAITER DASHBOARD
  ↓
ORDER PREPARING
  ↓
ORDER SERVED
```

## 6. SHARED ORDER DATA

All five team members should use the **same order structure**.

Example:

```javascript
{
  id: "ORD-1001",
  customerName: "Robert Mmasi",
  phone: "0712345678",
  tableNumber: 7,

  items: [
    {
      id: 52772,
      name: "Chicken Curry",
      quantity: 2,
      price: 450
    }
  ],

  total: 1300,
  paymentStatus: "Paid",
  orderStatus: "Pending"
}
```

### Order Status

Orders can have the following statuses:

```text
Pending
Preparing
Served
Completed
```

### Payment Status

```text
Pending
Paid
Failed
```

---

# 7. TECHNOLOGIES

The project will use the following technologies:

* **React**
* **JavaScript**
* **HTML**
* **CSS / Tailwind CSS**
* **React Router**
* **TheMealDB API**
* **useState**
* **useEffect**
* **Context API**
* **localStorage**
* **Demo / Simulated Payment**

---

# 8. ASSIGNMENT REQUIREMENTS

### Routing

The project must use:

```text
React Router
```

### External API

The project must use:

```text
TheMealDB API
```

### Asynchronous JavaScript

The project should demonstrate:

```javascript
fetch()
useEffect()
```

### Controlled Components

Customer information and checkout forms should use controlled React components.

Examples:

```text
Customer Name
Phone Number
Table Number
Payment Method
```

### State Management

The application should manage:

* Cart
* Customer information
* Table selection
* Orders
* Payment status
* Order status

### Dynamic Rendering

The application should dynamically render:

* Food menu
* Food details
* Cart items
* Order summaries
* Waiter orders
* Manager statistics

### UI Design

The application should include separate interfaces for:

```text
Customer
Waiter
Manager
```

### Reusable Components

The project should use reusable components such as:

```text
FoodCard
CartItem
OrderCard
TableCard
StatisticsCard
```

---

# 9. TEAM DIVISION SUMMARY

| Person       | Responsibility              | Main Pages                                     |
| ------------ | --------------------------- | ---------------------------------------------- |
| **Person 1** | Customer & Table Management | `/checkout`                                    |
| **Person 2** | Menu & External API         | `/menu`, `/menu/:id`                           |
| **Person 3** | Cart & Order Management     | `/cart`                                        |
| **Person 4** | Checkout & Demo Payment     | `/checkout`, `/payment`, `/order-confirmation` |
| **Person 5** | Waiter & Manager Dashboard  | `/waiter`, `/manager`                          |

---

# 10. SETUP INSTRUCTIONS

## Clone the Repository

```bash
git clone <repository-url>
```

## Navigate Into the Project

```bash
cd quickbite
```

## Install Dependencies

```bash
npm install
```

## Start the Development Server

```bash
npm run dev
```

The application should then be available at the local development URL provided by Vite.

---

# 11. API INFORMATION

QUICKBITE uses **TheMealDB API** to retrieve meal information.

The API provides information including:

* Meal names
* Meal images
* Categories
* Ingredients
* Cooking instructions
* Meal IDs

The application will use `fetch()` to retrieve meal information.

Example:

```javascript
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.meals);
  });
```

---

# 12. LOCAL STORAGE

Because QUICKBITE does not have a backend, important temporary application data will be stored using **localStorage**.

Possible stored data includes:

```text
cart
customer information
selected table
orders
payment status
order status
```

Example:

```javascript
localStorage.setItem(
  "orders",
  JSON.stringify(orders)
);
```

To retrieve the orders:

```javascript
const orders = JSON.parse(
  localStorage.getItem("orders")
) || [];
```

---

# 13. DEMO PAYMENT

QUICKBITE will use a **simulated payment system** for demonstration purposes.

No real money will be transferred.

Example payment methods:

```text
M-Pesa
Cash
Card
```

A successful demo payment will update:

```javascript
paymentStatus: "Paid"
```

The application will then generate an order number and display the order confirmation page.

---

# 14. ORDER MANAGEMENT FLOW

```text
Customer
   ↓
Creates Order
   ↓
Order Saved to localStorage
   ↓
Waiter Dashboard
   ↓
Pending
   ↓
Preparing
   ↓
Served
   ↓
Completed
```

The Manager Dashboard can use the same shared order data to calculate restaurant statistics.

---

# 15. CHALLENGES

Possible challenges during development include:

* Working with an external API
* Handling API loading states
* Handling API errors
* Managing shared state between components
* Keeping cart data consistent
* Managing orders using localStorage
* Synchronizing order status between dashboards
* Calculating sales statistics
* Calculating popular meals
* Implementing responsive UI
* Managing multiple team members working on the same project

---

# 16. KNOWN LIMITATIONS

Since QUICKBITE is a frontend-only project, it has some limitations:

* There is no real backend
* Orders are stored in localStorage
* Data is stored only on the current browser/device
* There is no real authentication system
* Payments are simulated
* Menu prices are prototype prices
* Multiple users cannot share real-time orders
* Waiter and manager dashboards do not use a real database
* Restaurant data is not permanently stored on a server

---

# 17. FUTURE IMPROVEMENTS

In the future, QUICKBITE could be improved by adding:

* Real backend API
* Database integration
* User authentication
* Admin authentication
* Real-time order updates
* Real payment integration
* Restaurant-specific menu items
* Restaurant-specific pricing
* Order notifications
* Email/SMS notifications
* Customer order history
* Online table reservations
* Advanced manager analytics
* Sales charts
* Inventory management
* Staff management

---

# 18. PROJECT GOAL

The main goal of **QUICKBITE** is to demonstrate how a modern React application can be used to build a complete restaurant ordering system.

The project demonstrates:

```text
React Components
       +
React Router
       +
External API
       +
Context API
       +
localStorage
       +
Form Validation
       +
Dynamic Rendering
       +
State Management
       +
Simulated Payment
       +
Restaurant Dashboards
       ↓
Complete Restaurant Ordering System
```

---

# 19. FINAL PROJECT STRUCTURE

```text
QUICKBITE
│
├── Customer Interface
│   ├── Home
│   ├── Menu
│   ├── Food Details
│   ├── Cart
│   ├── Checkout
│   ├── Payment
│   └── Order Confirmation
│
├── Waiter Interface
│   ├── Incoming Orders
│   ├── Customer Details
│   ├── Table Information
│   ├── Order Details
│   └── Order Status Management
│
├── Manager Interface
│   ├── Total Orders
│   ├── Total Sales
│   ├── Popular Meals
│   ├── Sales Summary
│   ├── Order Statistics
│   └── Restaurant Performance
│
└── Shared Application Data
    ├── Cart
    ├── Customer Information
    ├── Tables
    ├── Orders
    ├── Payment Status
    └── Order Status
```

---

