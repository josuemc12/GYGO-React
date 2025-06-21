import React, { useState } from 'react';
import { use } from 'react';
import { Row ,Col,Button,Form} from 'react-bootstrap';

const WaitingRoom = ({JoinChatRoom}) => {

    const[username,setUsername]= useState();
    const[chatRoom,setChatRoom]= useState();

    return <Form onSubmit={e => {
        e.preventDefault();
        
        JoinChatRoom(username, chatRoom);
        


     }}>
        <Row className='px-5 my-5'>
            <Col sm={12}>
                <Form.Group>
                    <Form.Control placeholder='Username' 
                        onChange={e => setUsername(e.target.value)}>
                    </Form.Control>
                    <Form.Control placeholder='Chat Room'
                        onChange={e => setChatRoom(e.target.value.toLowerCase())}>
                    </Form.Control>
                    </Form.Group>
            </Col>
            <Col sm={12}>
                <hr />
                    <Button variant='success' type='submit' >Join</Button>
            </Col>
        </Row>

    </Form>
}

export default WaitingRoom;
