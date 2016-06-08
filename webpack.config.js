var getConfig = require('hjs-webpack');

module.exports = getConfig({
	in: 'src/js/index.js',
	out: 'dist',
	clearBeforeBuild: true
});