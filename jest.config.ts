import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    preset: "ts-jest",
    collectCoverage: true,
    // testEnvironment: "node",
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!variables/.*)"
    ]
};

export default config;