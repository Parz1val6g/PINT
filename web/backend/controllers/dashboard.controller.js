const dashboardData = require('../data/dashboard.mock');

exports.getDashboardData = (req, res) => {
  res.json(dashboardData);
};
