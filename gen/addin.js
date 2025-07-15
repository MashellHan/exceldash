
// ============ AI Generated Code ============

const rawData = [
  {
    chartData: [
      // Year, Week, Downloads, Week_Start, Week_Label, Growth_Rate, 4_Week_Moving_Avg, iOS_Downloads, Android_Downloads
      [2023, 18, 1000000, "2023-05-01", "2023-05-01", null, null, 600000, 400000],
      [2023, 19, 1050000, "2023-05-08", "2023-05-08", 5.0, null, 630000, 420000],
      [2023, 20, 950000, "2023-05-15", "2023-05-15", -9.52, null, 570000, 380000],
      [2023, 21, 1000000, "2023-05-22", "2023-05-22", 5.26, 1000000, 600000, 400000],
      [2023, 22, 3500000, "2023-05-29", "2023-05-29", 250.0, 1625000, 2100000, 1400000],
      [2023, 23, 3600000, "2023-06-05", "2023-06-05", 2.86, 2262500, 2160000, 1440000],
      [2023, 24, 3400000, "2023-06-12", "2023-06-12", -5.56, 2875000, 2040000, 1360000],
      [2023, 25, 3500000, "2023-06-19", "2023-06-19", 2.94, 3500000, 2100000, 1400000],
      [2023, 26, 2500000, "2023-06-26", "2023-06-26", -28.57, 3250000, 1500000, 1000000],
      [2023, 27, 2600000, "2023-07-03", "2023-07-03", 4.0, 3000000, 1560000, 1040000],
      [2023, 28, 2400000, "2023-07-10", "2023-07-10", -7.69, 2750000, 1440000, 960000],
      [2023, 29, 2500000, "2023-07-17", "2023-07-17", 4.17, 2500000, 1500000, 1000000],
      [2023, 30, 3500000, "2023-07-24", "2023-07-24", 40.0, 2750000, 2100000, 1400000],
      [2023, 31, 3600000, "2023-07-31", "2023-07-31", 2.86, 3000000, 2160000, 1440000],
      [2023, 32, 3400000, "2023-08-07", "2023-08-07", -5.56, 3250000, 2040000, 1360000],
      [2023, 33, 3500000, "2023-08-14", "2023-08-14", 2.94, 3500000, 2100000, 1400000],
      [2023, 34, 3000000, "2023-08-21", "2023-08-21", -14.29, 3375000, 1800000, 1200000],
      [2023, 35, 3100000, "2023-08-28", "2023-08-28", 3.33, 3250000, 1860000, 1240000],
      [2023, 36, 2900000, "2023-09-04", "2023-09-04", -6.45, 3125000, 1740000, 1160000],
      [2023, 37, 3000000, "2023-09-11", "2023-09-11", 3.45, 3000000, 1800000, 1200000],
      [2023, 38, 3100000, "2023-09-18", "2023-09-18", 3.33, 3025000, 1860000, 1240000],
      [2023, 39, 2900000, "2023-09-25", "2023-09-25", -6.45, 2975000, 1740000, 1160000],
      [2023, 40, 2500000, "2023-10-02", "2023-10-02", -13.79, 2875000, 1500000, 1000000],
      [2023, 41, 2600000, "2023-10-09", "2023-10-09", 4.0, 2775000, 1560000, 1040000],
      [2023, 42, 2400000, "2023-10-16", "2023-10-16", -7.69, 2600000, 1440000, 960000],
      [2023, 43, 2500000, "2023-10-23", "2023-10-23", 4.17, 2500000, 1500000, 1000000],
      [2023, 44, 2200000, "2023-10-30", "2023-10-30", -12.0, 2425000, 1320000, 880000],
      [2023, 45, 2300000, "2023-11-06", "2023-11-06", 4.55, 2350000, 1380000, 920000],
      [2023, 46, 2200000, "2023-11-13", "2023-11-13", -4.35, 2300000, 1320000, 880000],
      [2023, 47, 2300000, "2023-11-20", "2023-11-20", 4.55, 2250000, 1380000, 920000],
      [2023, 48, 2700000, "2023-11-27", "2023-11-27", 17.39, 2375000, 1620000, 1080000],
      [2023, 49, 2800000, "2023-12-04", "2023-12-04", 3.7, 2500000, 1680000, 1120000],
      [2023, 50, 2700000, "2023-12-11", "2023-12-11", -3.57, 2625000, 1620000, 1080000],
      [2023, 51, 2800000, "2023-12-18", "2023-12-18", 3.7, 2750000, 1680000, 1120000],
      [2023, 52, 3200000, "2023-12-25", "2023-12-25", 14.29, 2875000, 1920000, 1280000],
      [2024, 1, 3300000, "2024-01-01", "2024-01-01", 3.13, 3000000, 1980000, 1320000],
      [2024, 2, 3200000, "2024-01-08", "2024-01-08", -3.03, 3125000, 1920000, 1280000],
      [2024, 3, 3300000, "2024-01-15", "2024-01-15", 3.13, 3250000, 1980000, 1320000],
      [2024, 4, 3500000, "2024-01-22", "2024-01-22", 6.06, 3325000, 2100000, 1400000],
      [2024, 5, 3600000, "2024-01-29", "2024-01-29", 2.86, 3400000, 2160000, 1440000],
      [2024, 6, 3400000, "2024-02-05", "2024-02-05", -5.56, 3450000, 2040000, 1360000],
      [2024, 7, 3500000, "2024-02-12", "2024-02-12", 2.94, 3500000, 2100000, 1400000],
      [2024, 8, 3600000, "2024-02-19", "2024-02-19", 2.86, 3525000, 2160000, 1440000],
      [2024, 9, 4300000, "2024-02-26", "2024-02-26", 19.44, 3700000, 2580000, 1720000],
      [2024, 10, 4200000, "2024-03-04", "2024-03-04", -2.33, 3900000, 2520000, 1680000],
      [2024, 11, 4300000, "2024-03-11", "2024-03-11", 2.38, 4100000, 2580000, 1720000],
      [2024, 12, 4341382, "2024-03-18", "2024-03-18", 0.96, 4285346, 2604829, 1736553],
      [2024, 13, 3800000, "2024-03-25", "2024-03-25", -12.47, 4160346, 2280000, 1520000],
      [2024, 14, 3900000, "2024-04-01", "2024-04-01", 2.63, 4085346, 2340000, 1560000],
      [2024, 15, 3800000, "2024-04-08", "2024-04-08", -2.56, 3960346, 2280000, 1520000],
      [2024, 16, 3843241, "2024-04-15", "2024-04-15", 1.14, 3835810, 2305945, 1537296],
      [2024, 17, 5700000, "2024-04-22", "2024-04-22", 48.31, 4310810, 3420000, 2280000],
      [2024, 18, 5800000, "2024-04-29", "2024-04-29", 1.75, 4785810, 3480000, 2320000],
      [2024, 19, 5600000, "2024-05-06", "2024-05-06", -3.45, 5235810, 3360000, 2240000],
      [2024, 20, 5733094, "2024-05-13", "2024-05-13", 2.38, 5708274, 3439856, 2293238],
      [2024, 21, 5600000, "2024-05-20", "2024-05-20", -2.32, 5683274, 3360000, 2240000],
      [2024, 22, 5700000, "2024-05-27", "2024-05-27", 1.79, 5658274, 3420000, 2280000],
      [2024, 23, 5500000, "2024-06-03", "2024-06-03", -3.51, 5633274, 3300000, 2200000],
      [2024, 24, 5605142, "2024-06-10", "2024-06-10", 1.91, 5601286, 3363085, 2242057],
      [2024, 25, 4700000, "2024-06-17", "2024-06-17", -16.15, 5376286, 2820000, 1880000],
      [2024, 26, 4800000, "2024-06-24", "2024-06-24", 2.13, 5151286, 2880000, 1920000],
      [2024, 27, 4700000, "2024-07-01", "2024-07-01", -2.08, 4951286, 2820000, 1880000],
      [2024, 28, 4686729, "2024-07-08", "2024-07-08", -0.28, 4721682, 2812037, 1874692],
      [2024, 29, 6100000, "2024-07-15", "2024-07-15", 30.15, 5071682, 3660000, 2440000],
      [2024, 30, 6200000, "2024-07-22", "2024-07-22", 1.64, 5421682, 3720000, 2480000],
      [2024, 31, 6100000, "2024-07-29", "2024-07-29", -1.61, 5771682, 3660000, 2440000],
      [2024, 32, 6096755, "2024-08-05", "2024-08-05", -0.05, 6124189, 3658053, 2438702],
      [2024, 33, 6200000, "2024-08-12", "2024-08-12", 1.69, 6149189, 3720000, 2480000],
      [2024, 34, 6100000, "2024-08-19", "2024-08-19", -1.61, 6124189, 3660000, 2440000],
      [2024, 35, 6100000, "2024-08-26", "2024-08-26", 0.0, 6124189, 3660000, 2440000],
      [2024, 36, 9100000, "2024-09-02", "2024-09-02", 49.18, 6875000, 5460000, 3640000],
      [2024, 37, 9200000, "2024-09-09", "2024-09-09", 1.1, 7625000, 5520000, 3680000],
      [2024, 38, 9100000, "2024-09-16", "2024-09-16", -1.09, 8375000, 5460000, 3640000],
      [2024, 39, 9147733, "2024-09-23", "2024-09-23", 0.52, 9136933, 5488640, 3659093],
      [2024, 40, 11500000, "2024-09-30", "2024-09-30", 25.71, 9736933, 6900000, 4600000],
      [2024, 41, 11600000, "2024-10-07", "2024-10-07", 0.87, 10336933, 6960000, 4640000],
      [2024, 42, 11500000, "2024-10-14", "2024-10-14", -0.86, 10936933, 6900000, 4600000],
      [2024, 43, 11681094, "2024-10-21", "2024-10-21", 1.57, 11570274, 7008656, 4672438],
      [2024, 44, 10600000, "2024-10-28", "2024-10-28", -9.26, 11345274, 6360000, 4240000],
      [2024, 45, 10700000, "2024-11-04", "2024-11-04", 0.94, 11120274, 6420000, 4280000],
      [2024, 46, 10600000, "2024-11-11", "2024-11-11", -0.93, 10895274, 6360000, 4240000],
      [2024, 47, 10625317, "2024-11-18", "2024-11-18", 0.24, 10631329, 6375190, 4250127],
      [2024, 48, 10800000, "2024-11-25", "2024-11-25", 1.64, 10681329, 6480000, 4320000],
      [2024, 49, 10900000, "2024-12-02", "2024-12-02", 0.93, 10731329, 6540000, 4360000],
      [2024, 50, 10700000, "2024-12-09", "2024-12-09", -1.83, 10756329, 6420000, 4280000],
      [2024, 51, 10861691, "2024-12-16", "2024-12-16", 1.51, 10815423, 6517015, 4344676],
      [2024, 52, 10100000, "2024-12-23", "2024-12-23", -7.01, 10640423, 6060000, 4040000],
      [2025, 1, 10200000, "2024-12-30", "2024-12-30", 0.99, 10465423, 6120000, 4080000],
      [2025, 2, 10100000, "2025-01-06", "2025-01-06", -0.98, 10315423, 6060000, 4040000],
      [2025, 3, 10199434, "2025-01-13", "2025-01-13", 0.98, 10149859, 6119660, 4079774],
      [2025, 4, 10100000, "2025-01-20", "2025-01-20", -0.97, 10149859, 6060000, 4040000],
      [2025, 5, 10200000, "2025-01-27", "2025-01-27", 0.99, 10149859, 6120000, 4080000],
      [2025, 6, 11100000, "2025-02-03", "2025-02-03", 8.82, 10399859, 6660000, 4440000],
      [2025, 7, 11192124, "2025-02-10", "2025-02-10", 0.83, 10648031, 6715274, 4476850],
      [2025, 8, 11200000, "2025-02-17", "2025-02-17", 0.07, 10923031, 6720000, 4480000],
      [2025, 9, 11300000, "2025-02-24", "2025-02-24", 0.89, 11198031, 6780000, 4520000],
      [2025, 10, 16000000, "2025-03-03", "2025-03-03", 41.59, 12423031, 9600000, 6400000],
      [2025, 11, 16067938, "2025-03-10", "2025-03-10", 0.42, 13641985, 9640763, 6427175],
      [2025, 12, 16100000, "2025-03-17", "2025-03-17", 0.2, 14866985, 9660000, 6440000],
      [2025, 13, 16100000, "2025-03-24", "2025-03-24", 0.0, 16066985, 9660000, 6440000]
    ]
  },
  {
    chartData: [
      [2023, 18, 1000000, "2023-05-01", "2023-05-01", null, null, 600000, 400000],
      [2023, 19, 1050000, "2023-05-08", "2023-05-08", 5.0, null, 630000, 420000],
      [2023, 20, 950000, "2023-05-15", "2023-05-15", -9.52, null, 570000, 380000],
      [2023, 21, 1000000, "2023-05-22", "2023-05-22", 5.26, 1000000, 600000, 400000],
      [2023, 22, 3500000, "2023-05-29", "2023-05-29", 250.0, 1625000, 2100000, 1400000],
      [2023, 23, 3600000, "2023-06-05", "2023-06-05", 2.86, 2262500, 2160000, 1440000],
      [2023, 24, 3400000, "2023-06-12", "2023-06-12", -5.56, 2875000, 2040000, 1360000],
      [2023, 25, 3500000, "2023-06-19", "2023-06-19", 2.94, 3500000, 2100000, 1400000],
      [2023, 26, 2500000, "2023-06-26", "2023-06-26", -28.57, 3250000, 1500000, 1000000],
      [2023, 27, 2600000, "2023-07-03", "2023-07-03", 4.0, 3000000, 1560000, 1040000],
      [2023, 28, 2400000, "2023-07-10", "2023-07-10", -7.69, 2750000, 1440000, 960000],
      [2023, 29, 2500000, "2023-07-17", "2023-07-17", 4.17, 2500000, 1500000, 1000000],
    ]
  }
];

