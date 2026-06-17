import crypto from 'crypto';

const AUTHOR_PASSWORD = process.env.AUTHOR_PASSWORD || 'blogadmin';
const SESSION_MS = 24 * 60 * 60 * 1000;
const sessions = new Map();

function cleanExpired() {
  const now = Date.now();
  for (const [token, expiry] of sessions) {
    if (expiry < now) sessions.delete(token);
  }
}

export function requireAuth(req, res, next) {
  cleanExpired();
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (sessions.get(token) < Date.now()) {
    sessions.delete(token);
    return res.status(401).json({ message: 'Session expired' });
  }

  req.authToken = token;
  next();
}

export function registerAuthRoutes(app) {
  app.post('/auth/login', (req, res) => {
    const { password } = req.body ?? {};
    if (!password || password !== AUTHOR_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + SESSION_MS);
    res.json({ token });
  });

  app.get('/auth/check', requireAuth, (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/auth/logout', requireAuth, (req, res) => {
    sessions.delete(req.authToken);
    res.json({ ok: true });
  });
}
