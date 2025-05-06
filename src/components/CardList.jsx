import Card from "./Card";

const CardList = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CardList;
