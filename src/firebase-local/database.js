import { getFirestore, collection, addDoc,
    getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "./config";
import { getAuth } from "firebase/auth";

class Database {
    constructor() {
        this.db = getFirestore(app)
        this.storage = getStorage()
        this.auth= getAuth(app)
    }

    async getData(userPath, user, dataCollection, dataType=false) {
        try {
            const querySnapshot = await getDocs(collection(this.db, dataCollection));
            const data = querySnapshot.docs.map(doc => {
                if (doc.data().userId === user.uid ) {
                    if (dataType) {
                        if(doc.data().userPath === userPath) {
                            return [doc.data(), doc.id]
                        }
                    } else {
                        return [doc.data(), doc.id]
                    }
                }
            });
            return data;
        } catch (error) {
            return error;
        }
    }

    async addCollection(collectionName, collectionData) {
        try {
            const docRef = await addDoc(collection(this.db, collectionName), {
                ...collectionData,
                userId: String(this.auth.currentUser.uid),
            });
            return docRef
        } catch (error) {
            return error
        }
    }

    async addFile(file, userPath, type) {
        const filePath = await this.uploadImage(file)
        const newDate = new Date()
        try {
            const docRef = await addDoc(collection(this.db, "files"), {
                name: file.name,
                userId: String(this.auth.currentUser.uid),
                fileType: type,
                path: filePath,
                userPath: userPath,
                starred: false,
                created: newDate.toLocaleString()
            });
            return docRef.id
        } catch (error) {
            return error
        }
    }

    async uploadImage(file) {
        const storageRef = ref(this.storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                return progress
            }, 
            (error) => {
                console.log(error)
                return error;
            }
        )

        await uploadTask;
        return await getDownloadURL(uploadTask.snapshot.ref);
    }

    async deleteData(dataCollection, dataId) {
        await deleteDoc(doc(this.db, dataCollection, dataId));
    }

    async downloadFile(filePath, filename) {
        try {
            const response = await fetch(filePath);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            return 200;
        } catch (error) {
            return error
        }
    }
}

const database = new Database()

export default database;