module.exports = {
	root: true,
	rules: {
		indent: 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
}
