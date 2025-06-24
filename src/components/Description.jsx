import React from "react";
import { assets } from "../assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center jsutify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Bring your thoughts to life.</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center"> 
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">Introducing the AI-Powered Text to Image Generator</h2>
          <p className="text-gray-600 mb-4">
            Effortlessly turn your concepts into reality using our complimentary
            AI image generator. Whether you're looking for impressive visuals or
            distinctive imagery, our tool converts your written descriptions
            into captivating images in just a few clicks. Envision it,
            articulate it, and see it materialize right before your eyes.
          </p>
          <p className="text-gray-600">
            Just enter a text prompt, and our state-of-the-art AI will produce
            stunning images within moments. Whether you need product visuals,
            character designs, or portraits, even ideas that haven't been
            created yet can be easily visualized. Driven by sophisticated AI
            technology, the creative opportunities are endless!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
