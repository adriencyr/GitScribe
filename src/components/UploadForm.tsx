import UploadFile from "./UploadFile";
import { useState } from "react";

const UploadForm = () => {
    const [oldFile, setOldFile] = useState<File|null>(null);
    const [newFile, setNewFile] = useState<File|null>(null);

    function handleChangeEvent(event:React.ChangeEvent<HTMLInputElement>, fileName:String){
        const files = event?.target?.files;
        if(files==null){
            alert("File has not been uploaded yet")
            return;
        }
        const file = files[0];

        if(fileName == "oldFile"){
            setOldFile(file);
        } else {
            setNewFile(file);
        }
    }

  return (
    <div>
        <UploadFile fileName="oldFile" handleChangeEvent = {handleChangeEvent}/>
        <UploadFile fileName="newFile" handleChangeEvent = {handleChangeEvent}/>  
    </div>
  );
};
export default UploadForm;
