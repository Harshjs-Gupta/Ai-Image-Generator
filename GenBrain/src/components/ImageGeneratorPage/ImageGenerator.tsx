import { useState, useEffect, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore functions
import loader from "../../assets/images/Loader/loader.gif";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import { database, storage } from "../../auth/firebase"; // Firestore config
import "./imageGenerator.css";

const token = "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";

function ImageGenerator() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<
    { url: string; description: string }[]
  >([]); // Store image URLs and description
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch previously uploaded images and descriptions on component mount
    const fetchImages = async () => {
      const imagesCollection = collection(database, "generatedImages");
      const imageSnapshot = await getDocs(imagesCollection);
      const images = imageSnapshot.docs.map((doc) => doc.data());
      setImageData(images as { url: string; description: string }[]);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [imageData]);

  async function query(data: { inputs: string }) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch from the API:", response.statusText);
        return undefined;
      }

      const result = await response.blob();
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      setText("");
      setIsLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      const response = await query({ inputs: text });
      if (response) {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `images/${Date.now()}.png`);
        await uploadBytes(storageRef, response);

        // Get the download URL and add to state and Firestore
        const downloadUrl = await getDownloadURL(storageRef);
        const newImage = { url: downloadUrl, description: text };

        // Save image data (url and description) to Firestore
        const imagesCollection = collection(database, "generatedImages");
        await addDoc(imagesCollection, newImage);

        // Update local state to include new image and description
        setImageData((prev) => [...prev, newImage]);
      } else {
        console.error("No response received from the API");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setText("");
  }

  return (
    <div className="bg-[rgb(26, 25, 40)] flex">
      <SideBar />
      <div className="image-generate-page">
        <Header />
        <div className="center overflow-hidden scrollbar-thin hover:overflow-scroll">
          {isLoading ? (
            <img src={loader} alt="loader" className="loader" />
          ) : (
            <div className="output">
              <div>
                {imageData.length > 0 && (
                  <>
                    <h2 className="text-stone-300">Generated Images:</h2>
                    <div className="image-gallery">
                      {imageData.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image.url} alt={`Generated ${index}`} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>
        <Footer
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          placeholder="Type here to generate image..."
        />
      </div>
    </div>
  );
}

export default ImageGenerator;
