import { useContext } from "react";
import { Minus, Plus } from "lucide-react";

import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          className="food-item-image"
          alt={name}
        />
        {!cartItems[id] ? (
          <Plus onClick={() => addToCart(id)} className="add" size={24} />
        ) : (
          <div className="food-item-counter">
            <Minus onClick={() => removeFromCart(id)} color="red" size={18} />
            <p>{cartItems[id]}</p>
            <Plus onClick={() => addToCart(id)} color="green" size={18} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="foor-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
