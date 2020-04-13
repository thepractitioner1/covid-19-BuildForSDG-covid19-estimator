function calculateDays(duration, periodType) {
  if (periodType.toUpperCase() === 'WEEKS') {
    return duration * 7;
  }
  if (periodType.toUpperCase() === 'MONTHS') {
    return duration * 30;
  }
  return duration;
}

function calculateImpact(data) {
  const currentlyInfected = data.reportedCases * 10;
  const days = calculateDays(data.timeToElapse, data.periodType);
  const exponent = Math.trunc(days / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** exponent);
  const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const availableBedspace = 0.35 * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = Math.trunc(availableBedspace - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  const income = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const incomeSpent = infectionsByRequestedTime * income;
  const dollarsInFlight = Math.trunc(incomeSpent / days);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight

  };
}

function calculateSevereImpact(data) {
  const currentlyInfected = data.reportedCases * 50;
  const days = calculateDays(data.timeToElapse, data.periodType);
  const exponent = Math.trunc(days / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** exponent);
  const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const availableBedspace = 0.35 * data.totalHospitalBeds;
  const hospitalBedsByRequestedTime = Math.trunc(availableBedspace - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  const income = data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;
  const incomeSpent = infectionsByRequestedTime * income;
  const dollarsInFlight = Math.trunc(incomeSpent / days);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
}

function calculateEstimate(data) {
  const impact = calculateImpact(data);
  const severeImpact = calculateSevereImpact(data);
  return {
    data,
    impact,
    severeImpact
  };
}

exports.calculateEstimate = calculateEstimate;
