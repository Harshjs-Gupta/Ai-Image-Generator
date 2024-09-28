import avatar from "../../assets/images/avatar.png";
import downArrow from "../../assets/icons/downArrow.png";
import image from "../../assets/icons/image.png";
import document from "../../assets/icons/document.png";
import logout from "../../assets/icons/logout.png";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useState } from "react";

interface ProfileProps {
  onLogout: () => void;
}

function Header() {
  const navigate = useNavigate();
  const [openOption, setOpenOption] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  function handleLogOut() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div className="header">
        <div
          className="option cursor-pointer"
          onClick={() => setOpenOption((prev) => !prev)}
        >
          <span>GenBrain</span>
          <img src={downArrow} alt="downarrow" />
        </div>
        <div
          className="profile"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          <img src={avatar} alt="avatar" />
        </div>
      </div>
      {openOption && <ChangeOption />}
      {openProfile && <Profile onLogout={handleLogOut} />}
    </>
  );
}
export default Header;

function ChangeOption() {
  return (
    <div className="relative left-5 flex w-64 flex-col rounded-md bg-slate-600/50 p-2">
      <div className="flex items-center gap-2 border-b border-stone-600 p-1">
        <img src={image} alt="image" className="h-5 w-5" />
        <Link to="/answer_generator_page" className="text-sm font-medium">
          GenBrain Ai answer generator
        </Link>
      </div>
      <div className="flex items-center gap-2 p-1">
        <img src={document} alt="document" className="h-5 w-5" />
        <Link to="/image_generator_page" className="text-sm font-medium">
          Text to image generator Ai
        </Link>
      </div>
    </div>
  );
}

function Profile({ onLogout }: ProfileProps) {
  return (
    <div className="absolute right-5 top-20 flex w-52 flex-col rounded-md bg-slate-600/50 p-2">
      <div
        className="flex cursor-pointer items-center gap-2 p-1"
        onClick={onLogout}
      >
        <img src={logout} alt="logout" className="h-5 w-5" />
        <span>Log out</span>
      </div>
    </div>
  );
}
