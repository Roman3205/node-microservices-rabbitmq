import amqp from 'amqplib'
let connection, channel
const start = async (retries = 5, delay = 3000) => {
    while (retries) {
        try {
            connection = await amqp.connect("amqp://rabbitmq")
            channel = await connection.createChannel()
            await channel.assertQueue('task_created')
            console.log('Notification service is listening to messages')

            channel.consume('task_created', (msg) => {
                const taskData = JSON.parse(msg.content.toString())
                console.log('NEW TASK: ', taskData.title)
                console.log('NEW TASK: ', taskData)
                channel.ack(msg)
            })
            return
        } catch (error) {
            console.log('Failed to connect to RabitMQ', error)
            retries--;
            await new Promise(res => setTimeout(res, delay))
            if (process.env.NODE_ENV === 'production') process.exit(1)
        }
    }
}

start()