const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();

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

module.exports = router;
