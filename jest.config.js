module.exports = {
    roots: ['tests'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testPathIgnorePatterns: ['node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'babel-jest'
    },
    testMatch: ['**/*.test.(ts|tsx)'],
    moduleNameMapper: {
    // Mocks out all these file formats when tests are run.
        '\\.(jpg|ico|jpeg|png|gif)$': '<rootDir>/src/__mocks__/fileMock.ts',
        '\\.(eot|otf|webp|svg|ttf)$': '<rootDir>/src/__mocks__/fileMock.ts',
        '\\.(woff|woff2|mp4|webm)$': '<rootDir>/src/__mocks__/fileMock.ts',
        '\\.(wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        "d3": "<rootDir>/node_modules/d3/dist/d3.min.js",
        "^d3-(.*)$": "<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js"
    }
};