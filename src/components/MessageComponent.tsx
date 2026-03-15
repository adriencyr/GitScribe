import { Button } from "@chakra-ui/react"

const MessageComponent = function({message}:{message:string}){
return(
    <li className="commit-message">
        <p>{message}</p>
        <Button onClick={()=>{navigator.clipboard.writeText(message)}}>Copy</Button>
    </li>
)
}

export default MessageComponent;