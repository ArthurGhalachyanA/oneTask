const socketAuthMiddleware = require('../middlewares/socketAuthMiddleware');

class SocketService{
    static sockets = new Map();

    addClient(socket){
        const userData = socketAuthMiddleware(socket.handshake.headers.authorization);
        if(!userData)
            return socket.disconnect();

        SocketService.sockets.set(userData.id, socket);
        this.addMappingTo(socket);
    }

    addMappingTo(socket){
        // socket.on('disconnect', () => this.disconnect(socket.id));
    }

    disconnect(userId){
        const userSocket = this.getClientById(userId);
        userSocket.disconnect();
        this.removeSocketById(userId);
    }

    getClientById(id){
        return SocketService.sockets.get(id);
    }

    removeSocketById(userId){
        return SocketService.sockets.delete(userId);
    }

    sendNewRssCountTo(userId, newRssCount){
        const userSocket = this.getClientById(userId);
        if(userSocket)
            userSocket.emit('new-rss', {newRssCount});
    }
}

// SocketService.sockets = SocketService.sockets || new Map();

module.exports = new SocketService();