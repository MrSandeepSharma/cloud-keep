import { useState } from "react";

import { HomeHeader, Input, Popup, SideNav } from "../../components"

import "./homepage.css"

import { MdOutlineFileUpload, MdCreateNewFolder } from "react-icons/md";

import myFileImg from "../../assets/logo.svg"
import trashImg from "../../assets/empty_state_trash.svg"
import starImg from "../../assets/empty_state_starred.svg"

function Homepage() {

  const toggleNavItems = [
    {
        title: "Create New Folder",
        icon: MdCreateNewFolder,
        onClick: openCreateFolderPopup
    },
    {
        title: "Upload New File",
        icon: MdOutlineFileUpload,
        onClick: () => {}
    },
  ]
 
  const [activeMenu, setActiveMenu] = useState("My Files")
  const [isCreateFolderPopupOpen, setIsCreateFolderPopupOpen] = useState(false)
  const [errMsg, setErrMsg] = useState([{folderName: "", file: ""}])

  function openCreateFolderPopup() {
    setIsCreateFolderPopupOpen(true)
  }

  function createFolder(e) {
    e.preventDefault()
    console.log("Folder Created")
  }

  return (
    <>
      <HomeHeader />
      <SideNav toggleNavItems={toggleNavItems} active={activeMenu} onClick={(e)=>{setActiveMenu(e.currentTarget.textContent)}} />
      <main id="main" className="homepage__main">
        {/* Popups */}
        {
          isCreateFolderPopupOpen && (
              <Popup text="Create Folder" onSubmit={createFolder} closeFunc={ ()=> setIsCreateFolderPopupOpen(false)}>
                <div className="createfolder__popup">
                  <h2>Create New Folder</h2>
                  <Input errTxt={errMsg.folderName && errMsg.folderName} type="text" name="folderName" placeholder="New Folder" />
                </div>
              </Popup>
            )
        }

        {
          activeMenu === "My Files" && (
            <div className="blankpage flex-container">
              <div className="blankpage__inner flex-container">
                <img src={myFileImg} alt="cloud keep" />
                <h2>Cloud Keep</h2>
                <p>A place for all of your files</p>
              </div>
            </div>
          )
        }
        {
          activeMenu === "Starred" && (
            <div className="blankpage flex-container">
              <div className="blankpage__inner flex-container">
                <img src={starImg} alt="starred files" />
                <h2>No starred files</h2>
                <p>Add stars to things that you want to easily fine later</p>
              </div>
            </div>
          )
        }
        {
          activeMenu === "Bin" && (
            <div className="blankpage flex-container">
              <div className="blankpage__inner flex-container">
                <img src={trashImg} alt="trash" />
                <h2>Bin is empty</h2>
                <p>Items moved to the bin will be deleted forever after 30 days</p>
              </div>
            </div>
          )
        }
      </main>
    </>
  )
}

export default Homepage