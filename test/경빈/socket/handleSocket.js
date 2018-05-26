/**
 * 
 * @param {SocketIO.Namespace} io 
 */

module.exports = function(io){
    io.on('connection', function(socket){
        console.log(`Connect [$(io.name)] : $(socket.id)`);
        
        socket.on('data', function(data){
            console.log(data);
            io.emit(data);
        });
    });
};