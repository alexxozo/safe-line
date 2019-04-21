import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen';
import MessageList from './components/MessageList/index';

import socketIo from 'socket.io-client';
import { apiUrl } from './config';

class Chat extends Component {

    state = {
        loading: true,
        socket: null,
    };

    componentWillMount() {
        const socket = socketIo(`${apiUrl}/patient`);
        console.log(this.props.location.state.id);
        const { id } = this.props.location.state;
        socket.emit('patientId', id);
        socket.on('pairFound', (/*roomId*/) => {
            // Connect to chat room.
            this.setState({
                loading: false,                
            });
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

                <div className="scrollable content">
                    <MessageList />
                </div>

            </LoadingScreen>
        );
    }
}

export default Chat;
