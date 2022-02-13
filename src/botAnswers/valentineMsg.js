const db = require('../db');
const {log} = require('../logger');
const fileMsg = require('./filesMsgs');

module.exports = (bot, msg) => {
	const {
		from: {
			id: userId,
			first_name: name,
			last_name: surname,
			username
		},
		text,
		chat: {
			id: fromUser
		},
		document,
		photo,
		caption
	} = msg;

	const forWhomMessage = text || caption;

	if (!forWhomMessage) {
		return bot.sendMessage(fromUser, 'К Валентинке нужно нужна подпись для кого и текст, пустые Валентинки не принимаются');
	}

	const splitted = forWhomMessage.split(' ');
	const forUser = splitted[0];
	const textMsg = splitted.slice(1).join(' ').trim();

	if (!forUser.startsWith('@')) {
		return bot.sendMessage(fromUser, 'Первым словом должен идти телеграмм-логин пользователя, начинающийся с @');
	}

	if (!textMsg && !photo) {
		return bot.sendMessage(fromUser, 'Валентинка не может быть пустой');
	}

	const registeredUser = db.getUserByName(forUser);

	if (registeredUser) {
		log(`Кто-то отправляет валентинку -> ${forUser}`);

		if (photo || document) {
			return fileMsg(bot, msg, textMsg, registeredUser.id, forUser);
		}

		bot.sendMessage(registeredUser.id, `Вам пришла Валентинка :) -> "${textMsg}"`);
		return bot.sendMessage(fromUser, `Пользователь ${forUser} только что получил вашу Валентинку 😍`);
	} else {
		const fileId = document && document.file_id;
		const photoId = photo && photo.length && photo.slice(-1)[0].file_id;

		db.saveMsg({forUser, textMsg, fromUser, photoId, fileId});

		return bot.sendMessage(fromUser, 'Этот пользователь еще не активировал бота и поэтому сообщение ему не может быть доставлено. Намекните ему 😉 что его что-то ожидает t.me/v Как только он подключится - ваша Валентинка будет ему доставлена.');
	}
};

