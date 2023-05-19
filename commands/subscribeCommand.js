import Subscriber from "../models/subscriber.js";

const subscribeCommandHandler = async (context) => {
  const chatId = context.message.chat.id;

  const subscriber = await Subscriber.findOne({
    where: { telegram_chat_id: chatId },
  });

  if (subscriber !== null) {
    context.reply("Anda sedang subscribe saat ini.");
    return;
  }

  await Subscriber.create({ telegram_chat_id: chatId });

  context.reply("Anda berhasil subscribe!");
};

export default subscribeCommandHandler;
