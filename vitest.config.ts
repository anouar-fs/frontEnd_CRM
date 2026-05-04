import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'istanbul',
            reporter: ['lcov', 'text'],
            include: ['src/**/*.tsx', 'src/**/*.ts'],
            exclude: [
                'public/',
                'src/main.tsx',
                'src/**/index.ts',
                'src/**/*.spec.tsx',
                'src/tests/**/*',
                'src/infrastructure/config.ts',
                'src/infrastructure/mocks/*',
                'src/presentation/config.ts',
                'src/presentation/tagging/*',
                'src/presentation/components/ChatGenesys/fakeGenesysScript.ts',
                'src/presentation/components/ChatGenesys/genesysScript.ts',
            ],
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setupTests.ts'],
    }
})