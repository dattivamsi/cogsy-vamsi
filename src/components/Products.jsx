// import React, { useContext, useEffect, useState } from "react";
// import { ContextDetails } from "../App";
// import { Button, Pagination } from "antd";
// import { useNavigate } from "react-router-dom";

// function Products() {
//   const { products, setProducts, cartItems, setCartItems } =
//     useContext(ContextDetails);
//     const history = useNavigate()
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [searchInput,setSearchInput] = useState("")
//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products`)
//       .then((res) => res.json())
//       .then((data) => {
//         const newData = data?.map((ele) => ({ ...ele, itemCount: 20 }));
//         setProducts(newData);
//         setTotalItems(data.length);
//       });
//   }, []);

//   const onPageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const displayProducts = products.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlebuy = (data) => {
//     const updatedProducts = products?.map((item) => {
//       if (item.id === data.id && item.itemCount > 0) {
//         return {
//           ...item,
//           itemCount: item?.itemCount - 1,
//           cartCount: 1,
//         };
//       }
//       return item;
//     });

//     console.log(updatedProducts);
//     const findcartDetails = cartItems.some((ele) => ele?.id === data?.id);
//     if (findcartDetails) {
//       const updatedCartItems = cartItems.map((item) =>
//         item.id === data.id ? { ...item, cartCount: item.cartCount + 1 } : item
//       );
//       setCartItems(updatedCartItems);
//     } else {
//       const datadetails = cartItems;

//       datadetails.push({ ...data, cartCount: 1 });

//       // console.log(datadetails);

//       // setCartItems((cartProduct) =>
//       //   cartProduct.map((ele) => ({ ...ele, cartCount: 1 }))
//       // );

//       setCartItems(datadetails);
//     }
//     setProducts(updatedProducts);
//   };

//   const handleChange = (e) =>{
//     setSearchInput(e.target.value)
//     const value = e.target.value.toLowerCase();
//     let product = products
//     const filteredData = product.filter((ele) =>
//       ele?.title?.toLowerCase().includes(value)
//     );
//     setProducts(filteredData)
//     setTotalItems(filteredData.length);
//     setCurrentPage(1);
//   }

//   // console.log(searchInput);

//   return (
//     <div className="products">
//       <div>
//         <button>Add New Items</button>
//       </div>
//       <div className="filters-container">
//         <div>Filters</div>
//         <div>
//           <div>
//             <label>Search Items:</label>
//           </div>
//           <input placeholder="Search Items" className="search-input" onChange={(e)=>handleChange(e)}/>
//         </div>
//       </div>
//       <div className="all-products">
//         {displayProducts.map((product) => (
//           <div key={product.id} className="card">
//             <h3>{product?.title}</h3>
//             <img
//               src={product.image}
//               alt={product.title}
//               className="product-images"
//             />

//             <p>{`$ ${product?.price}`}</p>
//             {/* <button onClick={() => handlebuy(product)}>BuyNow</button> */}
//             {product?.cartCount > 0 ? (
//               <Button
//                 disabled={product?.itemCount <= 0}

//                 onClick={() => history("/cart")}
//               >
//                 Add To Cart
//               </Button>
//             ) : (
//               <Button
//                 disabled={product?.itemCount <= 0}
//                 onClick={() => handlebuy(product)}
//               >
//                 Buy
//               </Button>
//             )}

//             <p>{`${product?.itemCount} availabe`}</p>
//           </div>
//         ))}
//       </div>
//       <div style={{ float: "right", marginTop: "20px" }}>
//         <Pagination
//           current={currentPage}
//           onChange={onPageChange}
//           total={totalItems}
//           pageSize={itemsPerPage}
//           showSizeChanger={false}
//         />
//       </div>
//     </div>
//   );
// }

// export default Products;

import React, { useContext, useEffect, useState } from "react";
import { ContextDetails } from "../App";
import { Button, Modal, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/skeleton/Title";
import { NewItem } from "./NewItem";

function Products() {
  const { products, setProducts, cartItems, setCartItems } =
    useContext(ContextDetails);
  const history = useNavigate();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        const newData = data?.map((ele) => ({ ...ele, itemCount: 20 }));
        setProducts(newData);
        setFilteredProducts(newData);
        setTotalItems(newData.length);
      });
  }, [setProducts]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const displayProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(products);

  const handleBuy = (data) => {
    const updatedProducts = products?.map((item) => {
      if (item.id === data.id && item.itemCount > 0) {
        return {
          ...item,
          itemCount: item?.itemCount - 1,
          cartCount: 1,
        };
      }
      return item;
    });

    const findCartDetails = cartItems.some((ele) => ele?.id === data?.id);
    if (findCartDetails) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === data.id ? { ...item, cartCount: item.cartCount + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...data, cartCount: 1 }]);
    }
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    const value = e.target.value.toLowerCase();
    const filteredData = products.filter((ele) =>
      ele?.title?.toLowerCase().includes(value)
    );
    setFilteredProducts(filteredData);
    setTotalItems(filteredData.length);
    setCurrentPage(1);
  };

  const handleCancel = () =>{
    setAddModalVisible(false)
  }



  return (
    <>
    {addModalVisible && (
        <Modal
        title={
          <Title level={4}>
            {"new_report"} &nbsp;
            <span className="text-small">{"enter_and_save"}</span>
          </Title>
        }
        open={addModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="right-alinged-modal"
      >
        <NewItem
          handleCancel={handleCancel}
        />
      </Modal>
      )}
    <div className="products">
      <div style={{ float: "right" }} className="add-new">
        <button onClick={()=>setAddModalVisible(!addModalVisible)}>Add New Items</button>
      </div>
      <div className="filters-container">
        <div>Filters</div>
        <div>
          <div>
            <label>Search Items:</label>
          </div>
          <input
            placeholder="Search Items"
            className="search-input"
            value={searchInput}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="all-products">
        {displayProducts.map((product) => (
          <div key={product.id} className="card">
            <h3>{product?.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              className="product-images"
            />
            <p>{`$ ${product?.price}`}</p>
            {/* <Button
              disabled={product?.itemCount <= 0}
              onClick={() => handleBuy(product)}
            >
              {product?.cartCount > 0 ? "Add To Cart" : "Buy"}
            </Button> */}
            {product?.cartCount > 0 ? (
              <Button
                disabled={product?.itemCount <= 0}
                onClick={() => history("/cart")}
              >
                Add To Cart
              </Button>
            ) : (
              <Button
                disabled={product?.itemCount <= 0}
                onClick={() => handleBuy(product)}
              >
                Buy
              </Button>
            )}
            <p>{`${product?.itemCount} available`}</p>
          </div>
        ))}
      </div>
      <div style={{ float: "right", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          onChange={onPageChange}
          total={totalItems}
          pageSize={itemsPerPage}
          showSizeChanger={false}
        />
      </div>
    </div>
    </>
  );
}

export default Products;
