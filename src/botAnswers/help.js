module.exports = (bot, msg) => {
	const fromId = msg.chat.id;

	bot.sendMessage(fromId, `
	Привет.
	Это Валентин-бот, Я умею отправлять анонимные телеграмм сообщения тем, кто меня активировал.
	Если вы хотите отправить сообщение - напишите Телеграмм-логин пользователя, которому вы хотите отправить сообщение
	`);
};