function drawChart(data) {
  if (!data || data.length === 0) {
    setStatus("No data available to display.");
    return;
  }
  const chartData = data[0].chartData;
  // Calculate summary statistics
  const totalDownloads = chartData.reduce((sum, row) => sum + row[2], 0);
  const avgWeeklyDownloads = Math.round(totalDownloads / chartData.length);
  const peakWeeklyDownloads = Math.max(...chartData.map(row => row[2]));
  const totalIOS = chartData.reduce((sum, row) => sum + row[7], 0);
  const totalAndroid = chartData.reduce((sum, row) => sum + row[8], 0);
  const iosPercentage = Math.round((totalIOS / totalDownloads) * 100);
  const androidPercentage = Math.round((totalAndroid / totalDownloads) * 100);

  // Update KPI values
  document.getElementById('total-downloads').textContent = totalDownloads.toLocaleString();
  document.getElementById('avg-weekly-downloads').textContent = avgWeeklyDownloads.toLocaleString();
  document.getElementById('peak-weekly-downloads').textContent = peakWeeklyDownloads.toLocaleString();
  document.getElementById('platform-ratio').textContent = `${iosPercentage}% iOS / ${androidPercentage}% Android`;

  // Prepare data for charts
  const dates = chartData.map(row => row[4]);
  const downloads = chartData.map(row => row[2]);
  const iosDownloads = chartData.map(row => row[7]);
  const androidDownloads = chartData.map(row => row[8]);
  const growthRates = chartData.map(row => row[5]).filter(rate => rate !== null);
  const growthDates = chartData.filter(row => row[5] !== null).map(row => row[4]);

  // Initialize ECharts instances
  const weeklyTrendChart = echarts.init(document.getElementById('weekly-trend-chart'));
  const platformChart = echarts.init(document.getElementById('platform-chart'));
  const growthChart = echarts.init(document.getElementById('growth-chart'));

  // Weekly trend chart
  weeklyTrendChart.setOption({
    title: {
      text: 'ChatGPT Mobile App Weekly Downloads'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = params[0].axisValue;
        const downloads = params[0].data.toLocaleString();
        return `${date}<br/>Downloads: ${downloads}`;
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        rotate: 45,
        interval: 4
      }
    },
    yAxis: {
      type: 'value',
      name: 'Downloads',
      axisLabel: {
        formatter: function (value) {
          return (value / 1000000).toFixed(1) + 'M';
        }
      }
    },
    series: [{
      name: 'Weekly Downloads',
      type: 'line',
      data: downloads,
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#10a37f'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(16, 163, 127, 0.5)'
          }, {
            offset: 1,
            color: 'rgba(16, 163, 127, 0.1)'
          }]
        }
      },
      markPoint: {
        data: [
          { type: 'max', name: 'Max' }
        ]
      }
    }]
  });

  // Platform comparison chart
  platformChart.setOption({
    title: {
      text: 'iOS vs Android Downloads'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['iOS', 'Android']
    },
    xAxis: {
      type: 'category',
      data: dates.filter((_, i) => i % 4 === 0),
      axisLabel: {
        rotate: 45,
        interval: 1
      }
    },
    yAxis: {
      type: 'value',
      name: 'Downloads',
      axisLabel: {
        formatter: function (value) {
          return (value / 1000000).toFixed(1) + 'M';
        }
      }
    },
    series: [
      {
        name: 'iOS',
        type: 'bar',
        stack: 'total',
        data: iosDownloads.filter((_, i) => i % 4 === 0),
        color: '#10a37f'
      },
      {
        name: 'Android',
        type: 'bar',
        stack: 'total',
        data: androidDownloads.filter((_, i) => i % 4 === 0),
        color: '#74b9ff'
      }
    ]
  });

  // Growth rate chart
  growthChart.setOption({
    title: {
      text: 'Weekly Growth Rate (%)'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: growthDates,
      axisLabel: {
        rotate: 45,
        interval: 4
      }
    },
    yAxis: {
      type: 'value',
      name: 'Growth Rate (%)',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [{
      name: 'Growth Rate',
      type: 'line',
      data: growthRates,
      smooth: true,
      lineStyle: {
        width: 2,
        color: '#ff7675'
      },
      markLine: {
        data: [
          { type: 'average', name: 'Average' }
        ]
      }
    }]
  });

  // Populate data table
  const tableBody = document.getElementById('table-body');
  chartData.forEach(row => {
    const tr = document.createElement('tr');

    const weekCell = document.createElement('td');
    weekCell.textContent = row[4];
    tr.appendChild(weekCell);

    const downloadsCell = document.createElement('td');
    downloadsCell.textContent = row[2].toLocaleString();
    tr.appendChild(downloadsCell);

    const iosCell = document.createElement('td');
    iosCell.textContent = row[7].toLocaleString();
    tr.appendChild(iosCell);

    const androidCell = document.createElement('td');
    androidCell.textContent = row[8].toLocaleString();
    tr.appendChild(androidCell);

    const growthCell = document.createElement('td');
    growthCell.textContent = row[5] !== null ? row[5].toFixed(2) + '%' : 'N/A';
    tr.appendChild(growthCell);

    tableBody.appendChild(tr);
  });

  // Handle window resize
  window.addEventListener('resize', function () {
    weeklyTrendChart.resize();
    platformChart.resize();
    growthChart.resize();
  });
};


