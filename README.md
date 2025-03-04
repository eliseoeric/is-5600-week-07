# Lab 07 | Fullstack Prints React Part 2

## Table of Contents

1. [Lab 07 | Fullstack Prints React Part 2](#lab-07--fullstack-prints-react-part-2)
   - [Overview](#overview)
   - [Instructions](#instructions)
2. [Guidance and Testing](#guidance-and-testing)
3. [Submission](#submission)
4. [Getting Started with GitHub and Codespaces](#getting-started-with-github-and-codespaces)
   - [Step 1: Fork the Repository](#step-1-fork-the-repository)
   - [Step 2: Open the Repository in Codespaces](#step-2-open-the-repository-in-codespaces)
   - [Step 3: Complete the Lab Assignment](#step-3-complete-the-lab-assignment)
   - [Step 4: Submit Your Work via Pull Request](#step-4-submit-your-work-via-pull-request)


## Overview

For this lab, we are going to take the existing React application that you created in the previous lab and add some additional functionality. Specifically, we are going to connect the React application to an existing Node application. The React application will fetch and store products data in the React state. The React application will also allow the user to add products to the cart. The React application will then send the cart data to the Node application to create new orders, will also be displayed in the React application.

The goal of this lab is to become familiar with how we can use state and React Context to manage data in a React application, as well as using `fetch()` and `useEffect` hooks to POST and GET data from a Node API (or any external API really).

## Instructions

1. Take a moment to review your file structure. The state of the code base should be close or mirror to where you left off in your last project. 

2. Let's begin by reviewing that our React application's `config.js` file is correctly configured to point to the Node API server. The `BASE_URL` should be set to the URL of the Node API server. This is the URL that we will use to fetch data from the server. The URL should found in your Ports tab in the GitHub codespace.

2. Let's begin by connecting our React application to the Node API server, so we can render the product data. If you examine the `App.js` file, you'll see we are importing the `productData` from disk. This is a JSON file that contains an array of products. We could replace this with a `fetch` call to the Node API server at this component level, but then we would need to pass the data down to the `CardList` component. Instead, we are going to move the `fetch` call to the `CardList` component.
3. Let's refactor the `CardList` so that we are handing the fetching of product data in the `CardList` component - we are going to update the `SingleView` component later so that we do not need to pass an entire array of products to the component. We will use the `useEffect` hook to fetch data from the server and replace the file import in the `App.js`. The `useEffect` hook is similar to a life cycle function, and will be ran when the component boots. This will allow us to fetch the data when the app starts up.

```jsx
// CardList.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';

// Remove the `data` prop - we won't use that anymore
const CardList = ({}) => {

  // ...

  // Define the state object for product data
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Use the useEffect hook to fetch the products when the component boots
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update the return method to use the `products` state object
  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );

}
```

We could have implemented this in the `App.js` component, but the render would be blank. This is because we are using `fetch` to get the data from the server, which is asynchronous. This means that the code will continue to run before the data is returned from the server. Since the initial render has zero products, because we are waiting for the `fetch` promise to be fulfilled, we would pass an empty array via props to the `CardList` component. In the `CardList` component, the `data` prop is used for the initial state for the `products` state object. This means that the `CardList` product is initially rendered with an empty array. Now, React will normally rerender components when the state changes. However, since the `products` state object is initialized with an empty array, it will never change because we are not observing the `data` prop - when the `data` prop changes, nothing happens, and no rerender is triggered. You could observe this by adding a few `console.log` statements in the `App` and `CardList` to monitor the `products` and `data` objects.

Now the products are rendering the data from the server. But we need to refactor our pagination real quick. Instead of paginating against the entire data set in React state, we are going use the Node server's pagination. We just need to update the `fetchProducts` function to include the `limit` and `offset` parameters. We already have a `limit` variable, and a `offset` state variable, so let's just use those.

```jsx
// CardList.js

  // Update fetch projects to include the limit and offset parameters
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }
  
  // Update the `useEffect` to monitor the `offset` state variable
  useEffect(() => {
   fetchProducts();
  }, [offset]);
```

By passing the `offset` variable in the `useEffect` dependency array, we are telling React to re-run the `useEffect` hook when the `offset` state variable changes. This will allow us to fetch the next page of products when the user clicks the "Next" button. Since the `handlePrevious` and `handleNext` functions are already updating the `offset` state variable, we don't need to update anything else. While we are in here, let's delete the `getPaginatedProducts` function. We won't need that anymore.
4. Next we need to take a look at the `SingleView` component. This component is currently expecting an array of products to be passed to it. We need to update this component so that it can fetch the product data from the server. First, let's remove the `data` prop from the `SingleView` component. Then, let's add a function to `fetch` the product data from the server by its `id` and configure a `useEffect` hook to monitor the `id` prop and re-render when the data is received. We will also need to add a `loading` state variable to indicate when the data is being fetched from the server. We will use this to render a loading message while the data is being fetched.

Let's start by removing the prop from the `App.js`.

```jsx
// App.js

  return (
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
        </Routes>
      
    </div>
  );
```

Now, open up the `SingleView` component and remove the `data` prop from the function signature. Then, add the `fetchProduct` function and the `useEffect` hook to fetch the product data from the server. Don't forget to update the imports, you'll need to add the `BASE_URL`, `useState` and `useEffect` imports.

```jsx
// SingleView.js
export default function SingleView() {

  // Define the state object for product data
  const [ product, setProduct ] = useState(null)
export default function SingleView() {

  // Fetch the product by id from the server
  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json());
    return product;
  };

  // Use the useEffect hook to fetch the product when the component boots
  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data)
    }
    getProduct();
  }, [id, fetchProductById]);

  // show a spinner if there is no product loaded yet
  if (!product) return (<div className="loading-spinner"></div>);

  // ...
}
```

Great - so now our application is configured to get all data from the Node Server. Now we can move on to the next step - we are going to add a cart to our application.

6. The cart should work like this: the `SingleView` will include an "Add to Cart" button. When the user clicks the button, the product should be added to the cart. We have created for you a basic cart component that will render the contents of the cart, this will need to be connected to the `/cart` route. You'll note that the "Cart" icon in the header is already showing the number of items in the cart (0), we will need to link this to the actual cart as well.

To manage the cart state, we are going to use two new concepts - `Context` and `Reducer`. Context is a way to pass data through the component tree without having to pass props down manually at every level. Reducer is a way to manage state in a more predictable way. We will be using the `useReducer` hook to manage the cart state. We want to use `Context` so that we can access the cart state from anywhere in the application. We will be using the `useContext` hook to access the cart state from the `Header` component.

So first, let's start with the cart context provider. You can read more about Context here: <https://reactjs.org/docs/context.html>. We have created a `src/state/CartProvider` file for you. This file uses the reducer pattern to manage the cart state. You can read more about reducers here: <https://reactjs.org/docs/hooks-reference.html#usereducer>. We won't dive too much into the details of how this works here (you can learn more in the walkthrough), but you can see that we are exporting a `CartProvider` component that wraps the entire application. This component is using the `useReducer` hook to manage the cart state.

In order to use the cart context, we need to wrap the entire application in the `CartProvider` component. Open up the `App.js` file and import the `CartProvider` component. Then, wrap the entire application in the `CartProvider` component.

```jsx
// App.js

 return (
    <div className="App">
      <CartProvider>
        <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
        </Routes>
      </CartProvider>
    </div>
  );
```

This will make the cart state available to any component in the application. Now, let's add the cart to the `Header` component. We will use the `useCart` hook to access the cart state from the `Header` component.

```jsx
// Header.js

// ...
import { useCart } from '../state/CartProvider';

const Header = () => {
  // Import the cart state from the CartContext
  const { cartItems } = useCart();
  // Use the reduce function to calculate the total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // ...
}
```

7. Great, now we need to create a component to for the "Add To Cart" button. Create a new file, `src/components/AddToCart.jsx`. This component will need to accept a `product` prop. It will have an `onClick` handler that will add the product to the cart.

```jsx  

export default function OrderButton({product}) {
  
  // Import the addToCart function from the CartContext
  const { addToCart } = useContext(CartContext);

  const handleClick = (product) => {
    console.log("Adding to cart", product)
    addToCart(product)
  }

  return (
    <a className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={() => handleClick(product)}>Add to Cart</a>
  )
}
```

Finally, open the `SingleView` component and import the `AddToCart` component. Replace the `TODO` comment near the bottom of the return statement with the `AddToCart` component. Pass the `product` prop to the `AddToCart` component.

Now, when we visit the `/product/:id` route, we should see the "Add to Cart" button. When we click the button, the product should be added to the cart, we should see the number of items in the cart update in the header.

Next, let's register that `/cart` route. Open the `App.js` file and add a new route for the `/cart` route. The `element` prop should be the `Cart` component.

```jsx
// App.js

return (
    <div className="App">
      <CartProvider>
        <Header />
      
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  );
```

8. If we visit the `/cart` route, we will see that not all of the data is being displayed. This is because the `Cart` component is not fully functional. One the `Cart.js` file and you'll see that it is not connected to the cart context state. Using what you've learned so far, import the `CartProvider` and `useContext` hooks, then replace the `cartItems`, `updateItemQuantity`, `getCartTotal` and `removeFromCart` with the values from the `CartContext`.

You will complete the final 3 steps independently, you can read the instructions below.

## Your Task

You will need to implement three key features to complete this lab:

1. Implement the Cart Quantity Update Feature:
   - Implement the `updateItemQuantity` function in the cart context provider
   - In the `CartProvider`, add the `UPDATE_ITEM_QUANTITY` action that takes `id` and `quantity` as payload
   - Add a new case to `cartReducer` that handles `UPDATE_ITEM_QUANTITY`
   - The key difference from `ADD_ITEM` is that this directly sets the new quantity instead of adding to it
   - Example: If current quantity is 2 and new quantity is 5, it should become 5 (not 7)

2. Implement the Cart Total Calculation:
   - Complete the `getCartTotal` function in the cart context provider
   - Use the `reduce` array method to sum up the total price of all items
   - Make sure to multiply each item's price by its quantity
   - The total should update automatically when cart items change

3. Implement the Orders Display:
   - Add the `/orders` route in `App.js` using the `Orders` component
   - Create a `fetchOrders` function that gets orders from the Node API
   - Use `useEffect` to fetch orders when the component mounts
   - Store the orders in component state using `useState`
   - Display the orders in a list format using the existing component structure

## Testing Your Implementation

To verify your implementation works correctly:

1. Cart Updates:
   - Add items to cart and try updating their quantities
   - Verify the new quantity replaces the old one
   - Check that the cart total updates correctly

2. Orders Display:
   - Create a few test orders through the cart
   - Visit the `/orders` route
   - Verify that your orders appear and display correctly

## Guidance and Testing

1. This lab will require Postman to test endpoints. You can download Postman [here](https://www.postman.com/downloads/). Refer to the previous labs for guidance on how to use Postman.

## Submission

Once you have completed the lab, please submit your lab by committing the code and creating a pull request against the `main` branch of your forked repository.

Once you have a URL for your Pull Request, submit that URL with a brief message in Canvas against the Assignment.

# Getting Started with GitHub and Codespaces

Welcome to the course! In this guide, you’ll learn how to set up your coding environment using GitHub and Codespaces. By following these steps, you’ll be able to work on your lab assignments, write and test your code, and submit your work for review. Let's get started!

## Step 1: Fork the Repository

Forking a repository means making a copy of it under your GitHub account. This allows you to make changes without affecting the original project.

1. **Open the Repository**: Start by navigating to the GitHub repository link provided by your instructor.
2. **Click "Fork"**: In the top-right corner, find the “Fork” button and click it.
3. **Select Your Account**: Choose your GitHub account as the destination for the fork. Once done, you’ll be redirected to your forked copy of the repository.

   > **Tip**: Make sure you’re logged into your GitHub account, or you won’t see the option to fork!

## Step 2: Open the Repository in Codespaces

With your forked repository ready, you can now set up a development environment using Codespaces. This setup provides a pre-configured environment for you to code in, with everything you need to complete the lab.

1. **Open the Codespaces Menu**:
   - In your forked repository, click the green "Code" button, then switch to the "Codespaces" tab.
2. **Create a Codespace**:
   - Click on "Create codespace on main" to start the setup.
3. **Wait for Codespaces to Load**:
   - It may take a few minutes for Codespaces to create and configure your environment. Be patient, as it’s setting up all the tools you’ll need.
4. **Start Coding**:
   - Once the setup is complete, Codespaces will automatically open a new browser tab where your code will be ready to run. You’ll be able to see the code and any outputs as you go through the lab assignment.

## Step 3: Complete the Lab Assignment

Inside the Codespaces environment, you’ll find all the files and instructions you need. Follow the steps outlined in the README file to complete your assignment.

1. **Read the Instructions**: Carefully go through the README file to understand the tasks you need to complete.
2. **Edit the Code**: Make the necessary changes to the code files as instructed.
3. **Run and Test Your Code**: Use the terminal and editor within Codespaces to run your code and make sure everything works as expected.

   > **Hint**: If you’re stuck, try reviewing the README file again or refer to any resources provided by your instructor.

## Step 4: Submit Your Work via Pull Request

Once you’ve completed the assignment, it’s time to submit your work. You’ll do this by creating a pull request, which is a way to propose your changes to the original repository.

1. **Commit Your Changes**:
   - Save your work by committing your changes. In Codespaces, go to the Source Control panel, write a commit message, and click "Commit" to save your changes.
2. **Push to Your Fork**:
   - After committing, click "Push" to upload your changes to your forked repository on GitHub.
3. **Create a Pull Request**:
   - Go back to your GitHub repository, and you’ll see an option to “Compare & pull request.” Click it to start your pull request.
   - Include your name in the pull request description so your instructor knows who submitted it.
4. **Submit the Pull Request**:
   - Click "Create pull request" to submit your work for review. Your instructor will be notified and can review your work.

And that’s it! You’ve now completed your first lab assignment using GitHub and Codespaces. Well done!

### Additional Steps

1. Open the terminal in Codespaces.
2. Run the following commands to install dependencies and start the development server:

    ```sh
    npm install
    npm run dev
    ```

3. You can now view the project in the browser by clicking the "Application" port in the Ports panel.

Follow the instructions in the previous sections to complete the lab.
