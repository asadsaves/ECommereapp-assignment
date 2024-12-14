import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, ShoppingCart, CreditCard, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Helmet } from "react-helmet";
import Navbar from '../../components/user/navbar/navbar';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const total = parseFloat(location.state?.total || 0);
  const discount = parseFloat(location.state?.discount || 0);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedAddress = localStorage.getItem('savedShippingAddress');
    const savedSaveAddressPreference = localStorage.getItem('saveAddressPreference');

    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setAddress(parsedAddress);
      } catch (error) {
        console.error('Error parsing saved address:', error);
      }
    }

    if (savedSaveAddressPreference) {
      setSaveAddress(JSON.parse(savedSaveAddressPreference));
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const cartResponse = await fetch(`https://ecommerse-assingment-backend.onrender.com/cart/${userId}`);
      const cartData = await cartResponse.json();

      if (!cartData.success) {
        setLoading(false);
        return;
      }

      const groupedItems = cartData.cart.reduce((acc, item) => {
        if (!acc[item.productId]) {
          acc[item.productId] = {
            productId: item.productId,
            productQty: item.productQty
          };
        } else {
          acc[item.productId].productQty += item.productQty;
        }
        return acc;
      }, {});

      const productPromises = Object.values(groupedItems).map(async (item) => {
        const productResponse = await fetch(`https://ecommerse-assingment-backend.onrender.com/product/${item.productId}`);
        const productData = await productResponse.json();

        if (productData.success) {
          return {
            ...productData.product,
            quantity: item.productQty
          };
        }
        return null;
      });

      const products = await Promise.all(productPromises);
      setCartItems(products.filter(product => product !== null));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = {
      ...address,
      [name]: value
    };

    setAddress(updatedAddress);

    if (saveAddress) {
      localStorage.setItem('savedShippingAddress', JSON.stringify(updatedAddress));
    }
  };

  const handleSaveAddressToggle = (e) => {
    const isChecked = e.target.checked;
    setSaveAddress(isChecked);

    // Save address preference
    localStorage.setItem('saveAddressPreference', JSON.stringify(isChecked));

    if (isChecked) {
      // Save current address to localStorage
      localStorage.setItem('savedShippingAddress', JSON.stringify(address));
    } else {
      // Remove saved address from localStorage
      localStorage.removeItem('savedShippingAddress');
    }
  };

  const isAddressValid = () => {
    return Object.values(address).every(value => value.trim() !== '');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * (discount / 100)).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!isAddressValid()) {
      setErrorMessage('Please fill in all fields before placing your order.');
      return;
    }

    setOrderLoading(true);
    const userId = sessionStorage.getItem('userId');

    if (saveAddress) {
      try {
        await fetch('https://ecommerse-assingment-backend.onrender.com/update-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            address: Object.values(address).join(', ')
          })
        });
      } catch (err) {
        console.error('Error saving address:', err);
        setOrderLoading(false);
        setErrorMessage('Failed to save address.');
        return;
      }
    }

    const now = new Date();
    const date = now.toLocaleDateString('en-GB');
    const time = now.toLocaleTimeString('en-GB');

    const productsOrdered = cartItems.map(item => ({
      productId: item._id,
      productQty: item.quantity
    }));

    try {
      const response = await fetch('https://ecommerse-assingment-backend.onrender.com/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          date,
          time,
          address: Object.values(address).join(', '),
          price: total,
          productsOrdered
        })
      });

      const data = await response.json();

      if (data.message === 'Order placed successfully') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        setShowSuccess(true);
        setTimeout(() => {
          navigate('/cart');
        }, 5000);
      } else {
        setErrorMessage('Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setErrorMessage('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Checkout | SaiFashionZone</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Address Section */}
          <div className="md:w-2/3 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6 space-x-4">
              <MapPin className="text-pink-600 w-8 h-8" />
              <h2 className="text-3xl font-bold text-gray-800">Shipping Details</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pin Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={handleSaveAddressToggle}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Save address for future orders</span>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6 space-x-4">
              <ShoppingCart className="text-pink-600 w-8 h-8" />
              <h2 className="text-3xl font-bold text-gray-800">Order Summary</h2>
            </div>

            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between">
                  <div className="text-gray-700">{item.name}</div>
                  <div className="text-gray-500">{item.quantity} x ₹{item.price}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <div className="font-semibold">Subtotal:</div>
              <div className="text-gray-700">₹{calculateSubtotal().toFixed(2)}</div>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="font-semibold">Discount:</div>
              <div className="text-gray-700">-₹{calculateDiscountAmount()}</div>
            </div>
            <div className="mt-6 flex justify-between">
              <div className="font-semibold">Total:</div>
              <div className="text-gray-700">₹{total}</div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="mt-4 text-red-500">{errorMessage}</div>
            )}

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={orderLoading || !isAddressValid()}
              className={`w-full mt-6 py-3 text-white font-semibold rounded-lg ${orderLoading || !isAddressValid() ? 'bg-gray-500 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'}`}
            >
              {orderLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="text-2xl font-semibold text-center text-gray-800 mt-4">Order Placed Successfully!</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
