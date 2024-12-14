import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

import Navbar from "../../components/user/navbar/navbar";
import Footer from "../../components/user/footer/footer";

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      style={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 origin-left z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
};

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-cubic",
      once: true,
    });
  }, []);

  const productCategories = [
    {
      img: "https://i.etsystatic.com/23250428/r/il/5bd21e/3082032032/il_1080xN.3082032032_pdx7.jpg",
      title: "Sarees",
      description: "Elegant sarees in a variety of colors and designs for every occasion.",
      category: "Sarees"
    },
    {
      img: "https://i.pinimg.com/originals/a6/68/62/a6686287f735c366f66f0285fe6f24ff.jpg",
      title: "Girls' Wear",
      description: "Trendy and comfortable girls' clothing for every young fashionista.",
      category: "Girls' Wear"
    },
    {
      img: "https://c4.wallpaperflare.com/wallpaper/420/433/73/keanu-reeves-men-actor-john-wick-film-stills-hd-wallpaper-preview.jpg",
      title: "Mens' Wear",
      description: "Discover smart, formal, and casual wear for modern men.",
      category: "Mens' Wear"
    },
    {
      img: "https://img.freepik.com/premium-photo/boy-elegant-indian-outfit_878783-18054.jpg",
      title: "Boys' Wear",
      description: "Stylish and durable boys' clothing for everyday wear.",
      category: "Boys' Wear"
    },
    {
      img: "https://i.zoomtventertainment.com/story/Billie_Eilish.png?tr=w-600,h-450,fo-auto", 
      title: "Ganzy Clothes",
      description: "Comfortable ganzy clothes perfect for casual or relaxed settings.",
      category: "Ganzy Clothes"
    },
    {
      img: "https://imgk.timesnownews.com/story/77253950_105976820747040_3655116824283934562_n.jpg",
      title: "Casual Wear",
      description: "Casual and comfortable clothing for a laid-back, stylish look.",
      category: "Casual Wear"
    }
  ];

  return (
    <>
      <Helmet>
        <title>SaiFashionZone by Raiba | Trendy Clothing for Everyone</title>
        <meta name="description" content="Explore our stylish collection of sarees, girls' wear, boys' wear, and ganzy clothes." />
      </Helmet>
      <ScrollProgress />
      <Navbar />
      <div className="w-full bg-white overflow-hidden">
        {/* Hero Section with Modern Glassmorphism Design */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              src="https://onedesblog.com/wp-content/uploads/2021/07/sunset-pastel-sky-minimalist-wallpaper.jpg"
              alt="Fashion Background"
              className="w-full h-full object-cover filter brightness-50"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="relative z-10 container mx-auto max-w-4xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="bg-white/20 backdrop-blur-md border border-white/30 p-12 md:p-16 rounded-3xl shadow-2xl text-center">
              <h1 className="mb-6 text-5xl md:text-6xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 text-transparent">
                SaiFashionZone by Raiba
              </h1>
              <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
                Discover the latest trends in clothing, from sarees to stylish wear for everyone.
              </p>
              <div className="space-x-4 flex justify-center">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-10 py-3 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                  >
                    Explore Our Story
                  </motion.button>
                </Link>
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 px-10 py-3 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Product Categories Section */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Our Collections
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover our handpicked categories designed to elevate your style
              </p>
            </motion.div>

            <motion.div
              className="grid gap-10 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { 
                    delayChildren: 0.3, 
                    staggerChildren: 0.2 
                  }
                }
              }}
            >
              {productCategories.map((category, index) => (
                <Link to='/shop' key={index}>
                  <motion.div
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-4"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <div className="relative w-full h-[300px]">  {/* Fixed height */}
                      <img
                        src={category.img}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
<section className="relative min-h-[400px] bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 py-20">
  <div className="container mx-auto text-center">
    <motion.h3
      className="text-3xl md:text-4xl font-semibold mb-6 leading-tight text-purple-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Our Vision for Your Style Journey
    </motion.h3>
    <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-600">
      We aim to provide timeless, comfortable, and stylish clothing, bringing confidence and elegance to every individual.
    </p>
    <Link to="/shop">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-transparent border-2 border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white px-8 py-3 rounded-full uppercase text-sm font-semibold transition-all"
      >
        Shop Now
      </motion.button>
    </Link>
  </div>
</section>


      </div>
      <Footer />
    </>
  );
};

export default HomePage;
