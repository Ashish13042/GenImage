import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage, user, credit } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 🧠 Check for empty prompt
    if (!input.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }

    // ✅ Check for user before calling generateImage
    if (!user || !user._id) {
      toast.error("Please sign in to generate an image!");
      return;
    }

    //Check if credits are 0 redirect user to buyCredits
    if (credit <= 0) {
      toast.error("No Credits Left! ");
      navigate("/buy");
      return;
    }


    setLoading(true);

    const imageResult = await generateImage(input);

    if (imageResult) {
      setIsImageLoaded(true);
      setImage(imageResult);
    } else {
      toast.error("Failed to generate image.");
    }

    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img src={image} alt="Generated" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        <p className={!loading ? "hidden" : ""}>Loading.....</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter prompt to Generate Images"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            Generate
            <img src={assets.star_group} alt="" className="h-6" />
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            Generate Another Image
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
