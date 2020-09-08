const { db } = require('../db/index');

function queryMatch(model, searchData, offset = 0) {
  const body = {
    from: offset,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchData,
              fields: [
                'content.sentence',
                'parts.sentence',
              ],
            },
          },
        ],
      },
    },
    highlight: {
      fields: {
        'content.sentence': {},
      },
    },
  };

  return db(model).esSearch(body);
}

function queryTerms(model, searchData, offset = 0) {
  const terms = searchData.split(' ');
  const body = {
    from: offset,
    query: {
      terms: {
        keywords: terms,
      },
    },
  };

  return db(model).esSearch(body);
}

// function getParagraphs(bookTitle, startLocation, endLocation) {
//   const filter = [
//     { term: { title: bookTitle } },
//     { range: { location: { gte: startLocation, lte: endLocation } } }
//   ];
//
//   const body = {
//     size: endLocation - startLocation,
//     sort: { location: 'asc' },
//     query: { bool: { filter } }
//   };
//
//   return esClient.search({ index, type, body });
// }

const search = async (ctx, next) => {
  const { query, offset } = ctx.request.query;

  const matchResult = await queryMatch('problem', query, offset);
  const termsResult = await queryTerms('problem', query, offset);
  const result = {
    match: matchResult.hits.hits,
    terms: termsResult.hits.hits,
  };

  ctx.log.info('[Route/Search] result', result);

  ctx.body = result;
};

// const paragraphs = async (ctx, next) => {
//   const { bookTitle, start, end } = ctx.request.query;
//   ctx.body = await getParagraphs(bookTitle, start, end);
// };

module.exports = {
  search,
  // paragraphs
};
