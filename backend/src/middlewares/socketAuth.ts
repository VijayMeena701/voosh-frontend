import { Socket } from 'socket.io';
import StatusCodes from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { decodeJwt } from '../utils/decodeJwt';

export const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.query.token as string;
    if (token) {
        const decoded = decodeJwt(token);
        if (!decoded) {
            const error = new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication error');
            socket.emit('error', error); // Emit error to client
            socket.disconnect(); // Disconnect the socket
            return;
        }

        next();
    } else {
        const error = new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication error');
        socket.emit('error', error); // Emit error to client
        socket.disconnect(); // Disconnect the socket
    }
};
