import axios from "axios";

async function filesUpload(old_file, new_file, num_msgs, user_id) {
    try {
        const formData = new FormData();
        formData.append("old_file", old_file)
        formData.append("new_file", new_file)
        formData.append("num_msgs", num_msgs)
        formData.append("user_id", user_id)

        const response = await axios.post("http://localhost:8000/postData", formData, {});
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}