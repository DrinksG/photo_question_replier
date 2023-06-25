import io, { Socket } from 'socket.io-client';

interface Webnfig {
    url: string;
}

class WebSocket {
    socket:Socket;
    
    constructor(private webnfig?:Webnfig){
        if(!webnfig)
            this.webnfig = {url: 'http://localhost:3001'};

        this.socket = io(this.webnfig!.url) as Socket;
    }

}

export let socket:Socket;

export const runSocket = () => {
    socket = new WebSocket().socket;
}

export const disconnectSocket = () => {
    socket = new WebSocket().socket;
}

export default WebSocket;
