import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen';
import MessageList from './components/MessageList/index';

class Chat extends Component {

    state = {
        loading: true
    };

    render() {
        const { loading } = this.state;

        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 1000);

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
