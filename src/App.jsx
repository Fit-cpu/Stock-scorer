import React, { useState } from 'react';


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


const handleSearch = () => {
const fetchedValues = { ...DEMO_VALUES };
setValues(fetchedValues);
const computed = computeScore(fetchedValues);
setScore(computed);
};


return (
<div className="max-w-3xl mx-auto p-6 font-sans">
<h1 className="text-3xl font-bold mb-4">Stock Buy Score</h1>
<p className="mb-6 text-gray-600">Enter a stock ticker to calculate its Buy Score (0-100).</p>
<div className="flex mb-6">
<input
type="text"
placeholder="Ticker e.g. TSM"
className="flex-1 border rounded-l px-3 py-2"
value={ticker}
onChange={e => setTicker(e.target.value.toUpperCase())}
/>
<button className="bg-blue-600 text-white px-4 rounded-r" onClick={handleSearch}>Search</button>
</div>


{score && (
<div className="bg-gray-50 p-6 rounded shadow">
<h2 className="text-2xl font-semibold mb-4">{ticker} Buy Score: {score.finalScore.toFixed(1)}/100</h2>
<ul className="space-y-1">
<li>Financial Strength: {(score.financial*100).toFixed(1)}</li>
<li>Profitability: {(score.profitability*100).toFixed(1)}</li>
<li>Growth: {(score.growth*100).toFixed(1)}</li>
<li>Valuation: {(score.valuation*100).toFixed(1)}</li>
<li>Market & Competitive: {(score.market*100).toFixed(1)}</li>
</ul>
</div>
)}


{!score && <p className="text-gray-500">Enter a ticker and click Search to see the Buy Score.</p>}
</div>
);
}
