import {Server, Socket} from 'socket.io';
import { generateResponse } from './GenerateResponseSocket';

const MenuSocket = async (socket:Socket, io: Server) => {
    generateResponse(socket, io);
}

export default MenuSocket;