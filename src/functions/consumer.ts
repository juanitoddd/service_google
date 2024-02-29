import { RabbitMsg } from "../types/rabbit";

const consumer = (_msg: RabbitMsg) => {
  console.log("[consumer] Google");
  console.log(_msg);
};

export default consumer;
