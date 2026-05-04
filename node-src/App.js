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