import React from "react";
import { Link } from "react-router-dom";
import CartItems from "../../components/user/cart/Cartitems";
import RecentlyViewed from "../../components/user/cart/recentlyviewed";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/user/navbar/navbar";
import { Helmet } from "react-helmet";

const ShoppingCartPage = () => {
  return (
    <div className="bg-pink-50 min-h-screen">
      <Helmet>
        <title>Shopping Cart | SaiFashionZone</title>
      </Helmet>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <Link 
              to="/shop" 
              className="flex items-center space-x-2 text-pink-600 hover:text-pink-800 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CartItems /> {/* You can add logic to show an empty cart message here if needed */}
        </div>

        {/* Recently Viewed Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recently Viewed</h2>
          <RecentlyViewed />
        </div>

        {/* Checkout Section */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mt-6">
          <div className="text-lg font-semibold text-gray-800">Total: $200.00</div>
          <Link 
            to="/checkout" 
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-800 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
