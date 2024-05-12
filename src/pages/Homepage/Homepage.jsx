import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { HomeHeader, Input, Popup, SideNav, ToastMsg } from "../../components"
import { openPopup, closePopup } from "../../utils/popup";
import database from "../../firebase-local/database"

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
 
  const path = useSelector(state => state.currentFolder.path)
  const [activeMenu, setActiveMenu] = useState("My Files")
  const [isCreateFolderPopupOpen, setIsCreateFolderPopupOpen] = useState(false)
  const [errMsg, setErrMsg] = useState([{folderName: "", file: ""}])
  const [folders, setFolders] = useState([])

  function openCreateFolderPopup() {
    openPopup(setIsCreateFolderPopupOpen)
  }

  function createFolder(e) {
    e.preventDefault()
    // get Form Data
    const formData = new FormData(e.currentTarget);
    const folderName = formData.get("folderName");

    // Form Validation
    const newErrors = {};

    if (folderName === '') {
      newErrors.folderName = 'Please Enter Folder Name!';
    }

    if(folderName.length >= 15) { 
      newErrors.folderName = 'Folder name must be 15 words or less!';
    }

    if (folderName.includes("/")) { 
      newErrors.folderName = 'The Folder Name Contains Invalid Characters!';
    }

    if (folders.some(folder => folder && folder[0].name === folderName)) {
      newErrors.folderName = 'Folder already exists!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrMsg(newErrors);
      return;
    }

    try {
      database.addFolder(folderName, path)
      closePopup(setIsCreateFolderPopupOpen)
      toast.success(folderName + " Folder Created Succesfully")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  return (
    <>
      <HomeHeader />
      <SideNav toggleNavItems={toggleNavItems} active={activeMenu} onClick={(e)=>{setActiveMenu(e.currentTarget.textContent)}} />
      <main id="main" className="homepage__main">
        <div className="toast-wrapper">
          <ToastMsg />
        </div>
        {/* Popups */}
        {
          isCreateFolderPopupOpen && (
              <Popup text="Create Folder" onSubmit={createFolder} closeFunc={ ()=> closePopup(setIsCreateFolderPopupOpen)}>
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