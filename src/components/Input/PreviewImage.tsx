import React, { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaFileImage } from "react-icons/fa"; // Import the icon from react-icons library

interface Props {
  register: UseFormRegisterReturn;
  disable?: boolean;
}

const PreviewImage = ({ register, disable = false }: Props) => {
  const [url, setUrl] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        {...register}
        type="file"
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input
      />
      {url ? (
        <img
          className="w-[350px] h-[200px] border rounded-md bg-gray-100"
          src={url}
          onClick={!disable ? handleImageClick : undefined}
          style={{ cursor: !disable ? "pointer" : "default" }}
          alt="Preview"
        />
      ) : (
        <div
          className="w-[350px] h-[200px] border rounded-md bg-gray-100 flex items-center justify-center"
          onClick={!disable ? handleImageClick : undefined}
          style={{ cursor: !disable ? "pointer" : "default" }}
        >
          <FaFileImage size={50} /> {/* Render the icon */}
        </div>
      )}
    </div>
  );
};

export default PreviewImage;
