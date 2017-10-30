/// <binding ProjectOpened='Watch - Development' />
var environment = (process.env.NODE_ENV || "development").trim();

if (environment === "development") {
    module.exports = require('./config/webpack.dev.js');
}
else if (environment === "test") {
    module.exports = require('./config/webpack.test.js');
}
else {
    module.exports = require('./config/webpack.prod.js');
}