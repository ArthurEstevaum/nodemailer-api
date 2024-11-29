const fastify = require('fastify')
const nodeMailer = require('nodemailer')

let transporter = nodeMailer.createTransport({
    host: '0.0.0.0',
    port: 1025,
    secure: false,
    auth: {
        user: 'email@example.com',
        pass: 'senha',
    }
});

const mailOptions = { 
    from: 'projetox@example.com', 
    to: 'usuario@example.com', 
    subject: 'Alerta de nível de água', 
    text: 'Nível de água em X%' 
};
const fastify = fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
    transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.log(error); }
    console.log('E-mail enviado: ' + info.response); });
    return { hello: 'world' }
})

// Run the server!
try {
  fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}