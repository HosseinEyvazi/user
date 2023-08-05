import React, { useState, useEffect } from "react";

function ImageUploader({ onImageChange }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      convertToBase64(file).then((resp)=>(onImageChange(resp))) // function of father comp
      console.log("base ImageUploader comp"+convertToBase64(file));
    }
  };

  useEffect(() => {
    // Clean up the temporary URL when the component unmounts
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedImage));
      }
    };
  }, [selectedImage]);

  return (
    <div className="my-6 flex flex-col content-center items-center">
      <label
        className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  hover:cursor-pointer"
        htmlFor="fileInput"
      >
        عکس
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {selectedImage && (
        <div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            width={100}
            height={100}
            className="rounded mt-5 border-blue-500 border-2"
          />
        </div>
      )}
    </div>
  );
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export default ImageUploader;
