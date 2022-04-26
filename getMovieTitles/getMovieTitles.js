// getMovie -> Titles from url

import { get } from 'https';

const subString = 'spiderman';

const getTotalPages = (url, callback) => {
  get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      return callback(null, JSON.parse(data).total_pages);
    });
  }).on('error', (err) => {
    return callback(err, null);
  });
};

const getMovieTitlesHelper = (urls, callback) => {
  const titles = new Array();
  let counter = 1;

  urls.forEach((url) => {
    get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => (data += chunk));

      response.on('end', () => {
        const movies = JSON.parse(data).data;

        movies.forEach((movie) => titles.push(movie.Title));

        if (counter === urls.length) {
          return callback(null, titles);
        }
        counter++;
      });
    }).on('error', (err) => {
      return callback(err, null);
    });
  });
};

const getMovieTitles = (substr) => {
  if (substr === '') {
    return null;
  }

  const url = `https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${substr}`;
  getTotalPages(url, (err, totalPages) => {
    if (err) {
      console.log('Error getting total number of available pages:', err);
    } else {
      const urls = new Array();
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        urls.push(`${url}&page=${pageNumber}`);
      }
      getMovieTitlesHelper(urls, (err, titles) => {
        if (err) {
          console.log('Error retrieving movies titles:', err);
        } else {
          titles.sort().forEach((title) => console.log(title));
        }
      });
    }
  });
};

getMovieTitles(subString);
