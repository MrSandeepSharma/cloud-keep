import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { FileFolderList, HomeHeader, Input, Loader, Popup, SideNav, ToastMsg, Uploading } from "../../components"
import { Secondarybtn } from "../../components/Button";
import { openPopup, closePopup } from "../../utils/popup";
import database from "../../firebase-local/database"
import { setCurrentFolder } from "../../store/currentFolderSlice"

import "./homepage.css"

import { MdOutlineFileUpload, MdCreateNewFolder } from "react-icons/md";
import { FaChevronLeft, FaPlus } from "react-icons/fa";

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
        onClick: openUploadFilePopup
    },
  ]
 
  const path = useSelector(state => state.currentFolder.path)
  const user = useSelector(state => state.auth.userData)
  const [activeMenu, setActiveMenu] = useState("My Files")
  const [isCreateFolderPopupOpen, setIsCreateFolderPopupOpen] = useState(false)
  const [isUploadFilePopupOpen, setIsUploadFilePopupOpen] = useState(false)
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false)
  const [file, setFile] = useState("")
  const [fileObj, setFileObj] = useState("")
  const [errMsg, setErrMsg] = useState([{folderName: "", file: ""}])
  const [folders, setFolders] = useState([])
  const [allFiles, setAllFiles] = useState([])
  const [binData, setBinData] = useState([])
  const [starredData, setStarredData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFilePreviewLoading, setIsFilePreviewLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
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
      const dataCollection = {
        name: folderName,
        userPath: path,
      }
      database.addCollection("folders", dataCollection)
      closePopup(setIsCreateFolderPopupOpen)
      fetchData("folders", true, setFolders, "Failed to fetch folders. Check your internet connection!");
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
      fetchData("folders", true, setFolders, "Failed to fetch folders. Check your internet connection!");
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

  function openUploadFilePopup() {
    openPopup(setIsUploadFilePopupOpen)
  }

  async function uploadFile(e) {
    e.preventDefault() 

    const newErrors = {};
    if (!file) {
      newErrors.file = "Please select a file first!"
    }

    if (allFiles.some(files => files && files[0].name === file.name)) {
      closeIsUploadFilePopup()
      toast.error('File already exists with this name change the file name!')
      newErrors.file = 'File already exists change the file name!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrMsg(newErrors);
      return;
    }

    closeIsUploadFilePopup()
    try {
      setIsUploading(true)
      const fileType = checkImageType(file) ? "img" : "file";
      const uploadedFile = await database.addFile(file, path, fileType);

      if (uploadedFile) {
        setIsUploading(false)
        toast.success("File Uploaded Successfully")
        fetchData("files", true, setAllFiles, "Failed to fetch files. Check your internet connection!");
        console.log("file uploaded Succesfully", uploadedFile)
      }
    } catch (error) {
      console.log(error)
      toast.error("Check Your Internet Connection!")
    }
  }

  function closeIsUploadFilePopup() {
    closePopup(setIsUploadFilePopupOpen)
    setFile("")
    setErrMsg({})
    setFileObj("")
  }

  function previewFile(e) {
    const newFile = e.target.files[0]
    const newErrors = {};
    if (!checkType(newFile)) {
      newErrors.file = "Sorry, you can only upload image files or text-based files."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrMsg(newErrors);
      return;
    }

    if (checkImageType(newFile)) {
      const fileObj = {
        name: newFile.name,
        size: newFile.size,
        type: newFile.type,
        url: URL.createObjectURL(newFile)
      }
      setFile(newFile)
      setFileObj(fileObj)
    } else{
      let reader = new FileReader();
      reader.onload = function(event) {
      const fileObj = {
        name: newFile.name,
        size: newFile.size,
        type: newFile.type,
        url: event.target.result
      }
      setFile(newFile)
      setFileObj(fileObj)
      };
      reader.readAsText(newFile);
    }
  }

  function handleOpenFile(e, type) {
    const fileId = e.currentTarget.dataset.fileid
    if (type === "starred") {
      const fileData = starredData.filter(file => file[0][0][1] === fileId)
      const file = fileData[0][0][0][0]
      setFileObj(file)
      openFile(file)
    } else if (type === "bin") {
      const fileData = binData.filter(file => file[0][0][1] === fileId)
      const file = fileData[0][0][0][0]
      setFileObj(file)
      openFile(file)
    } else {
      const fileData = allFiles.filter(file => file && file[1] === fileId)
      const file = fileData[0][0]
      setFileObj(file)
      openFile(file)
    }
  }

  function openFile(file) {
    setIsFilePreviewOpen(true)
    setIsFilePreviewLoading(true)

    if (file.fileType != "img") {
      fetch(file.path)
        .then(response => {
            if (!response.ok) {
                toast.error("Check Your Internet Connection")
                return
            }
            return response.text();
        })
        .then(data => {
            const updatedFile = { ...file, data: data };
            setFileObj(updatedFile);
            setIsFilePreviewLoading(false)
        })
        .catch(error => {
          setIsFilePreviewLoading(false)
          toast.error("Check Your Internet Connection")
          return
        });
    }
  }

  function downloadFile(e) {
    e.preventDefault()
    const url = fileObj.path
    const filename = fileObj.name
    database.downloadFile(url, filename)
  }

  function moveToBinFile(e) {
    const fileId = e.target.dataset.folderid
    const file = allFiles.filter(file => file[1] === fileId)

    try {
      const dataCollection = {...file,}
      database.addCollection("bin", dataCollection)

      database.deleteData("files", fileId)
      fetchData("files", true, setAllFiles, "Failed to fetch files. Check your internet connection!");
      fetchData("bin", false, setBinData, "Failed to fetch bins. Check your internet connection!");
      toast.success("file Deleted Succesfully")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  function handleOptionalFile(e) {
    const fileId = e.target.dataset.folderid
    const file = allFiles.filter(file => file[1] === fileId)


    if (file[0][0].starred) {
      removeFileFromStarred(file, fileId)
    } else {
      addFileToStarred(file, fileId)
    }

  }

  function addFileToStarred(file, fileId) {
    const starredFile = starredData.filter(file => file[0][0][1] === fileId)
    
    if (starredFile.length === 0) {
      try {
        const dataCollection = {...file}
        database.addCollection("starred", dataCollection)

        const newDataForFiles = { starred: true };
        database.updateData("files", fileId, newDataForFiles);

        fetchData("files", true, setAllFiles, "Failed to fetch files. Check your internet connection!");
        fetchData("starred", false, setStarredData, "Failed to fetch bins. Check your internet connection!");
        toast.success("file Added to Stattred Succesfully")
      } catch (error) {
        toast.error("Check Your Internet Connection!")
      }
    } else {
      toast.error("Check the File name again!")
    }
  }

  function removeFileFromStarred(file, fileId) {
    const starredFile = starredData.filter(file => file[0][0][1] === fileId)

    try {
      database.deleteData("starred", starredFile[0][1])
      const newDataForFiles = { starred: false };
      database.updateData("files", fileId, newDataForFiles);

      fetchData("files", true, setAllFiles, "Failed to fetch files. Check your internet connection!");
      fetchData("starred", false, setStarredData, "Failed to fetch bins. Check your internet connection!");
      toast.success("file removed from Stattred")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  function closeIsFilePreviewOpen() {
    closePopup(setIsFilePreviewOpen)
    setFileObj("")
  }

  function deleteStarredFile(e) {
    const fileId = e.target.dataset.folderid
    const file = allFiles.filter(file => file[1] === fileId)

    removeFileFromStarred(file, fileId)
  }

  function deleteBinData(e) {
    const fileId = e.currentTarget.dataset.folderid
    try {
      database.deleteData("bin", fileId)
      fetchData("bin", false, setBinData, "Failed to fetch bins. Check your internet connection!");
      toast.success("file Deleted Succesfully")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  function reStoreFile(e) {
    const fileId = e.currentTarget.dataset.folderid
    const file = binData.filter(file => file[1] === fileId)
    
    try {
      database.addCollection("files", file[0][0][0][0])
      database.deleteData("bin", fileId)
      fetchData("bin", false, setBinData, "Failed to fetch bins. Check your internet connection!");
      fetchData("files", true, setAllFiles, "Failed to fetch files. Check your internet connection!");
      toast.success("file re-stored Succesfully")
    } catch (error) {
      toast.error("Check Your Internet Connection!")
    }
  }

  const checkType = (file) => {
    const previewableTypes = /^(image\/(jpg|jpeg|png|gif|svg)|text\/(plain|csv|json|xml|html|css|javascript|typescript|php|python|java|cpp|c|ruby|perl|shell|sql))/i;
    return previewableTypes.test(file.type);
  };

  const checkImageType = (file) => {
    const previewableTypes = /^image\/(jpeg|jpg|png|gif|svg\+xml)$/i;
    return previewableTypes.test(file.type);
  };

  const fetchData = useCallback(async (collection, dataType, setData, errorMessage) => {
    try {
      setIsLoading(true);
      const fetchedData = await database.getData(path, user, collection, dataType );
      const filteredData = fetchedData.filter(item => item !== undefined);
      setData(filteredData);
      console.log(`Fetching ${collection} data....`);
    } catch (error) {
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [path, user]);

  useEffect(() => {
    fetchData("folders", true, setFolders, "Failed to fetch folders. Check your internet connection!");
  }, [fetchData, setFolders]);

  useEffect(() => {
    fetchData("files", true, setAllFiles, "Failed to fetch files. Check your internet connection!");
  }, [fetchData, setAllFiles]);

  useEffect(() => {
    fetchData("bin", false, setBinData, "Failed to fetch bins. Check your internet connection!");
  }, [fetchData, setBinData]);

  useEffect(() => {
    fetchData("starred", false, setStarredData, "Failed to fetch bins. Check your internet connection!");
  }, [fetchData, setStarredData]);

  return (
    <>
      <HomeHeader 
        fileOpen={(e) => {handleOpenFile(e, activeMenu.toLowerCase())}} 
        dataType={activeMenu === "Starred" ? "starred" : activeMenu === "Bin" ? "bin" : "file"}
        data={activeMenu === "Starred" ? starredData : activeMenu === "Bin" ? binData : allFiles} 
      />
      <SideNav toggleNavItems={toggleNavItems} active={activeMenu} onClick={(e)=>{setActiveMenu(e.currentTarget.textContent)}} />
      <main id="main" className="homepage__main">
        <div className="toast-wrapper">
          <ToastMsg />
        </div>
        {
          isUploading && <Uploading />
        }
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
          isUploadFilePopupOpen && (
              <Popup text="Upload File" onSubmit={uploadFile} closeFunc={closeIsUploadFilePopup}>
                <div className="uploadfile__popup">
                  <h2>Upload New File</h2>
                  <p className="file__name">{fileObj.name ? fileObj.name : "New File"}</p>
                  <div className="file__details flex-container">
                    <div className="file__details__inner">
                      <p className="file__size">File Size</p>
                      <p>{fileObj.size ? fileObj.size : "-- --"}</p>
                    </div>
                    <div className="file__details__inner">
                      <p className="file__type">File Type</p>
                      <p>{fileObj.type ? fileObj.type : "-- --"}</p>
                    </div>
                  </div>
                  {
                    file != ""
                      ? (
                        checkImageType(file)
                          ? (
                            <div className="preview-container flex-container">
                              <img src={fileObj.url} alt="file" />
                            </div>
                          ) : (
                            <div className="preview-container flex-container">
                              <textarea value={fileObj.url} disabled></textarea>
                            </div>
                          ) 
                      ) : (
                        <div className="file-container flex-container">
                          <label className="file-label flex-container" htmlFor="file">
                            <FaPlus /> 
                            <p>Upload New File</p>
                            <p className="error-text">{errMsg.file && errMsg.file}</p>
                          </label>
                          <Input id="file" type="file" name="fileName" onChange={previewFile} />
                        </div>
                      )
                  }
                </div>
              </Popup>
            )
        }
        {
          isFilePreviewOpen && (
            <Popup text="Download" onSubmit={downloadFile} closeFunc={closeIsFilePreviewOpen}>
              <div className="preview__wrapper">
                <h2 className="preview__title">{fileObj.name}</h2>
                {
                  isFilePreviewLoading && <Loader className="preview-loader" /> 
                }
                {
                  fileObj.fileType === "img"
                  ? (
                    <div className="previewimg-container flex-container">
                      <img src={fileObj.path} alt={fileObj.name} onLoad={()=>{setIsFilePreviewLoading(false)}} />
                    </div>
                  ) : (
                    <div className="preview-container flex-container">
                      <textarea value={fileObj.data} disabled></textarea>
                    </div>
                  )
                }
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
                  folders.length != 0 || allFiles.length != 0
                    ? (
                        <section className="myfiles__inner">
                          {
                            folders.length != 0 && (
                              <div className="folder__container">
                                <h2 className="folder__title">All Folders</h2>
                                <FileFolderList type="folder" items={folders} handleOpen={openFolder} handleDelete={deleteFolder} />
                              </div>
                            )
                          }
                          {
                            allFiles.length != 0 && (
                              <div className="files__container">
                                <h2 className="files__title">All Files and Images</h2>
                                <FileFolderList items={allFiles} handleOpen={(e) => {handleOpenFile(e, "files")}} handleDelete={moveToBinFile} handleOptional={handleOptionalFile} />
                              </div>
                            )
                          }
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
            starredData.length != 0 
              ? (
                <div className="starred">
                  <FileFolderList type="starred" items={starredData} handleOpen={(e) => {handleOpenFile(e, "starred")}} handleDelete={deleteStarredFile} />
                </div>
              ) : (
                <div className="blankpage flex-container">
                  <div className="blankpage__inner flex-container">
                    <img src={starImg} alt="starred files" />
                    <h2>No starred files</h2>
                    <p>Add stars to things that you want to easily fine later</p>
                  </div>
                </div>
              )
          )
        }
        {
          activeMenu === "Bin" && (
            binData.length != 0 
              ? (
                <div className="bin">
                  <FileFolderList type="bin" items={binData} handleOpen={(e) => {handleOpenFile(e, "bin")}} handleDelete={deleteBinData} handleOptional={reStoreFile} />
                </div>
              ) : (
                <div className="blankpage flex-container">
                  <div className="blankpage__inner flex-container">
                    <img src={trashImg} alt="trash" />
                    <h2>Bin is empty</h2>
                    <p>Items moved to the bin will be deleted forever after 30 days</p>
                  </div>
                </div>
              )
          )
        }
      </main>
    </>
  )
}

export default Homepage