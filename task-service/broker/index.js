import amqp from 'amqplib'

let channel, connection;

const connectRabbitMQ = async (retries = 5, delay = 3000) => {
    while (retries) {
        try {
            if (channel && connection) {
                return channel
            }
            connection = await amqp.connect("amqp://rabbitmq")
            channel = await connection.createChannel()
            await channel.assertQueue('task_created')
            console.log('RabbitMQ connected')
            return channel
        } catch (error) {
            console.log('Failed to connect to RabitMQ', error)
            retries--;
            await new Promise(res => setTimeout(res, delay))
            if (process.env.NODE_ENV === 'production') process.exit(1)
        }
    }
}

export default connectRabbitMQ