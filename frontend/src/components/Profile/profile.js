import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

import "../../assets/styles/Profile.css";



axios.defaults.withCredentials = true;

const Profile = () => {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8090/User/profile", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const sendProductRequest = async (sellerId) => {
    const res = await axios
      .get(`http://localhost:8070/products/${sellerId}/products`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      sendProductRequest(data.user._id).then((data) => setProducts(data));
    });
  }, []);

  const handleDelete = (product_id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this Product?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Product is deleted", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });

        axios.delete(
          `http://localhost:8070/products/deleteProduct/${product_id}`
        );

        console.log(product_id);

        const newProductlist = products.filter(
          (product) => product._id !== product_id
        );

        setProducts(newProductlist);
      } else {
        swal({
          text: "Your Products is saved!",
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      {user && (
        <div>
          <h1>Name:{user.name}</h1>
          <h1>Mobile:{user.mobile}</h1>
          <h1>EMAIL:{user.email}</h1>
          <h1>Address:{user.address}</h1>
          <h1>I am a {user.role}</h1>
        </div>
      )}
      <br />

      <button className="btn btn-primary p-1 me-2">ADD PRODUCT</button>
      <h2>
        <center>MY PRODUCTS</center>
      </h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>
              <center>ID</center>
            </th>
            <th>
              <center>Name</center>
            </th>
            <th>
              <center>Brand</center>
            </th>
            <th>
              <center>Price</center>
            </th>
            <th>
              <center>Description</center>
            </th>
            <th>
              <center>weight</center>
            </th>
            <th>
              <center>Actions</center>
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 && (
            <>
              {products.map((myProduct) => (
                <tr key={myProduct._id}>
                  <td>
                    <center>{myProduct._id}</center>
                  </td>
                  <td>
                    <center>{myProduct.name}</center>
                  </td>
                  <td>
                    <center>{myProduct.brand}</center>
                  </td>
                  <td>
                    <center>{myProduct.price}</center>
                  </td>
                  <td>
                    <center>{myProduct.description}</center>
                  </td>
                  <td>
                    <center>{myProduct.weight}</center>
                  </td>
                  <th>
                    <center>
                      <button className="btn btn-info p-1 me-2">Update</button>
                      <button
                        className="btn btn-danger p-1 me-2"
                        onClick={() => handleDelete(myProduct._id)}
                      >
                        Delete
                      </button>
                    </center>
                  </th>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
