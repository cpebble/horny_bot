const fs = require("fs").promises;
async function loadJsonFile(filename) {
  const data = await fs.readFile(`${filename}.json`)
  ret = JSON.parse(data);
  console.log(`Loaded ${filename} File`);
  return ret;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Could be safer but meh
function registerCommandFun(app, fname, fun) {
  app.commands[fname] = fun;
}

function getMessageLink(message){
  let gid = message.guild.id;
  let cid = message.channel.id;
  let mid = message.id;

  let l = `https://discord.com/channels/${gid}/${cid}/${mid}`
  return l;

}

function leftPad(message, n, c) {
  if (message.length < n)
    return leftPad(c + message, n, c)
  return message;
}
function rightPad(message, n, c) {
  if (message.length < n)
    return rightPad(message + c, n, c)
  return message;
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

module.exports = {
  "loadJsonFile": loadJsonFile,
  "getRandomInt": getRandomInt,
  "registerCommandFun": registerCommandFun,
  "timeSince": timeSince,
  "getMessageLink": getMessageLink,
  "leftPad": leftPad,
  "rightPad": rightPad
}
