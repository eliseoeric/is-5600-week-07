import React from "react";
import Card from "./Card";

const CardList = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div style={{ padding: 20 }}>No products available</div>;
  }

  return (
    <div className="center mw9 pa3">
      <div className="cf">
        {data.map((item, idx) => {
          // Normalized props passed to Card
          const props = {
            id: item.id,               // unsplash style
            _id: item._id,             // local products.json style
            description: item.description ?? item.alt_description ?? item.title,
            alt_description: item.alt_description,
            urls: item.urls,
            imgThumb: item.imgThumb || item.thumb,
            user: item.user,
            userName: item.userName || item.user?.name,
            likes: item.likes || item.photo_likes || 0,
            price: item.price // optional - may be undefined
          };

          const key = item.id || item._id || item.link || item.img || `idx-${idx}`;

          return <Card key={key} {...props} />;
        })}
      </div>
    </div>
  );
};

export default CardList;
