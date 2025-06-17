import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import WaitingRoom from "../components/WaitingRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "../components/ChatRoom";


export const ChatWindow = () => {
    const [conn, SetConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    const JoinChatRoom = async (username, chatRoom) => {
        try {

            const conn = new HubConnectionBuilder()
                .withUrl(`http://localhost:5135/chatHub`)
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("JoinSpecificChatRoom", (username, msg) => {
                setMessages(messages => [...messages, { username, msg }]);
                setUsername(username);

            });



            conn.on("ReceiveSpecificMessage", (username, msg) => {

                setMessages(messages => [...messages, { username, msg }]);


            });

            conn.on("ReceiveMessages", (messagesHistory) => {
                setMessages(messagesHistory.map(m => ({ msg: m.messageText })));


            });



            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", {
                username: username,
                chatroom: chatRoom
            });
            await conn.invoke("OnConnect", {Id : chatRoom});
            SetConnection(conn);


        } catch (error) {
            console.log("Error joining chat room:", error);
        }

    }

    const sendMessage = async (message, username) => {
        try {
            await conn.invoke("SendMessage", message, username);
        } catch (error) {
            console.log("Error sending message:", error);
        }
    }

    

    return (
        <Container>
            <Row class='px-5 my-5'>
                <Col sm={12}>
                    <h1 className='font-weight-light'>Welcome to the chat</h1>
                </Col>
            </Row>
            {!conn
                ? <WaitingRoom JoinChatRoom={JoinChatRoom} ></WaitingRoom>
                : <ChatRoom messages={messages} sendMessage={sendMessage} username={username}></ChatRoom>
            }
        </Container >
    );
}