const express = require('express');
const app = express();
const port = 3090;

app.get('/products', (_req, res) => {
  res.json([
    { _id:"1", title:"Sample Print",  description:"Test",                    price:19.99, image:"https://picsum.photos/300?1" },
    { _id:"2", title:"Ocean Canvas",  description:"Beautiful ocean view",    price:29.99, image:"https://picsum.photos/300?2" },
    { _id:"3", title:"Mountain Art",  description:"Peaceful mountain scene", price:34.99, image:"https://picsum.photos/300?3" }
  ]);
});

app.listen(port, '0.0.0.0', () => console.log(`Mini API http://127.0.0.1:${port}`));
