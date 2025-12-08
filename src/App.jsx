import Products from "./components/Products";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { StoreProvider } from "./context/StoreContext";

function App() {
  return (
    <StoreProvider>
      <div className="pa4">
        <h1 className="tc">Fullstack Prints</h1>

        <div className="flex flex-row">
          <div className="w-50 pa3">
            <Products />
          </div>

          <div className="w-50 pa3">
            <Cart />
            <Orders />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
