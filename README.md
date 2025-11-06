# React Food Order App

A modern React application for browsing meals, managing a shopping cart, and completing checkout with smooth interactions and dynamic state updates. The app provides a clean interface for exploring available meals and submitting orders efficiently.  

---

## Features

- Browse meals with detailed descriptions and prices  
- Add, remove, and clear items from the shopping cart  
- Multi-step checkout form for submitting customer information  
- Global state management for cart and user progress  
- Error handling for failed requests  
- Responsive and clean UI for mobile and desktop  

---

## Tech Stack

- React (Vite)  
- Context API & useReducer  
- Custom Hooks for HTTP requests  
- CSS Modules  

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
## How It Works

The Meals Page fetches meal data using a custom HTTP hook and displays them as interactive meal items.

The Cart allows users to add/remove meals and shows a live total price.

The Checkout Page collects customer information and sends order data to the backend.

Global state is handled with Context API and useReducer, managing cart items and user progress efficiently.

Error messages and loading states are displayed dynamically to guide the user.
