import { useState } from "react";

import { Secondarybtn } from "../Button"
import DetectOutsideClick from "../DetectOutsideClick";

import "./sidenav.css"

import { FaPlus } from "react-icons/fa6";
import { FaRegStar, FaRegTrashAlt } from "react-icons/fa";

import cloudkeepIcon from "../../assets/cloudkeep-icon.svg"

function SideNav({ toggleNavItems=[], onClick=()=>{}, active="My Files" }) {

    const items = [
        {
            title: "Starred",
            icon: FaRegStar
        },
        {
            title: "Bin",
            icon: FaRegTrashAlt
        },
    ]

    const [isOpen, setIsOpen] = useState(true)

    function toggle() {
        setIsOpen(prev => !prev)
    }

  return (
    <nav className="sidenav">
        <DetectOutsideClick onClick={()=>{setIsOpen(true)}}>
            <div className="sidenav__toggle">
                <Secondarybtn 
                    type="button" 
                    className="toggle__btn main-btn" 
                    text="New" 
                    icon={<FaPlus />} 
                    aria-expanded={!isOpen} 
                    aria-controls="toggle-menu" 
                    onClick={toggle} 
                />
                <ul role="list" id="toggle-menu" className="toggle__menu">
                    {
                        active === "My Files"
                            ? (
                                toggleNavItems.map(item => (
                                    <li key={item.title} className="menu__item">
                                        <Secondarybtn type="button" text={item.title} icon={<item.icon />} onClick={item.onClick} />
                                    </li>
                                ))
                            ) : (
                                <li className="menu__item">
                                    You Can not create folder or upload files outside of My Files.
                                </li>
                            )
                    }
                </ul>
            </div>
        </DetectOutsideClick>
        <ul className="sidenav__menu">
            <li className={`menu__item ${active === "My Files" ? "menu-active" : ""}`} data-title="My Files" onClick={onClick}>
                <img src={cloudkeepIcon} />
                <p className="item__title">My Files</p>
            </li>
            {
                items.map(item => (
                    <li 
                        key={item.title} 
                        className={`menu__item ${active === item.title ? "menu-active" : ""}`}
                        onClick={onClick}
                    >
                        {<item.icon />}
                        <p className="item__title">{item.title}</p>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default SideNav