const { XMLParser } = require('fast-xml-parser');
const { writeFile, mkdir } = require('fs/promises');
const { template } = require('./template');

const parser = new XMLParser({
    ignoreAttributes: false,
});

(async () => {
    const data = await fetch('https://feeds.libsyn.com/473052/rss', { method: 'GET' })
        .then((response) => response.text())
        .then((str) => parser.parse(str))
        .catch(console.error);

    const item = data.rss.channel.item;
    console.log(item);

    await mkdir(`episode/${item['itunes:episode']}`);
    await writeFile(`episode/${item['itunes:episode']}/index.html`, template(item));
})();
