const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');

const server = new SMTPServer({
    onData(stream, session, callback) {
        let emailData = '';
        stream.on('data', (chunk) => {
            emailData += chunk.toString();
        });
        stream.on('end', () => {
            simpleParser(emailData, (err, mail) => {
                if (err) {
                    console.error('Error parsing email:', err);
                } else {
                    console.log('Email received:', mail);
                }
                callback(null, 'Message accepted');
            });
        });
    },
    disabledCommands: ['AUTH'], // Disable authentication for simplicity
});

server.listen(25, () => {
    console.log('SMTP server is running on port 25');
});
