# Webhook Signature Validator

**Problem:** A public webhook must not trust incoming messages just because they reach an endpoint.

**Solution:** HMAC-SHA256 signature generation and constant-time verification on **raw request bytes**.

```js
import { signPayload, verifyPayload } from './index.js';
const body = Buffer.from('{"event":"demo"}');
const secret = process.env.WEBHOOK_SECRET;
const signature = signPayload(body, secret);
console.log(verifyPayload(body, secret, signature));
```

**Security:** Use a random secret stored outside source code. Production systems also need replay protection (timestamp/nonce), rate limits and provider-specific signing conventions. Never parse and stringify JSON before verifying a raw-body signature.
