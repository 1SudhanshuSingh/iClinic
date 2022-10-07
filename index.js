const qrcode = require("qrcode-terminal");
const bot = require("./bot.json");

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

client.on("message", (message) => {
  const { body, type, from, isNewMsg } = message;
  if (body !== "") {
    client.sendMessage(from, bot.greetings.welcome);
    const level1Reply = bot.questionLevelOne.map(
      (ques) => `${ques.id}. ${ques.question} \n`
    );
    level1Reply.map((lvl) => {
      client.sendMessage(from, lvl);
    });
  }
});
