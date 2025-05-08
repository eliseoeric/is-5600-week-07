import { BASE_URL } from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  /**
   * TODO
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = () => {
    fetch(`${BASE_URL}/orders`)
    .then((res) => res.json())
    .then((data) => {
      setOrders(data);
    })
  }

  return (
    <div className="center mw7 ba mv4">
