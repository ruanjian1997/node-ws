const jsvms = require('jsvms');
const UUID = process.env.UUID || '3e08b708-1978-426e-b34b-b2351e59dcac';
const protocol = process.env.PROROCOL || 'vmess';
const vmport = process.env.VMESS_PORT || 8080;
const wspath = process.env.WSPATH || '/ws';
const type = process.env.TYPE || 'ws';

const config = {
    inbounds: [{
        tag: 'vms-ws-in',
        protocol: protocol,
        networks: [{
            type: type,
            address: '0.0.0.0',
            port: vmport,
            option: {
                path: wspath
            }
        }],
        users: [{
            id: UUID,
            alterId: 0,
            security: 'auto'
        }]
    }],
    outbounds: [{
        protocol: 'freedom'
    }]
};

const server = jsvms.config(config);
server.start();
console.log(`${type} server is running on port ${vmport}`);
process.on('SIGINT', () => {
    console.log('\n[SHUTDOWN] Shutting down server...');
    server.stop();
    console.log('[SHUTDOWN] Server closed');
    process.exit(0);
});
