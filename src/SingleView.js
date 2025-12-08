// SingleView.js
export default function SingleView() {

  // Define the state object for product data
  const [ product, setProduct ] = useState(null)

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