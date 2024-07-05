import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

async function main() {
    const publisher = createClient({
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });

    const subscriber = createClient({
        password: process.env.REDIS_PASS,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });

    try {
        // Conectar ambos, publicador y suscriptor
        await publisher.connect();
        await subscriber.connect();
        console.log('Clientes de Redis están conectados y listos.');

        // Suscribirse a un canal
        subscriber.subscribe('notificaciones', (message) => {
            console.log(`Mensaje recibido: ${message}`);
        });

        // Publicar un mensaje después de un corto retraso para asegurar que el suscriptor esté listo
        setTimeout(async () => {
            await publisher.publish('notificaciones', 'Hola desde Redis!');
            console.log('Mensaje enviado');
        }, 1000);

    } catch (error) {
        console.error('Error durante las operaciones de Redis:', error);
    } finally {
        // Cerrar ambos clientes después de un retraso
        setTimeout(async () => {
            await publisher.quit();
            await subscriber.quit();
            console.log('Clientes de Redis cerrados.');
        }, 3000); 
    }
}

main();
