// @ts-ignore
import Peer from 'peerjs'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

export class ChatManager {

    id;
    partnerId;
    peer;
    connection;
    callConnection;

    onOpen;
    onConnectionOpen;
    onLocalStreamConnected;
    onRemoteStreamConnected;
    onDataReceived;
    onError;

    constructor(id) {

        this.id = id;
        this.peer = new Peer(id);

        this.peer.on("open", () => {
            this.onOpen && this.onOpen();
        });

        this.peer.on("error", (err) => {
            this.onError && this.onError(err);
        });

        this.peer.on('call', (call) => {
            navigator.getUserMedia({ video: true, audio: true }, (stream) => {
                this.callConnection = call;
                this.onLocalStreamConnected && this.onLocalStreamConnected(stream);
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    this.onRemoteStreamConnected && this.onRemoteStreamConnected(remoteStream);
                });
            }, (err) => {
                console.error('Failed to get local stream', err);
            });
        });

        this.peer.on('connection', (connection) => {
            connection.on('data', (data) => {
                this.onDataReceived && this.onDataReceived(data);
            });
        });

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.call = this.call.bind(this);
        this.endCall = this.endCall.bind(this);
        this.send = this.send.bind(this);
    }

    connect(id) {
        this.partnerId = id;
        this.connection = this.peer.connect(id);

        this.connection.on('open', () => {

            this.onConnectionOpen && this.onConnectionOpen();

            this.connection.on('data', (data) => {
                this.onDataReceived && this.onDataReceived(data);
            });
        });
    }

    disconnect() {
        if (this.connection) {
            this.connection.close();
        }
    }

    call(options) {

        options = options || { video: true, audio: true };

        navigator.getUserMedia(options, (stream) => {
            this.onLocalStreamConnected && this.onLocalStreamConnected(stream);
            this.callConnection = this.peer.call(this.partnerId, stream);
            this.callConnection.on('stream', (remoteStream) => {
                this.onRemoteStreamConnected && this.onRemoteStreamConnected(remoteStream);
            });
        }, (err) => {
            console.error('Failed to get local stream', err);
        });
    }

    endCall() {
        if (this.callConnection) {
            this.callConnection.close();
        }
    }

    send(data) {
        this.connection.send(data);
    }

}

export function showStream(videoElement, stream) {
    videoElement.srcObject = stream;
}