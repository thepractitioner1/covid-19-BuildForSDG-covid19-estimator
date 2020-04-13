const { calculateEstimate } = require('./calculateEstimates');

const covid19ImpactEstimator = (data) => calculateEstimate(data);

export default covid19ImpactEstimator;
