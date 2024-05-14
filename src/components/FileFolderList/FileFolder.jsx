import { Primarybtn } from "../Button";
import DetectOutsideClick from "../DetectOutsideClick";

import "./filefolder.css"

import { FaFolder, FaFileAlt, FaFileImage } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

function FileFolder({
    type="file", 
    items=[],
    handleDelete=()=>{}, 
    handleOpen=()=>{},
    handleOptional=()=>{}
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
            items.map((item, index) => (
                <li key={item[1]} className="filefolderlist__inner">
                    <button data-fileid={type === "starred" || type === "bin" ? item[0][0][1] : item[1]} className="filefolderlist__btn" onClick={handleOpen}>
                        { 
                            type === "starred" || type === "bin"
                                ? item[0][0][0].fileType === "img" ? <FaFileImage /> : (item[0][0][0].fileType === "file" ? <FaFileAlt /> : <FaFolder />)
                                : item[0].fileType === "img" ? <FaFileImage /> : (item[0].fileType === "file" ? <FaFileAlt /> : <FaFolder />)
                        }
                        <div className="text-container">
                            <p className="text">{type === "starred" || type === "bin" ? item[0][0][0].name : item[0].name}</p>
                        </div>
                    </button>
                    <DetectOutsideClick onClick={() => setOpenIndexes(prev => prev.filter(i => i !== index))}>
                        <button className="filefolderlist__toggle-btn" aria-expanded={openIndexes.includes(index)} aria-controls="filefolderlist-menu" onClick={() => toggleOpenIndex(index)}>
                            {<BsThreeDotsVertical />}
                        </button>
                        {
                            type === "file" && (
                                <div id="filefolderlist-menu" className="filefolderlist__menu menu-big">
                                    <Primarybtn 
                                        data-folderid={item[1]} 
                                        type="button" text={item[0].starred ? "Unstar" : "Star"}
                                        onClick={handleOptional} 
                                    />
                                    <Primarybtn 
                                        data-folderid={item[1]} 
                                        type="button" text="Move to Bin" 
                                        onClick={handleDelete} 
                                    />
                                </div>
                            )
                        }
                        {
                            type === "folder" && (
                                <div id="filefolderlist-menu" className="filefolderlist__menu">
                                    <Primarybtn data-folderid={item[1]} type="button" text="Delete" onClick={handleDelete} />
                                </div>
                            )
                        }
                        {
                            type === "starred" && (
                                <div id="filefolderlist-menu" className="filefolderlist__menu">
                                    <Primarybtn data-folderid={item[0][0][1]} type="button" text="Unstar" onClick={handleDelete} />
                                </div>
                            )
                        }
                        {
                            type === "bin" && (
                                <div id="filefolderlist-menu" className="filefolderlist__menu menu-big">
                                    <Primarybtn 
                                        data-folderid={item[1]} 
                                        type="button" text="Delete"
                                        onClick={handleDelete} 
                                    />
                                    <Primarybtn 
                                        data-folderid={item[1]} 
                                        type="button" text="Restore" 
                                        onClick={handleOptional} 
                                    />
                                </div>
                            )
                        }
                    </DetectOutsideClick>
                </li>
            ))
        }
    </ul>
  )
}

export default FileFolder
