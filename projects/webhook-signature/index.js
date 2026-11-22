import { createHmac, timingSafeEqual } from 'node:crypto';

export function signPayload(payload, secret) {
  if (typeof secret !== 'string' || secret.length < 16) throw new Error('Use a strong secret');
  const bytes = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  return 'sha256=' + createHmac('sha256', secret).update(bytes).digest('hex');
}

export function verifyPayload(payload, secret, signature) {
  if (typeof signature !== 'string' || !/^sha256=[a-f0-9]{64}$/i.test(signature)) return false;
  try {
    const expected = Buffer.from(signPayload(payload, secret));
    const actual = Buffer.from(signature.toLowerCase());
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
