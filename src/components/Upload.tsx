import { base64ToFile, uploadImage } from "@/lib/images";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

interface UploadProps {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
}

const Upload: React.FC<UploadProps> = ({ value, setValue }) => {
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = base64ToFile(imageSrc, "image.jpeg");
      const response = await uploadImage(file);
      if (response) {
        setValue(response);
      }
    }
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await uploadImage(file);
      if (response) {
        setValue(response);
      }
    }
  };

  return (
    <section className="w-full">
      {!value ? (
        <div className="flex justify-between w-full">
          {isCameraOpen ? (
            <>
              <Webcam
                audio={false}
                height={720}
                width={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full rounded-xl"
              />
              <button
                className="h-40 w-full bg-transparent border border-gray-200 hover:bg-gray-200 transition-all text-gray-400 rounded-xl hover:shadow-xl font-black text-center text-3xl ml-1"
                onClick={capture}
              >
                Capture photo
              </button>
            </>
          ) : (
            <button
              className="h-40 w-full bg-transparent border border-gray-200 hover:bg-gray-200 transition-all text-gray-400 rounded-xl hover:shadow-xl font-black text-center text-3xl mr-1"
              onClick={() => setIsCameraOpen(true)}
            >
              Open camera
            </button>
          )}
          <input
            type="file"
            onChange={upload}
            ref={uploadRef}
            className="hidden"
          />
          <button
            className="h-40 w-full bg-transparent border border-gray-200 hover:bg-gray-200 transition-all text-gray-400 rounded-xl hover:shadow-xl font-black text-center text-3xl ml-1"
            onClick={() => uploadRef.current?.click()}
          >
            Upload file
          </button>
        </div>
      ) : (
        <Image
          alt="Uploaded image"
          height={800}
          width={800}
          src={value}
          className="w-full rounded-xl shadow-sm pr-2"
        />
      )}
    </section>
  );
};

export default Upload;
