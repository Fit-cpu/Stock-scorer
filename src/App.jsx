import React, { useState } from 'react';


// Normalization functions to map raw metrics to 0-1 scale
const normalize = {
debtToEquity: x => Math.max(0, Math.min(1, (2 - x) / 2)),
currentRatio: x => Math.min(1, x / 2),
fcfYield: x => Math.min(1, x / 20),


grossMargin: x => Math.min(1, x / 50),
opMargin: x => Math.min(1, x / 40),
roic: x => Math.min(1, x / 20),


revGrowth: x => Math.min(1, x / 30),
epsGrowth: x => Math.min(1, x / 30),


forwardPE: x => Math.max(0, Math.min(1, (40 - x) / 40)),
peg: x => Math.max(0, Math.min(1, (2 - x) / 2)),
priceToFcf: x => Math.max(0, Math.min(1, (30 - x) / 30)),


oneToFive: x => (x - 1) / 4,
customerConcentration: x => (5 - x) / 4
};


// Demo fallback metrics for testing
const DEMO_VALUES = {
debtToEquity: 0.22,
currentRatio: 2.37,
fcfYield: 2.87,


grossMargin: 58.58,
opMargin: 48.77,
roic: 19.79,


revGrowth: 39.0,
epsGrowth: 19.0,


forwardPE: 25.9,
peg: 1.27,
priceToFcf: 34.82,


moatScore: 4,
managementScore: 4,
guidanceScore: 3.5,
customerConcentration: 2
};


// Compute the buy score based on normalized metrics
function computeScore(values) {
const financial = 0.4*normalize.debtToEquity(values.debtToEquity) + 0.2*normalize.currentRatio(values.currentRatio) + 0.4*normalize.fcfYield(values.fcfYield);
const profitability = 0.3*normalize.grossMargin(values.grossMargin) + 0.3*normalize.opMargin(values.opMargin) + 0.4*normalize.roic(values.roic);
const growth = 0.5*normalize.revGrowth(values.revGrowth) + 0.5*normalize.epsGrowth(values.epsGrowth);
const valuation = 0.5*normalize.forwardPE(values.forwardPE) + 0.3*normalize.peg(values.peg) + 0.2*normalize.priceToFcf(values.priceToFcf);
const market = 0.3*normalize.oneToFive(values.moatScore) + 0.3*normalize.oneToFive(values.managementScore) + 0.2*normalize.oneToFive(values.guidanceScore) + 0.2*normalize.customerConcentration(values.customerConcentration);
const combined = 0.2*financial + 0.2*profitability + 0.2*growth + 0.2*valuation + 0.2*market;
return {
financial, profitability, growth, valuation, market, finalScore: combined*100
};
}


export default function StockBuyScoreApp() {
const [ticker, setTicker] = useState('');
const [values, setValues] = useState(null);
const [score, setScore] = useState(null);
}
