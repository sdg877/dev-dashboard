const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

router.get('/github/:username', auth, async (req, res) => {
  const { username } = req.params;
  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);

    res.json({
      profile: userRes.data,
      repos: reposRes.data
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'GitHub user not found or error fetching data' });
  }
});

router.post('/github/oauth/token', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    if (response.data.error) {
      return res.status(400).json({ error: response.data.error_description || 'OAuth error' });
    }

    res.json(response.data); 
  } catch (err) {
    console.error('GitHub OAuth token exchange failed:', err.message);
    res.status(500).json({ error: 'Failed to exchange code' });
  }
});

module.exports = router;
