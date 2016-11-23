'use strict';

const path = require('path');
const shell = require('gulp-shell');

/**
 * @test module:index_hooks
 */
describe('gitbook-plugin-build', () => {
	const root = path.join(__dirname);
	const gitbook = path.join(__dirname, '../resources/gitbook');

	before((done) => {
		process.chdir(gitbook);

		shell.task([[
			'rm node_modules _book -rf',
			'npm install'
		].join(' && ')])(done);
	});

	after((done) => {
		shell.task([[
			'rm node_modules _book -rf'
		].join(' && ')])((err) => {
			process.chdir(root);
			done(err);
		});
	});

	it('should not create file on no flag', (done) => {
		shell.task([[
			'npm run book-build',
			'[ ! -f _book/main.tex ]'
		].join(' && ')])(done);
	});

	it('should create file on flag', (done) => {
		shell.task([[
			'npm run book-plugin',
			'[ -f _book/main.tex ]',
			'grep -q "section{Introduction}" _book/main.tex'
		].join(' && ')])(done);
	});

	it('should be possible to change format in cmd', (done) => {
		shell.task([[
			'npm run book-format',
			'[ -f _book/main.tex ]',
			'grep -q "Introduction</h1>" _book/main.tex'
		].join(' && ')])(done);
	});
});
