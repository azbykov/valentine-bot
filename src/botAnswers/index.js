const start = require('./start');
const help = require('./help');

module.exports = function(msg) {
	const bot = this;
	const fromId = msg.chat.id;
	const {
		from: {
			id: userId,
			first_name: name,
			last_name: surname,
			username
		},
		text,
		chat: {
			id: chatId
		}
	} = msg;


	if (text === '/start') {
		return start(bot, msg);
	}
	if (text === '/help') {
		return help(bot, msg);
	}

};
