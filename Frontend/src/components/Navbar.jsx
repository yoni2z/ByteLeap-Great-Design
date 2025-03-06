import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For the hamburger menu
import logo from "../assets/greatdesigns.png"; // Import logo image
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const navigate = useNavigate();

  const handleNavigateToAboutUs = () => {
    navigate("/#about-us"); // Navigate to the Home page and add the hash to scroll to the section
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("about-us").offsetTop,
        behavior: "smooth",
      });
    }, 100); // Delay to allow the page to load before scrolling
  };

  const handleNavigateToFooter = () => {
    navigate("/#about-us"); // Navigate to the Home page and add the hash to scroll to the section
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("footer").offsetTop,
        behavior: "smooth",
      });
    }, 100); // Delay to allow the page to load before scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="bg-transparent p-4 fixed w-full top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo with Image */}
        <div className="text-white text-2xl font-bold flex items-center space-x-3">
          <Link to="/">
            <img
              src={logo}
              alt="Brand Logo"
              className="transition-transform transform hover:scale-110 duration-300 ease-in-out"
              style={{ width: "150px", height: "100px", objectFit: "cover" }}
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            Products
          </Link>
          <Link
            to="#about-us"
            onClick={handleNavigateToAboutUs}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="#footer"
            onClick={handleNavigateToFooter}
            className={`text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300 ${
              isScrolled ? "bg-[#3d6c26] px-3 py-2 rounded" : ""
            }`}
          >
            Contact
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={handleMenuToggle}
            className="text-white text-3xl hover:text-[#F5F6F8] transition-all duration-300"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-[#6a4d1a] p-4 space-y-4 text-center transition-all duration-300 ease-in-out`}
      >
        <Link
          to="/"
          className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Products
        </Link>
        <Link
          to="#about-us"
          className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          to="#contact"
          className="text-white hover:text-[#F5F6F8] hover:underline transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
