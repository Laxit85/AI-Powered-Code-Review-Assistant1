const axios = require('axios');
require('dotenv').config();

const GITHUB_API = 'https://api.github.com';
const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  'User-Agent': 'AI-Code-Reviewer',
};

async function getPullRequests() {
  const { data } = await axios.get(`${GITHUB_API}/repos/${process.env.GITHUB_REPO}/pulls`, { headers });
  return data;
}

async function getPullDiff(prNumber) {
  const { data } = await axios.get(
    `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/pulls/${prNumber}`,
    { headers: { ...headers, Accept: 'application/vnd.github.v3.diff' } }
  );
  return data;
}

module.exports = { getPullRequests, getPullDiff };
