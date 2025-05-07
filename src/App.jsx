@@ -5,19 +5,22 @@ import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';
import {CartProvider} from './state/CartProvider';
import Cart from './components/Cart';


function App() {

  return (
    <div className="App">
      <CartProvider>
      <Header />

        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />}/>
        </Routes>

      </CartProvider>
    </div>
  );
}