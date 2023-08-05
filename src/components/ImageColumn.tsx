import React, { useState } from "react";
import exampleImage from "../assets/images/Blue_4.png";

const ImageColumnLayout: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    setImages([...images, exampleImage]);
  };

  return (
    <div>
      <div>
        <button onClick={handleAddImage}>Add Example Image</button>
      </div>
      <div style={{ display: "flex" }}>
        {images.map((imageUrl, index) => (
          <div key={index} style={{ flex: 1, margin: "5px" }}>
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: "100%", height: "250px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageColumnLayout;