// ============= Office Add-in ====================

let officeInitialized = false;

/**
 * Writes data to a specific range in Excel
 * @param {string} address - Range address (e.g. "A1:B2")
 * @param {Array} data - 2D array of values to write
 */
function writeToExcel(address, data) {
  return Excel.run(async (context) => {
    const range = context.workbook.worksheets.getActiveWorksheet().getRange(address);
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (typeof data[i][j] === 'string') {
            data[i][j] = "'" + data[i][j];
          }
        }
      }
    }
    range.values = data;
    await context.sync();
  }).catch(error => {
    setStatus(error.message, "error");
  });
}

/**
 * Loads data from a specific range in Excel
 * @param {string} address - Range address (e.g. "A1:B2")
 * @returns {Array} - Promise that resolves to a 2D array of cell values
 */
function loadFromExcel(address) {
  return Excel.run(async (context) => {
    const range = context.workbook.worksheets.getActiveWorksheet().getRange(address);
    range.load("values");
    await context.sync();
    var data = range.values;
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (data[i][j] === '') {
            data[i][j] = null;
          }
        }
      }
    }
    return data;
  }).catch(error => {
    console.error("Error loading data from Excel:", error);
    throw error;
  });
}


/** Checks if Office.js is loaded
 * @returns {boolean} - True if Office.js is loaded, false otherwise
 */
