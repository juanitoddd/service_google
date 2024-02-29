import client, { Connection, Channel } from "amqplib";
import { RabbitMsg } from "../types/rabbit";

export const rabbitPublish = async (queue: string, msg: RabbitMsg) => {
  try {
    const connection: Connection = await client.connect('amqp://rabbitmq')
    const channel:Channel = await connection.createChannel();
    const q = await channel.assertQueue(queue, {durable: true});
    console.log(`[Log] Sending to queue ${q.queue}`);
    await channel.sendToQueue(q.queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true
    });
  }
  catch(ex) {
    console.error(ex)
  }
}

export const rabbitConsume = async (queue: string, callback:Function) => {
    const conn = await client.connect('amqp://rabbitmq');    
    const channel = await conn.createChannel();    
    const q = await channel.assertQueue(queue, {durable: true});    
    console.log(`[Log] Listening to queue ${q.queue}`);
    await channel.consume(q.queue, async (msg: any) => {
        if (msg && msg.content) {
            const _msg = JSON.parse(msg.content.toString());
            // Bussiness Logic
            try {              
              await callback(_msg);
            } catch (e) {
              console.log(e);              
            }
          }      
        }, 
        {noAck: true}
    );    
}
