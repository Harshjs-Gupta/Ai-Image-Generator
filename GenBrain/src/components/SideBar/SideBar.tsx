import "./sideBar.css";
import menu from "../../assets/icons/menu.png";
import edit from "../../assets/icons/edit.png";
import GenBrain from "../../assets/images/logo/GenBrain2.png";
import { useState } from "react";

function SideBar() {
  const [hiddenMenu, setHiddenMenu] = useState(true);

  function handleMenuClick() {
    setHiddenMenu((prev) => !prev);
  }

  return (
    <>
      {hiddenMenu && (
        <div className="sideBar flex flex-col">
          <div className="sideBar-nav">
            <img src={menu} alt="menu" onClick={handleMenuClick} />
            <img src={edit} alt="edit" />
          </div>
          <div className="app-name">
            <img src={GenBrain} alt="GenBrain" />
            <span>GenBrain</span>
          </div>
          <div className="search-list">
            <span>What is React?</span>
            <span>What is use of useState hook.</span>
            <span>What is websocket.</span>
            <span>Explain asynchronous function.</span>
            <span>Explain promises.</span>
          </div>
        </div>
      )}
    </>
  );
}
export default SideBar;
