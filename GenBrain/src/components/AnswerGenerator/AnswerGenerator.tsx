import "./answerGenerator.css";
import { useEffect, useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../../auth/firebase";
import loader from "../../assets/images/Loader/loader.gif";

type Answer = {
  text: string;
};

function AnswerGenerator() {
  const [text, setText] = useState("");
  const [answerData, setAnswerData] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answerData]);

  useEffect(() => {
    const fetchAnswer = async () => {
      const answerCollection = collection(database, "generatedAnswer");
      const answerSnapshot = await getDocs(answerCollection);
      const answers = answerSnapshot.docs.map((doc) => doc.data() as Answer);
      setAnswerData(answers);
    };

    fetchAnswer();
  }, []);

  function handleSubmit() {
    async function generateAnswer() {
      setIsLoading(true);
      try {
        const response = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
          method: "post",
          data: { contents: [{ parts: [{ text: text }] }] },
        });

        if (response && response.data) {
          const generatedAnswer =
            response.data.candidates[0].content.parts[0].text;

          const newAnswer = { text: generatedAnswer };

          const answerCollection = collection(database, "generatedAnswer");
          await addDoc(answerCollection, newAnswer);

          setAnswerData((prev) => [...prev, newAnswer]);
        } else {
          console.error("No response received from the API");
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
        setText("");
      }
    }
    generateAnswer();
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
              <div className="answer">
                {Array.isArray(answerData) &&
                  answerData.map((answer, index) => (
                    <div key={index}>
                      <div className="answer-box">
                        <span>A: {answer.text}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>
        <Footer
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          placeholder="Type your query..."
        />
      </div>
    </div>
  );
}

export default AnswerGenerator;
