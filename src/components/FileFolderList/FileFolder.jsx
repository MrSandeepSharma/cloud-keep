import { useState } from "react";

import DetectOutsideClick from "../DetectOutsideClick";
import { Primarybtn } from "../Button";

import "./filefolder.css"

import { FaFolder, FaFileAlt, FaFileImage } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function FileFolderList({ 
    type="file", 
    items=[],
    handleDeleteCard=()=>{}, 
    handleOpenCard=()=>{},
    handleStarCard=()=>{}
}) {

    const [openIndexes, setOpenIndexes] = useState([]);

    function toggleOpenIndex(index) {
        setOpenIndexes(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    }

  return (
    <ul className="filefolderlist"> 
      {
        type === "file" 
            ? (
                items.map((item, index) => (
                    <li key={item[1]} className="filefolderlist__inner">
                        <button data-fileid={item[1]} className="filefolderlist__btn" onClick={handleOpenCard}>
                            {item[0].fileType === "img" ? <FaFileImage /> : <FaFileAlt />}
                            <div className="text-container">
                                <p className="text">{item[0].name}</p>
                            </div>
                        </button>
                        <DetectOutsideClick onClick={() => setOpenIndexes(prev => prev.filter(i => i !== index))}>
                            <button className="filefolderlist__toggle-btn" aria-expanded={openIndexes.includes(index)} aria-controls="filefolderlist-menu" onClick={() => toggleOpenIndex(index)}>
                                {<BsThreeDotsVertical />}
                            </button>
                            <div id="filefolderlist-menu" className="filefolderlist__menu menu-big">
                                <Primarybtn data-folderid={item[1]} type="button" text="Add to Starred" onClick={handleStarCard} />
                                <Primarybtn data-folderid={item[1]} type="button" text="Move to bin" onClick={handleDeleteCard} />
                            </div>
                        </DetectOutsideClick>
                    </li>
                ))
            ) : (
                items.map((item, index) => (
                    <li key={item[1]} className="filefolderlist__inner">
                        <button className="filefolderlist__btn" onClick={handleOpenCard}>
                            {<FaFolder />}
                            <p className="text">{item[0].name}</p>
                        </button>
                        <DetectOutsideClick onClick={() => setOpenIndexes(prev => prev.filter(i => i !== index))}>
                            <button className="filefolderlist__toggle-btn" aria-expanded={openIndexes.includes(index)} aria-controls="filefolderlist-menu" onClick={() => toggleOpenIndex(index)}>
                                {<BsThreeDotsVertical />}
                            </button>
                            <div id="filefolderlist-menu" className="filefolderlist__menu">
                                <Primarybtn data-folderid={item[1]} type="button" text="Delete" onClick={handleDeleteCard} />
                            </div>
                        </DetectOutsideClick>
                    </li>
                ))
            )
      }
    </ul>
  )
}

export default FileFolderList
