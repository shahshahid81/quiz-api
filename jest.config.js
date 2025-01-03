module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: ['**/tests/unit/**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
