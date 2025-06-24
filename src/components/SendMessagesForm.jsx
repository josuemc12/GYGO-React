import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Input } from 'reactstrap';
const SendMessagesForm = ({ sendMessage, username }) => {
    const [message, setMessage] = useState('');


    return <Form onSubmit={e => {
        e.preventDefault();
        sendMessage(message,username);
        setMessage('');
    }}>
        <Row className='px-5 my-5'>
            <Col sm={12}>
                <InputGroup className='mb-3'>
                <InputGroup.Text>Chat</InputGroup.Text>
                <Form.Control
                    placeholder='Type your message here...'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                />
                </InputGroup>
            </Col>
            <Col sm={12}>
                <hr />
                <Button variant='primary' type='submit' disabled={!message}>Send</Button>
            </Col>
        </Row>

    </Form>

}


export default SendMessagesForm;