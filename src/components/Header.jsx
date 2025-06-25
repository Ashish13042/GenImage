import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const {user, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if(user){
      navigate("/result");
    }else{
      setShowLogin(true);
    }
  }
  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
>
        <p>Write text to generate image</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1 className="text-4xl max-w-[300px] sm:text-5xl sm:max-w-[590px]  mx-auto mt-10 text-center">
        Turn text to <span className="text-blue-600"
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        >image</span>, in seconds.
      </motion.h1>
      <motion.p className="text-center max-w-xl mx-auto mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      >
        Create stunning images from your text prompts with our AI-powered tool.
        No design skills needed, just your imagination!
      </motion.p>

      <motion.button onClick={onClickHandler} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initials={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} />
      </motion.button>

      <motion.div className="flex flex-wrap justify-center items-center gap-4 mt-16"
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
            whileHover={{ scale: 1.05, duration: 0.1 }}
              className="rounded hover:scale-105 transition-all dusration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

export default Header;
