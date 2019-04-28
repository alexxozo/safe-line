import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen';
import MessageList from './components/MessageList/index';

import socketIo from 'socket.io-client';
import { apiUrl } from './config';

class ChatAdmin extends Component {

    state = {
        loading: true,
        chatManager: null
    };

    componentDidMount() {

        let chatManager = window.chatManager;
        console.log(this.props.location.state);
        chatManager.connect(this.props.location.state.patientId);

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
            loading: false           
        });
    }

    render() {
        const { loading } = this.state;

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

export default ChatAdmin;
