Sakura & Seoul Journal v7.1 cache fix

This build fixes the issue where the deployed site could open in Private/Incognito mode but fail or show an old build in a normal browser.

Deployment:
1. Replace the existing GitHub Pages files with ALL files in this ZIP.
2. Commit/push and wait for GitHub Pages deployment to finish.
3. Open the normal browser URL once and refresh. The new service worker takes control automatically.

The offline service worker now uses network-first navigation and a new cache version so future deployments do not get trapped behind an old cached index.html.
