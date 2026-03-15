import UploadFile from "./UploadFile";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const UploadForm = () => {
    
    const [oldFile, setOldFile] = useState<File | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const { user } = useAuth0();

    function handleChangeEvent(event: React.ChangeEvent<HTMLInputElement>, fileName: string) {
        const files = event?.target?.files;
        if (files == null) {
            alert("File has not been uploaded yet")
            return;
        }
        const file = files[0];

        if (fileName == "oldFile") {
            setOldFile(file);
        } else {
            setNewFile(file);
        }
    }

    async function uploadFiles(old_file:File, new_file:File, num_msgs:string, user_id:string) {
        try {
            const formData = new FormData();
            formData.append("old_file", old_file)
            formData.append("new_file", new_file)
            formData.append("num_msgs", num_msgs)
            formData.append("user_id", user_id)

            const response = await axios.post("/uploads", formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmitForm(e:React.MouseEvent<HTMLButtonElement>) {
        try{
        e.preventDefault();
        if (oldFile && newFile && user?.sub) {
            console.log(oldFile)
            console.log(newFile)
            console.log(user.sub)
            const response = await uploadFiles(oldFile, newFile, "4", user.sub)
            console.log(response?.data)
        }}
        catch(e){
            console.log("Submit error" + e)
        }
    }

    return (
        <div>
            <UploadFile fileName="oldFile" handleChangeEvent={handleChangeEvent} />
            <UploadFile fileName="newFile" handleChangeEvent={handleChangeEvent} />
            <Button colorPalette="teal" type="submit" alignSelf="flex-end" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{handleSubmitForm(e)}}>
                Submit
            </Button>
        </div>
    );
};
export default UploadForm;
