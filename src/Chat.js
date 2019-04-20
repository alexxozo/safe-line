import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen';

class Chat extends Component {
    render() {
        return (
            <LoadingScreen
                loading={true}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                // logoSrc='/logo.png'
                text='Here an introduction sentence (Optional)'
            >

                <div className="App">
                    <header className="App-header">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                    </a>
                    </header>
                </div>

            </LoadingScreen>
        );
    }
}

export default Chat;
