import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen';
import MessageList from './components/MessageList/index';

import socketIo from 'socket.io-client';
import { apiUrl } from './config';
import { ChatManager } from './ChatManager';

class Chat extends Component {

    state = {
        loading: true,
        socket: null,
        chatManager: null
    };

    componentWillMount() {
        const socket = socketIo(`${apiUrl}/patient`);
        
        const { id } = this.props.location.state;
        socket.emit('patientId', id);
        socket.on('pairFound', (psychologistId) => {

            let chatManager = window.chatManager = new ChatManager(`sixinchesunbuffed_${id}`);

            chatManager.onOpen = () => {

                chatManager.connect(psychologistId);
                chatManager.call({ 
                    video: true, 
                    audio: true 
                });

                chatManager.onRemoteStreamConnected = (stream) => {
                    document.getElementById("remote-stream").srcObject = stream;
                };

                chatManager.onLocalStreamConnected = (stream) => {
                    document.getElementById("local-stream").srcObject = stream;
                };

                chatManager.onDataReceived = (message) => {
                    console.log(message);
                    let event = new Event('message-received');
                    event.message = message;

                    window.dispatchEvent(event);
                };

                this.setState({
                    chatManager,
                    loading: false,                
                });
            };
        });
        this.setState({ socket });
    }

    render() {
        const { loading } = this.state;

        // setTimeout(() => {
        //     this.setState({
        //         loading: false,
        //     })
        // }, 1000);

        return (
            <LoadingScreen
                loading={loading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text='Cererea ta se proceseaza :)'
            >
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                    <div style={{
                        display: "block",
                        width: "30vw",
                        height: "100vh"
                    }}>
                        <video style={{
                            width: "30vw",
                            marginBottom: "45px"
                            // height: "50vh"
                        }} id="local-stream" autoPlay={true} muted></video>
                        <video style={{
                            position: "relative",
                            bottom: "0",
                            width: "30vw",
                        }} id="remote-stream" autoPlay={true}></video>
                    </div>

                    <div style={{
                        display: "block",
                        position: "relative",
                        width: "70vw",
                        height: "100vh"
                    }}>
                        <MessageList />
                    </div>
                </div>

            </LoadingScreen>
        );
    }
}

export default Chat;