function checkOfficeJSLoaded() {
  if (typeof Office === 'undefined') {
    return false;
  }
  return true;
}

/**
 * Handles worksheet change events and updates the chart
 * @param {Excel.WorksheetChangedEventArgs} event - The change event
 */
function handleWorksheetChange(event) {
  if (event && event.address) {
    const cells = [];
    const promises = [];

    calculateDataRanges(rawData).forEach(item => {
      const promise = loadFromExcel(item.range)
        .then(chartData => {
          cells.push({ chartData: chartData });
        })
        .catch(error => {
          setStatus("Failed to reload data after cell change:" + error.message);
        });
      promises.push(promise);
    });

    // Wait for all promises to resolve before drawing the chart
    Promise.all(promises)
      .then(() => {
        try {
          drawChart(cells);
        } catch (error) {
          setStatus("Error drawing chart: " + error.message);
        }
      })
      .catch(error => {
        setStatus("Error loading Excel data: " + error.message);
      });
  }
}

/**
 * Office onReady event handler
 * Initializes the Office Add-in and sets up event handlers
 */
Office.onReady(() => {
  officeInitialized = true;
  // Check if Office.js is loaded
  if (navigator.userAgent.includes('WebView2') || navigator.userAgent.includes('Edg/')) {
    setStatus('WebView2 environment detected - Good!');
  } else {
    setStatus('WARNING: WebView2 not detected. This might cause issues in newer Office versions.');
  }

  if (!checkOfficeJSLoaded()) {
    return;
  }
  if (window.Excel === undefined) {
    drawChart(rawData);
    return;
  }
  calculateDataRanges(rawData).forEach(item => {
    if (item.data && item.data.length > 0) {
      writeToExcel(item.range, item.data);
    }
  })

  // Add event handler for worksheet changes
  Excel.run(async (context) => {
    const worksheet = context.workbook.worksheets.getActiveWorksheet();
    worksheet.onChanged.add(handleWorksheetChange);
    await context.sync();
    setStatus("Ready - Monitoring worksheet changes", "success");
  }).catch(error => {
    setStatus("Failed to set up change monitoring: " + error.message, "error");
  });

  const cells = [];
  const promises = [];

  calculateDataRanges(rawData).forEach(item => {
    const promise = loadFromExcel(item.range)
      .then(chartData => {
        cells.push({ chartData: chartData });
      })
      .catch(error => {
        setStatus("Failed to reload data after cell change:" + error.message);
      });
    promises.push(promise);
  });

  // Wait for all promises to resolve before drawing the chart
  Promise.all(promises)
    .then(() => {
      try {
        drawChart(cells);
      } catch (error) {
        setStatus("Error drawing chart: " + error.message);
      }
    })
    .catch(error => {
      setStatus("Error loading Excel data: " + error.message);
    });
});


