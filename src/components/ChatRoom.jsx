import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessagesForm from "./SendMessagesForm";


const ChatRoom = ({ messages , sendMessage ,username}) =>

    <div>
        <Row className="px-5 py-5">
            <Col sm={12}>
                <h2 className="font-weight-light">Chat Room</h2>
            </Col>
            <Col>
            </Col>
        </Row>
        <Row className="px-5 py-5">
            <Col sm={12}>
                <MessageContainer messages={messages}/>
            </Col>
            <Col sm={12}>
                <SendMessagesForm sendMessage={sendMessage} username={username}/>
            </Col>
        </Row>

    </div>

export default ChatRoom;