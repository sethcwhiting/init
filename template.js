const { toISO, prettyDate } = require('./utils');

const template = (item, lines) => /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${item.title}">
  <title>${item.title} | Init Podcast Episode ${item['itunes:episode']}</title>
  <meta name="keywords" content="${item['itunes:keywords']}">
  <meta name="author" content="Jake Pacheco and Seth Whiting">
  <link rel="canonical" href="https://www.init.show/episode/${item['itunes:episode']}" />

  <link rel="apple-touch-icon" sizes="180x180" href="../../assets/images/icon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="../../assets/images/icon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../../assets/images/icon/favicon-16x16.png">
  <link rel="manifest" href="../../assets/images/icon/site.webmanifest">
    <!-- Add any other SEO-related meta tags here -->

  <!-- Add any stylesheets, fonts, or other assets here -->
  <link rel="stylesheet" href="../../style.css">
</head>
<body>
  <!-- Add your website's header, navigation, and any other global elements here -->

  <main>
    <a href="../../" style="color: white; text-decoration: none;"><h1>INIT</h1></a>
    
    <!-- Add your podcast's episodes here, along with any relevant metadata such as title, description, date, etc. -->
    <!-- Add audio element below with /assets/audio/episode-1.mp3 as the source -->
    <audio controls>
      <source src="${item.enclosure['@_url']}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <h2>Episode ${item['itunes:episode']}: ${item.title}</h2>
    <p>Published: <time datetime='${toISO(item.pubDate)}'>${prettyDate(item.pubDate)}</time></p>
    
    ${item.description}

    <h3 style="margin-top: 60px;">(Auto-Generated) Episode Transcript:</h3>

    ${lines}

  </main>

  <!-- Add your website's footer, including any copyright or legal information, here -->

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-W3KLVQ3NQF"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-W3KLVQ3NQF');
  </script>
  </body>
</html>
`;

module.exports = { template };
