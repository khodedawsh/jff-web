async function main() {
  const url = document.getElementById('url').value;
  const code = document.getElementById('code').value || null;

  const apiToken = generateToken();
  const returnedConfigs = [];
  const returnedHashes = new Set();
  let osErrors = 0;

  for (let i = 0; i < 3; i++) {
    try {
      const response = await requestConfigs(url, apiToken, code);
      for (const config of response.configs) {
        if (returnedHashes.has(config.hash)) {
          continue;
        }
        returnedConfigs.push({
          link: config.url,
          hash: config.hash,
          fragment: config.use_fragment,
        });
        returnedHashes.add(config.hash);
      }
      document.getElementById('result').innerText = JSON.stringify(returnedConfigs);
      return;
    } catch (error) {
      if (error instanceof OSError && osErrors > 3) {
        throw error;
      }
      continue;
    }
  }
} 