function setStatus(msg, type = "info") {
  const status = document.getElementById("status");
  status.textContent = msg;
  status.className = "status";

  if (type === "success") {
    status.style.background = "#e8f5e8";
    status.style.borderColor = "#4caf50";
    status.style.color = "#2e7d32";
  } else if (type === "error") {
    status.style.background = "#ffebee";
    status.style.borderColor = "#f44336";
    status.style.color = "#c62828";
  } else if (type === "loading") {
    status.style.background = "#fff3e0";
    status.style.borderColor = "#ff9800";
    status.style.color = "#ef6c00";
  } else if (type === "warning") {
    status.style.background = "#fff3e0";
    status.style.borderColor = "#ff9800";
    status.style.color = "#ef6c00";
  } else {
    status.style.background = "#e3f2fd";
    status.style.borderColor = "#2196f3";
    status.style.color = "#1565c0";
  }
}

/**
 * Define a function to calculate cell ranges for multiple datasets
 * @param {Array<Object<any>} rawData
 * @returns {Array<{
 *     index: number,
 *     range: string,
 *     data: Array<Array<any>>,
 *     startRow: number,
 *     endRow: number}
 * >}
 */
function calculateDataRanges(rawData) {
  let ranges = [];
  let currentRow = 1;

  rawData.forEach((item, index) => {
    if (item.chartData && item.chartData.length > 0) {
      // Calculate rows and columns needed
      const rows = item.chartData.length;
      const columns = item.chartData[0].length;
      // Calculate the range (e.g., "A1:I50")
      const startCell = `A${currentRow}`;
      const endColumn = String.fromCharCode('A'.charCodeAt(0) + columns - 1);
      const endRow = currentRow + rows - 1;
      const endCell = `${endColumn}${endRow}`;
      const range = `${startCell}:${endCell}`;
      ranges.push({
        index,
        range,
        data: item.chartData,
        startRow: currentRow,
        endRow
      });
      currentRow = endRow + 3;
    }
  });

  return ranges;
}
