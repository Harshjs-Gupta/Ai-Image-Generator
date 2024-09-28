import "./footer.css";
import file from "../../assets/icons/file.png";
import send from "../../assets/icons/send.png";

interface FooterProps {
  text: string;
  setText: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
}

function Footer({ text, setText, onSubmit, placeholder }: FooterProps) {
  return (
    <div className="footer">
      <div className="text_bar">
        <img src={file} alt="file" />
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="placeholder:text-white"
          />
        </div>
        <img src={send} alt="send" onClick={onSubmit} />
      </div>
      <span className="text-sm">
        GenBrain can make mistakes. Check important information.
      </span>
    </div>
  );
}
export default Footer;
