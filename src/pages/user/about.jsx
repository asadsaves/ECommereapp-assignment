import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/user/navbar/navbar";
import { Helmet } from "react-helmet";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,  // Animations only happen once
      offset: 50   // Trigger animations slightly earlier
    });
  }, []);

  const SectionCard = ({ title, children, className = "", dataAos = "" }) => (
    <div
      data-aos={dataAos}
      className={`bg-white rounded-3xl p-8 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl shadow-lg ${className}`}
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #e0c9ff 100%)",
      }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-purple-300 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>About Us | SaiFashionZone by Raiba</title>
        <meta name="description" content="Discover SaiFashionZone by Raiba, your one-stop online destination for a variety of stylish clothing, including sarees, girls' wear, boys' wear, and more." />
      </Helmet>
      <Navbar />    
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                About SaiFashionZone
              </span>
              <span className="text-gray-800 block text-3xl mt-2">Elegance Meets Comfort</span>
            </h1>
          </div>

          {/* About Sections */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* About Our Company Section */}
            <SectionCard 
              title="About Our Company" 
              dataAos="fade-right"
            >
              <p className="text-gray-600 mb-4 leading-relaxed">
                SaiFashionZone by Raiba is an online fashion destination offering a wide range of high-quality clothing for all occasions. We specialize in sarees, girls' wear, boys' wear, and ganzy clothes, combining elegance with comfort.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to provide affordable yet stylish fashion, ensuring that every individual feels confident and comfortable in their clothing.
              </p>
            </SectionCard>

            {/* Why Choose Us Section */}
            <SectionCard 
              title="Why Choose Us?" 
              dataAos="fade-left"
            >
              <p className="text-gray-600 mb-4 leading-relaxed">
                We offer a wide variety of carefully curated products that cater to all fashion preferences. Our clothing line is designed to combine traditional elegance with contemporary trends, ensuring something for everyone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At SaiFashionZone, we prioritize customer satisfaction, offering a seamless shopping experience, quality assurance, and hassle-free returns.
              </p>
            </SectionCard>

            {/* Objectives Section */}
            <SectionCard 
              title="Objectives" 
              dataAos="fade-right"
              className="lg:col-span-2"
            >
              <ul className="text-gray-600 leading-relaxed list-disc list-inside space-y-2">
                <li>Offer a diverse range of trendy clothing that suits every style and occasion</li>
                <li>Maintain a focus on customer satisfaction with high-quality products</li>
                <li>Ensure affordable fashion without compromising on quality</li>
                <li>Create a user-friendly and engaging shopping experience</li>
                <li>Stay at the forefront of fashion trends while respecting cultural heritage</li>
              </ul>
            </SectionCard>

            {/* Vision Section */}
            <SectionCard 
              title="Vision" 
              dataAos="fade-right"
            >
              <p className="text-gray-600 leading-relaxed">
                To be the go-to destination for stylish, comfortable, and affordable fashion, offering a blend of tradition and modernity that resonates with individuals across the globe.
              </p>
            </SectionCard>

            {/* Mission Section */}
            <SectionCard 
              title="Mission" 
              dataAos="fade-left"
            >
              <p className="text-gray-600 leading-relaxed">
                Our mission is to create a fashion-forward, customer-centric shopping experience that empowers individuals to embrace their personal style confidently. We aim to continuously innovate and offer high-quality clothing that brings joy to every wardrobe.
              </p>
            </SectionCard>
          </div>

          {/* Image Section */}
          <div className="mt-16 text-center">
            <img
              src="https://s3.amazonaws.com/www-inside-design/uploads/2019/07/minimalfacebook.jpg" 
              alt="Fashion Collection"
              className="rounded-2xl shadow-2xl mx-auto max-w-4xl h-auto transform transition duration-500 hover:scale-[1.01]"
            />
          </div>

          {/* Footer Text */}
          <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Join the SaiFashionZone Experience
              </span>
              <span className="text-gray-800 block text-2xl mt-2">Where Style Meets Comfort</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At SaiFashionZone by Raiba, every purchase brings you closer to the fashion of your dreams. Let us help you find the perfect outfit for any occasion.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
