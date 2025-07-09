const Parser = require('rss-parser');
const Article = require('./models/Article');

const parser = new Parser();

const sources = [
  'https://bookriot.com/feed/',
  'https://www.theguardian.com/books/rss',
  'https://www.npr.org/rss/rss.php?id=1032'
];

async function fetchRSSArticles(io) {
  try {
    const fetchedArticles = [];

    for (const url of sources) {
      try {
        const feed = await parser.parseURL(url);
        for (const item of feed.items) {
          if (item.title && item.link) {
            fetchedArticles.push({
              title: item.title,
              desc: item.contentSnippet || item.content || 'No description',
              link: item.link,
              createdAt: new Date()
            });
          }
        }
      } catch (err) {
        console.warn(`⚠️ Could not fetch from ${url}:`, err.message);
      }
    }

    // ✅ Only replace articles if we fetched at least 13 unique ones
    const uniqueArticles = fetchedArticles
      .filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)
      .slice(0, 13);

    if (uniqueArticles.length >= 13) {
      await Article.deleteMany({});
      const inserted = await Article.insertMany(uniqueArticles);
      console.log(`✅ Inserted ${inserted.length} new articles`);

      inserted.forEach(article => io.emit('new-article', article));
    } else {
      console.warn(`⚠️ Only ${uniqueArticles.length} valid articles found. Skipping DB update.`);
    }

  } catch (error) {
    console.error('❌ Error fetching RSS articles:', error.message);
  }
}

module.exports = fetchRSSArticles;
