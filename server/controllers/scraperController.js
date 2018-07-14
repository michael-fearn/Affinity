//const io = require('./../index');

module.exports = {
    newScan: (req, res, next, socket) => {
        socket.on('new scan', () => {
            console.log('connnected in socket')
        })
    }
}