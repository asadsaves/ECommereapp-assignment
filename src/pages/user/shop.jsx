import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaFilter, FaSort, FaThLarge, FaList } from 'react-icons/fa';
import Navbar from '../../components/user/navbar/navbar';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet";

const Shop = ({ category }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Updated categories
  const categories = [
    {
      name: 'Sarees',
      img: "https://i.etsystatic.com/23250428/r/il/5bd21e/3082032032/il_1080xN.3082032032_pdx7.jpg", // Saree image URL
      description: "Traditional and elegant, find the perfect saree for every occasion."
    },
    {
      name: 'Girls Wear',
      img: "https://cf.shopee.com.my/file/e6b6d30841105bc96935c1d3db1cdf8d", // Girls Wear image URL
      description: "Fashion-forward collections for young girls, from casual to party wear."
    },
    {
      name: 'Boys Wear',
      img: "https://i.styleoholic.com/2016/06/16-striped-shorts-a-white-shirt-and-sandals.jpg", // Boys Wear image URL
      description: "Stylish and comfortable clothing for boys of all ages."
    },
    {
      name: 'Gents Wear',
      img: "https://c4.wallpaperflare.com/wallpaper/420/433/73/keanu-reeves-men-actor-john-wick-film-stills-hd-wallpaper-preview.jpg", // Gents Wear image URL
      description: "Discover smart, formal, and casual wear for modern men."
    },
    {
      name: 'Ganzy Clothes',
      img: "https://i.zoomtventertainment.com/story/Billie_Eilish.png?tr=w-600,h-450,fo-auto", // Ganzy Clothes image URL
      description: "Comfortable ganzy clothes perfect for casual or relaxed settings."
    },
    {
      name: 'Casual Wear',
      img: "https://imgk.timesnownews.com/story/77253950_105976820747040_3655116824283934562_n.jpg", // Casual Wear image URL
      description: "Casual and comfortable clothing for a laid-back, stylish look."
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommerse-assingment-backend.onrender.com/get-product');
        const data = await response.json();
        console.log(data.products);
        if (data.success) {
          const validProducts = data.products.filter(product =>
            product.name &&
            product.price &&
            product.img &&
            product.category &&
            product._id &&
            (product.visibility === ("on") || product.visibility === "true")
          );
          console.log(validProducts);
          setProducts(validProducts);
          setFilteredProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    setLoadMore(6);
  };

  const sortProducts = (sortBy) => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.split('₹')[2]?.trim() || 0);
          const priceB = parseFloat(b.price.split('₹')[2]?.trim() || 0);
          return priceA - priceB;
        });
        break;
      case 'popularity':
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleLoadMore = () => {
    setLoadMore(prevLoadMore => prevLoadMore + 6);
  };

  const handleShowLess = () => {
    setLoadMore(prevLoadMore => prevLoadMore - 6);
  };

  const addPostToRecentlyViewed = (productId) => {
    var existingEntries = JSON.parse(localStorage.getItem("recently") || '[]');
    if (!existingEntries.includes(productId)) {
      if (existingEntries.length >= 4) {
        existingEntries.shift();
      }
      existingEntries.push(productId);
      localStorage.setItem("recently", JSON.stringify(existingEntries));
    } else {
      console.log(productId + ' already exists');
    }
  }

  return (
    <>
      <Helmet>
        <title>Shop | SaiFashionZone</title> {/* Updated title */}
      </Helmet>
      <div className="bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen">
        <Navbar />

        {/* Hero Section with Refined Design */}
        <section 
          className="relative bg-cover bg-center py-20 text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('src/assets/bg shop.png')",
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-purple-800 mb-4 tracking-tight">Discover Our Curated Collections</h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover our exclusive collections tailored just for you, with carefully curated products that speak to your style and personality.
            </p>
          </div>
        </section>

        {/* Categories Section with Hover Effects */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-3xl font-bold mb-8 text-purple-900 text-center">Explore Our Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 
                  hover:scale-105 hover:shadow-2xl cursor-pointer 
                  ${selectedCategory === category.name ? 'border-4 border-purple-500' : ''}`}
                onClick={() => filterProducts(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="h-56 bg-cover bg-center transition-transform duration-300 transform hover:scale-110"
                  style={{ backgroundImage: `url('${category.img}')` }}
                />
                <div className="p-5 text-center">
                  <h4 className="text-2xl font-bold text-purple-800 mb-2">{category.name}</h4>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Refined Filtering and Sorting Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
              >
                <FaFilter className="mr-2" /> Filters
              </button>
              <button 
                className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
                onClick={() => filterProducts('all')}
              >
                All Products
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaSort className="mr-2 text-purple-800" />
                <select 
                  className="border-purple-300 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                  onChange={(e) => sortProducts(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="price">Price</option>
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg mb-6 space-y-4"
              >
                <h4 className="text-xl font-semibold text-purple-800">Filter by Category</h4>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => filterProducts(category.name)}
                      className={`w-full text-left py-2 px-4 rounded-lg ${selectedCategory === category.name ? 'bg-purple-200 text-purple-800' : 'hover:bg-purple-50 text-purple-600'} transition`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Grid Section */}
        <div className={`max-w-7xl mx-auto px-6 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' : 'space-y-6'}`}>
          {filteredProducts.slice(0, loadMore).map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link to={`/product/${product._id}`} onClick={() => addPostToRecentlyViewed(product._id)}>
                <img src={product.img} alt={product.name} className="h-64 w-full object-cover" />
                <div className="p-4">
                  <h5 className="text-xl font-semibold text-purple-800 truncate">{product.name}</h5>
                  <p className="text-lg text-purple-700 mt-2">{product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          {filteredProducts.length > loadMore && (
            <button 
              onClick={handleLoadMore} 
              className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
            >
              Load More
            </button>
          )}
          {loadMore > 6 && (
            <button 
              onClick={handleShowLess} 
              className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition ml-4"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
