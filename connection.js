import mongoose from 'mongoose'

export default (uri) => {
  mongoose.connect(uri)
  mongoose.Promise = Promise

  mongoose.connection.on('connected', () => {
        console.log('MongoDB conectado em: '+uri);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB desconectado');
    });
    mongoose.connection.on('error', (e) => {
        console.log('Erro ao conectar com o MongoDB: '+e);
    });
    process.on('SIGNT', () => {
        mongoose.connection.close(() => {
            console.log("Conexão com MongoDB encerrada pela aplicação");
            process.exit(0);
        });
    });
}
