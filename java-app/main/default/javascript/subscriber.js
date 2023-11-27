<script src="https://cdn.jsdelivr.net/cometd/4.0.4/cometd.js"></script>

let cometd = new org.cometd.CometD();
cometd.configure({
    url: 'http://your-server-domain/cometd', // URL to CometD server endpoint
});
cometd.handshake();

cometd.addListener('/sharePrice', function(message) {
    console.log('Received message:', message);
    // Your logic to handle the received message goes here
});
cometd.subscribe('/sharePrice');