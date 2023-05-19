import Subscriber from "../models/subscriber.js";

const unsubscribeCommandHandler = async (context) => {
  const chatId = context.message.chat.id;

  const subscriber = await Subscriber.findOne({
    where: { telegram_chat_id: chatId },
  });

  if (subscriber === null) {
    context.reply("Anda belum subscribe.");
    return;
  }

  await subscriber.destroy();

  context.reply("Anda berhasil unsubscribe!");
};

export default unsubscribeCommandHandler;
