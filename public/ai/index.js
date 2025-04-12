const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPullRequests, getPullDiff } = require('./github');
const { analyzePRDiff } = require('./pullAnalyzer');
const { runTestsForPR } = require('./testRunner');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/codeReviewDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ReviewSchema = new mongoose.Schema({
  code: String,
  verdict: String,
  feedback: String,
});
const Review = mongoose.model('Review', ReviewSchema);

// Manual code review
app.post('/api/review', async (req, res) => {
  const { code } = req.body;
  try {
    const { data } = await axios.post('http://localhost:5000/analyze', { code });
    const review = new Review({ code, verdict: data.verdict, feedback: data.feedback });
    await review.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'AI Analysis Failed', details: err.message });
  }
});

// GitHub Pulls
app.get('/api/pulls', async (req, res) => {
  const pulls = await getPullRequests();
  res.json(pulls);
});

// PR diff review
app.get('/api/pulls/:number/analyze', async (req, res) => {
  const results = await analyzePRDiff(req.params.number);
  res.json(results);
});

// Run tests for PR
app.get('/api/pulls/:number/test', async (req, res) => {
  try {
    const result = await runTestsForPR(req.params.number);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Test failed', details: err.message });
  }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPullRequests, getPullDiff } = require('./github');
const { analyzePRDiff } = require('./pullAnalyzer');
const { runTestsForPR } = require('./testRunner');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/codeReviewDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ReviewSchema = new mongoose.Schema({
  code: String,
  verdict: String,
  feedback: String,
});
const Review = mongoose.model('Review', ReviewSchema);

// Manual code review
app.post('/api/review', async (req, res) => {
  const { code } = req.body;
  try {
    const { data } = await axios.post('http://localhost:5000/analyze', { code });
    const review = new Review({ code, verdict: data.verdict, feedback: data.feedback });
    await review.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'AI Analysis Failed', details: err.message });
  }
});

// GitHub Pulls
app.get('/api/pulls', async (req, res) => {
  const pulls = await getPullRequests();
  res.json(pulls);
});

// PR diff review
app.get('/api/pulls/:number/analyze', async (req, res) => {
  const results = await analyzePRDiff(req.params.number);
  res.json(results);
});

// Run tests for PR
app.get('/api/pulls/:number/test', async (req, res) => {
  try {
    const result = await runTestsForPR(req.params.number);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Test failed', details: err.message });
  }
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
