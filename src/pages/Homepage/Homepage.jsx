import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { FileFolderList, HomeHeader, Input, Loader, Popup, SideNav, ToastMsg } from "../../components"
import { Secondarybtn } from "../../components/Button";
import { openPopup, closePopup } from "../../utils/popup";
import database from "../../firebase-local/database"
import { setCurrentFolder } from "../../store/currentFolderSlice"

import "./homepage.css"

import { MdOutlineFileUpload, MdCreateNewFolder } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";

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
  const user = useSelector(state => state.auth.userData)
  const [activeMenu, setActiveMenu] = useState("My Files")
  const [isCreateFolderPopupOpen, setIsCreateFolderPopupOpen] = useState(false)
  const [errMsg, setErrMsg] = useState([{folderName: "", file: ""}])
  const [folders, setFolders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

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
      fetchData("folders", setFolders, "Failed to fetch folders. Check your internet connection!");
      toast.success(folderName + " Folder Created Succesfully")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  function openFolder(e) {
    const folderName =  e.currentTarget.textContent 
    dispatch(setCurrentFolder(path + "/" + folderName))
  }

  function deleteFolder(e) {
    const folderId = e.target.dataset.folderid
    try {
      database.deleteData("folders", folderId)
      fetchData("folders", setFolders, "Failed to fetch folders. Check your internet connection!");
      toast.success("Folder Deleted Succesfully")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  function backFolder() {
    const newPath = path.split("/")
    const lastFolder = newPath[newPath.length - 1]
    newPath.pop(lastFolder)
    dispatch(setCurrentFolder(newPath.join("/")))
  }

  const fetchData = useCallback(async (dataType, setData, errorMessage) => {
    try {
      setIsLoading(true);
      const fetchedData = await database.getData(path, user, dataType);
      const filteredData = fetchedData.filter(item => item !== undefined);
      setData(filteredData);
      console.log(`Fetching ${dataType} data....`);
    } catch (error) {
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [path, user]);

  useEffect(() => {
    fetchData("folders", setFolders, "Failed to fetch folders. Check your internet connection!");
  }, [fetchData, setFolders]);

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
          isLoading ? (
            <Loader className="homeloader" />
          ) : (
            activeMenu === "My Files" && (
              <div className="myfiles">
                <div className="myfiles__hero">
                  {
                    path != "root" && <Secondarybtn type="button" icon={<FaChevronLeft />} onClick={backFolder} />
                  }
                  <p className="folder__path">/{path}</p>
                </div>
                {
                  folders.length != 0 
                    ? (
                        <section className="folder__container">
                          <FileFolderList type="folder" items={folders} handleOpenCard={openFolder} handleDeleteCard={deleteFolder} />
                        </section>
                    ) : (
                      <div className="blankpage flex-container">
                        <div className="blankpage__inner flex-container">
                          <img src={myFileImg} alt="cloud keep" />
                          <h2>Cloud Keep</h2>
                          <p>A place for all of your files. Create a New Folder or Upload a File</p>
                        </div>
                      </div>
                    )
                }
              </div>
          ))
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