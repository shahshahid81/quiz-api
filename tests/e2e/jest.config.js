module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: ['**/tests/e2e/**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
