const { server } = require('./app');
const config = require('./utils/config');

server.listen(config.PORT, () => console.log(`connected to server ${config.PORT}`));
