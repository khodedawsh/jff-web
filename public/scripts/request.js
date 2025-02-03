function generateIp() {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 250) + 5).join('.') + '.0';
}

function generateRequest(clientIp, providerCode = '', currentHashes = null, captchaId = '', captchaInput = '') {
  if (currentHashes === null) {
    currentHashes = ['aaa', 'bbb'];
  }
  const requestTimestamp = Math.floor(Date.now() / 1000);
  const requestTime = requestTimestamp.toString();
  const localTime = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 15);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const h1Hash = generateHash(clientIp, requestTime);

  return {
    hashes: currentHashes,
    h1: h1Hash,
    provider_code: providerCode,
    timezone: timezone,
    request_time: requestTime,
    request_timestamp: requestTimestamp,
    local_time: localTime,
    client_ip: clientIp,
    client_version: '12',
    client_source: 'a',
    captcha_id: captchaId,
    captcha_input: captchaInput,
  };
}

async function sendApiRequest(url, payload) {
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  };
  const response = await axios.post(url, payload, { headers });
  return response;
}

function showCaptchaDialog(base64Image) {
  // Create modal container
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;

  // Create modal content
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  `;

  // Create image element
  const img = document.createElement('img');
  img.src = `data:image/png;base64,${base64Image}`;
  img.style.marginBottom = '10px';

  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter captcha text';
  input.style.marginBottom = '10px';
  input.style.display = 'block';
  input.style.width = '100%';
  input.style.padding = '5px';

  // Create submit button
  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.style.padding = '5px 15px';

  // Add elements to modal
  content.appendChild(img);
  content.appendChild(input);
  content.appendChild(button);
  modal.appendChild(content);

  // Add modal to page
  document.body.appendChild(modal);

  // Return promise that resolves with user input
  return new Promise((resolve) => {
    button.onclick = () => {
      const value = input.value.trim();
      if (value) {
        document.body.removeChild(modal);
        resolve(value);
      }
    };
  });
}

async function requestConfigs(endpoint, token, providerCode = '') {
  const ip = generateIp();
  const url = `${endpoint}/backend/app_api/v7/config_fetch/?token=${token}`;

  for (let i = 0; i < 3; i++) {
    const req = generateRequest(ip, providerCode);
    const payload = encryptRequest(JSON.stringify(req));

    try {
      const response = await sendApiRequest(url, payload);
      const plainResponse = decryptResponse(response.data);
      const responseDict = JSON.parse(plainResponse);

      if (responseDict.is_captcha) {
        const captchaAnswer = await showCaptchaDialog(responseDict.captcha_img);
        req.captcha_id = responseDict.captcha_id;
        req.captcha_input = captchaAnswer;
        const newPayload = encryptRequest(JSON.stringify(req));
        const newResponse = await sendApiRequest(url, newPayload);
        const newPlainResponse = decryptResponse(newResponse.data);
        const newResponseDict = JSON.parse(newPlainResponse);
        return newResponseDict;
      }

      return responseDict;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        throw new Error('Authentication credentials were not provided.');
      }
    }
  }

  throw new Error('Connection refused after multiple attempts');
}
