import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";

import "./List.css";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(url + "/api/food/list");

    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Error getting list");
    }
  };

  const removeFood = async (foodId) => {
    const res = await axios.post(url + "/api/food/remove", { id: foodId });
    await fetchList();

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("Error deleting food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <p className="list-h1">All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <X size={17} onClick={() => removeFood(item._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
