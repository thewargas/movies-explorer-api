const allowedCors = [
  'https://thewargas.nomoreparties.co',
  'http://thewargas.nomoreparties.co',
  'https://api.movies-thewargas.nomoredomains.rocks',
  'http://api.movies-thewargas.nomoredomains.rocks',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
