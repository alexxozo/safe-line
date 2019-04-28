import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import './MessageList.css';

const MY_USER_ID = 'me';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      messages: [],
    };
    
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  componentDidMount(){
    window.addEventListener('message-received', (e) => {
      this.receiveMessage(e.message);
    }, false);
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }

  addMessage = (event) => {
    this.setState(prevState => {

      window.chatManager.send(prevState.inputText);

      return {
        ...prevState,
        messages: [...prevState.messages, {
          author: 'me',
          message: prevState.inputText,
          timestamp: new Date().getTime()
        }],
        inputText: ""
      }
    });
  };

  receiveMessage = (message) => {
    this.setState(prevState => {
      return {
        ...prevState,
        messages: [...prevState.messages, {
          author: 'other',
          message: message,
          timestamp: new Date().getTime()
        }]
      }
    });
  }

  updateInput = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  }

  render() {
    const { inputText } = this.state;
    return (
      <div className="message-list">
        <Toolbar
          title="Te-ai conectat cu Gigel"
          rightItems={[
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose text={this.state.inputText} onInputChange={this.updateInput} rightItems={[
          <ToolbarButton onClick={this.addMessage} key="send" icon="ion-ios-send" />
        ]} />
      </div>
    );
  }
}