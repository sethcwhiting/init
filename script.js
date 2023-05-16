const { XMLParser } = require('fast-xml-parser');
const { writeFile, mkdir, readFile, readdir } = require('fs/promises');
const { template } = require('./template');

const parser = new XMLParser({
    ignoreAttributes: false,
});

(async () => {
    const data = await fetch('https://feeds.libsyn.com/473052/rss', { method: 'GET' })
        .then((response) => response.text())
        .then((str) => parser.parse(str))
        .catch(console.error);

    const item = data.rss.channel.item[0];
    const existingEpisodes = await readdir('./episode/');
    const ep = item['itunes:episode'];
    const li = /* html */ `         <li>
            <a href="episode/${ep}">
                <h3>${item.title}</h3>
                <p>Episode ${ep} - ${item.pubDate}</p>
            </a>
        </li>`;
    const indexString = await readFile('index.html', 'utf8');
    const updated = indexString.replace(/<ul>/g, `<ul>\n${li}`);
    await writeFile('index.html', updated);
    if (existingEpisodes[existingEpisodes.length - 1] === `${ep}`) return;
    const transcript = await readFile(`transcripts/episode-${ep}.html`, 'utf8');
    const regex = /<p>(.*?)<\/p>/g;
    const lines = transcript.match(regex).join('\n');

    await mkdir(`episode/${ep}`);
    await writeFile(`episode/${ep}/index.html`, template(item, lines));
})();
