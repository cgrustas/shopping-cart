# Shopping Cart

An e-commerce shopping cart application with React, built as part of [The Odin Project](https://www.theodinproject.com/) curriculum. This project ties together React Router, data fetching, testing, and CSS Modules.

## Project Overview

This is a basic e-commerce site that fetches products from the FakeStore API. Users can browse products, add them to a cart with custom quantities, and manage their cart items. The app has three pages: Home, Shop, and Cart.

## Skills Demonstrated

This project was my first real dive into the following concepts:

### React Router

- SPAs with client-side routing (no more page refreshes!)
- Using nested routes and the `<Outlet />` component
- Passing data down through outlet context
- Adding an error page for invalid routes

### Testing

- Working with React Testing Library
- Writing integration tests instead of unit tests (testing user behavior, not implementation)
- Mocking API (I/O) calls in tests
- Creating helper functions to reduce test duplication

### State Management

- Lifting cart state up to the App component
- Managing cart data separately from product data, and joining as needed

### Data Fetching

- Using a custom hook (`useProducts`)
- Handling loading and error states with React

### CSS Modules

- Keeping styles scoped to components
- Using CSS custom properties for shared values
