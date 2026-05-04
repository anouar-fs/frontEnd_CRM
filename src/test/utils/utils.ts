import { waitForElementToBeRemoved } from '@testing-library/react';


export async function waitForAppToBeReady() {
    const hydrateFallbackElementLoader = document.querySelector('.loading-screen');
    if (hydrateFallbackElementLoader) {
        await waitForElementToBeRemoved(hydrateFallbackElementLoader, { timeout: 10000 });
    }
}