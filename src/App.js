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