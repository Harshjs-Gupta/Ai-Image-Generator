import "./answerGenerator.css";
import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
// import { toast } from "react-toastify";

function AnswerGenerator() {
  const [text, setText] = useState("");

  // async function getAnswer() {
  //   try {
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.log(err);
  //       toast.error(err.message);
  //     }
  //   }
  // }

  function handleSubmit() {}

  return (
    <div className="bg-[rgb(26, 25, 40)] flex">
      <SideBar />
      <div className="image-generate-page">
        <Header />
        <div className="center scrollbar-thin overflow-hidden hover:overflow-scroll">
          <div className="output"></div>
        </div>
        <Footer
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          placeholder="Type here your query..."
        />
      </div>
    </div>
  );
}
export default AnswerGenerator;
