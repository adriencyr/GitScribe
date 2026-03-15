import UploadFile from "./UploadFile";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import NumberInputComponent from "./NumberInputComponent";

const UploadForm = ({handleUpdateMessages}:{handleUpdateMessages:(value:string)=>void}) => {
    console.log(`${import.meta.env.VITE_AUTH0_URL}/uploads`);
    const [oldFile, setOldFile] = useState<File | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [numMsgs, setNumMsgs] = useState<string>("1");
    const { user } = useAuth0();

    function handleFileInputChangeEvent(event: React.ChangeEvent<HTMLInputElement>, fileName: string) {
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

    function handleNumberInputChangeEvent(value: string) {
        setNumMsgs(value);
    }

    async function uploadFiles(old_file: File, new_file: File, num_msgs: string, user_id: string) {
        try {
            const formData = new FormData();
            formData.append("old_file", old_file)
            formData.append("new_file", new_file)
            formData.append("num_msgs", num_msgs)
            formData.append("user_id", user_id)

            const response = await axios.post(`${import.meta.env.VITE_AUTH0_URL}/uploads/`, formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
        try {
            e.preventDefault();
            if (oldFile && newFile && user?.sub) {
                //make first api request to upload file
                const response1 = await uploadFiles(oldFile, newFile, numMsgs, user.sub)

                if (response1?.data) {
                    const response2 = await axios.get(`${import.meta.env.VITE_AUTH0_URL}/msgs/${user.sub}`)
                    console.log(response2?.data)
                }
            }
        }
        catch (e) {
            console.log("Submit error" + e)
        }
    }

    return (
        <div>
            <UploadFile fileName="oldFile" handleFileInputChangeEvent={handleFileInputChangeEvent} />
            <UploadFile fileName="newFile" handleFileInputChangeEvent={handleFileInputChangeEvent} />
            <NumberInputComponent numMsgs={numMsgs} handleNumberInputChangeEvent={handleNumberInputChangeEvent} />
            <Button colorPalette="teal" type="submit" alignSelf="flex-end" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleSubmitForm(e) }}>
                Submit
            </Button>
        </div>
    );
};
export default UploadForm;
