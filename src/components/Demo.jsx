import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import axios from "axios";

export default function TestItYourself() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
    setResultImage(null);
    setErrorOccurred(false);
  };

  const handleSelectClick = () => {
    inputRef.current.click();
  };

  const handlePredict = async () => {
    const file = inputRef.current.files?.[0];
    if (!file) return alert("Please upload an image first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setErrorOccurred(false);
      setResultImage(null);

      // Send image to backend
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // expecting image blob
      });

      // Convert backend image blob to URL
      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setResultImage(imageObjectURL);
    } catch (error) {
      console.error("Error during prediction:", error);
      setErrorOccurred(true);
      setResultImage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="test-it-yourself" className="mt-20 bg-white p-10 rounded-3xl shadow-lg border border-emerald-100 w-[80%] mx-auto">
      <h2 className="text-3xl font-bold text-emerald-700 mb-3 text-center">Test it Yourself</h2>
      <div className="grid md:grid-cols-2 gap-10 items-center justify-center">
        {/* Left Section: Description Box */}
        <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200 shadow-inner h-full flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Upload and Analyze</h3>
          <p className="text-slate-700 text-lg leading-relaxed">
            Upload a satellite image to see whether it is <span className="font-semibold text-emerald-700">landslide prone</span>. The model will process your image and return a generated prediction image.
          </p>
          <p className="text-slate-500 mt-3 text-sm italic">
            Note: Processing may take a few seconds depending on image size.
          </p>
        </div>

        {/* Right Section: Upload + Preview */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-lg flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-row items-start justify-between w-full gap-6">
            <div className="flex flex-col items-center justify-center flex-1">
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageUpload}
                className="hidden"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelectClick}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:brightness-110 transition-all mb-6"
              >
                <Upload size={20} /> Choose Image
              </motion.button>

              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center w-full"
                >
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center justify-center gap-2">
                    <ImageIcon size={20} /> Image Preview
                  </h3>
                  <img
                    src={selectedImage}
                    alt="Uploaded Preview"
                    className="rounded-lg object-cover w-32 h-32 border border-emerald-100 shadow-md mb-4"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full px-6 py-3 rounded-lg bg-emerald-700 text-white font-semibold shadow hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? "Processing..." : "Test with Model"}
                  </motion.button>
                </motion.div>
              )}

              {!selectedImage && (
                <p className="text-slate-500 text-sm">No image uploaded yet. Click above to choose one.</p>
              )}
            </div>

            {/* Right-side Result Section */}
            <div className="flex flex-col items-center justify-start flex-1">
              {loading && <p className="text-slate-500 text-sm">Analyzing image...</p>}

              {resultImage && !errorOccurred && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 shadow-inner w-full flex flex-col items-center"
                >
                  <h4 className="text-md font-semibold text-emerald-700 mb-2">Model Output</h4>
                  <img
                    src={resultImage}
                    alt="Model Output"
                    className="rounded-lg object-cover w-48 h-48 border border-emerald-100 shadow-md"
                  />
                </motion.div>
              )}

              {errorOccurred && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-50 rounded-xl border border-red-200 shadow-inner flex flex-col items-center w-full"
                >
                  <AlertCircle className="text-red-600 mb-2" size={24} />
                  <h4 className="text-md font-semibold text-red-700 mb-2">Error loading result</h4>
                  <div className="w-48 h-48 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center">
                    <ImageIcon className="text-gray-400" size={40} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}