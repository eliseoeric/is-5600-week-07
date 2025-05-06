import { AppProvider } from './AppContext';
import ProductList from './ProductList';
import Cart from './Cart';
import Orders from './Orders';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <ProductList />
        <Cart />
        <Orders />
      </div>
    </AppProvider>
  );
}

export default App;