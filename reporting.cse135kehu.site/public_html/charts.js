// chart.js

function fetchBarData() {
  return fetch('https://cse135kehu.site/api/performance')
    .then((response) => response.json())
    .then((data) => {
      return data.map((row) => ({
        requestStart: row.requestStart,
        responseEnd: row.responseEnd,
      }));
    });
}

function generateBarChartConfig(data) {
  const seriesData = data.map((row) => ({
    values: [row.requestStart, row.responseEnd],
  }));

  const chartConfig = {
    type: 'bar',
    title: {
      text: "User Request and Response Times",
      'offset-y': -11,
      'font-weight': "none"
    },
    series: [
      { values: seriesData.map((data) => data.values[0]), text: 'Request Start', backgroundColor: '#0080ff' },
      { values: seriesData.map((data) => data.values[1]), text: 'Response End', backgroundColor: '#ff7f00' },
    ],
    scaleX: {
      label: {
        text: 'Request Start vs. Response End',
      },
    },
    scaleY: {
      label: {
        text: 'Milliseconds',
      },
    },
    plot: {
      animation: {
        effect: 'ANIMATION_SLIDE_LEFT',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 275,
      },
    },
    plotarea: {
      margin: 'dynamic',
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },
    tooltip: {
      visible: true,
    },
  };

  return chartConfig;
}

function updateSummaryMetrics(data) {
  if (data && data.length > 0) {
    const responseTimes = data.map((row) => row.responseEnd - row.requestStart);
    const totalRequests = responseTimes.length;
    const sumResponseTime = responseTimes.reduce((sum, value) => sum + value, 0);
    const avgResponseTime = sumResponseTime / totalRequests;
    const minResponseTime = Math.min(...responseTimes);
    const maxResponseTime = Math.max(...responseTimes);

    document.getElementById('total-requests').textContent = totalRequests;
    document.getElementById('avg-response-time').textContent = avgResponseTime.toFixed(2) + ' ms';
    document.getElementById('min-response-time').textContent = minResponseTime + ' ms';
    document.getElementById('max-response-time').textContent = maxResponseTime + ' ms';
  } else {
    // Handle the case when data is undefined or empty
    document.getElementById('total-requests').textContent = 'N/A';
    document.getElementById('avg-response-time').textContent = 'N/A';
    document.getElementById('min-response-time').textContent = 'N/A';
    document.getElementById('max-response-time').textContent = 'N/A';
  }
}

function renderBarChart() {
  fetchBarData()
    .then((data) => {
      const chartConfig = generateBarChartConfig(data);
      zingchart.render({
        id: 'bar-chart-container',
        data: chartConfig,
      });
      updateSummaryMetrics(data);

    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function fetchLineData() {
  return fetch('https://cse135kehu.site/api/activity')
    .then((response) => response.json())
    .then((data) => {
      return data.map((row) => ({
        idleStart: row.idleStart,
        idleEnd: row.idleEnd,
        idleDuration: row.idleDuration,
      }));
    });
}

function generateLineChartConfig(data) {
  const seriesData = data.map((row) => ({
    values: [row.idleStart, row.idleEnd, row.idleDuration],
  }));

  const chartConfig = {
    type: 'line',
    series: [
      { values: seriesData.map((data) => data.values[0]), text: 'idleStart', 'line-color': "#CD3296", 'line-style': 'dashed' },
      { values: seriesData.map((data) => data.values[1]), text: 'idleEnd', 'line-color': "#96CD32", 'line-style': 'dotted' },
      { values: seriesData.map((data) => data.values[2]), text: 'idleDuration', 'line-color': "#3296CD", 'line-style': 'solid' },
    ],
    scaleX: {
      label: {
        text: 'Idle Timings',
      },
    },
    scaleY: {
      label: {
        text: 'Milliseconds',
      },
    },
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND_VERTICAL',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 50,
      },
      marker: {
        visible: false,
      },
      lineStyle: {
        width: 10,
      },
    },
    plotarea: {
      margin: 'dynamic',
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
    },
    tooltip: {
      visible: true,
    },
  };

  return chartConfig;
}

function renderLineChart() {
  fetchLineData()
    .then((data) => {
      const chartConfig = generateLineChartConfig(data);
      zingchart.render({
        id: 'line-chart-container',
        data: chartConfig,
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function fetchScatterData() {
  return fetch('https://cse135kehu.site/api/static')
    .then((response) => response.json())
    .then((data) => {
      return data.map((row) => ({
        x: row.windowDimensionsWidth,
        y: row.windowDimensionsHeight,
      }));
    });
}

function generateScatterChartConfig(data) {
  const seriesData = data.map((point) => ({
    values: [point.x, point.y],
  }));

  const chartConfig = {
    type: 'scatter',
    title: {
      text: "User Window Dimensions",
      'offset-y': -10,
      'font-weight': "none"
    },
    series: [
      {
        values: seriesData.map((data) => data.values),
        marker: {
          backgroundColor: '#0080ff',
        },
      },
    ],
    scaleX: {
      label: {
        text: 'Window Dimension Width',
      },
    },
    scaleY: {
      label: {
        text: 'Window Dimension Height',
      },
    },
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND_VERTICAL',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 200,
      },
      marker: {
        size: 5,
      },
    },
    plotarea: {
      margin: 'dynamic',
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      item: {
        text: 'Users',
      },
    },
    tooltip: {
      visible: true,
    },
  };

  return chartConfig;
}

function renderScatterChart() {
  fetchScatterData()
    .then((data) => {
      const chartConfig = generateScatterChartConfig(data);
      zingchart.render({
        id: 'scatter-chart-container',
        data: chartConfig,
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}


function fetchPieData() {
  return fetch('https://cse135kehu.site/api/performance')
    .then((response) => response.json())
    .then((data) => {
      const row = data[0];
      return {
        transferSize: row.transferSize,
        encodedBodySize: row.encodedBodySize,
        decodedBodySize: row.decodedBodySize,
      };
    });
}

function generatePieChartConfig(data) {
  const seriesData = [
    { value: data.transferSize, text: 'Transfer Size', 'background-color': '#F0F000' },
    { value: data.encodedBodySize, text: 'Encoded Body Size', 'background-color': '#00F0F0' },
    { value: data.decodedBodySize, text: 'Decoded Body Size', 'background-color': '#F000F0' },
  ];

  const chartConfig = {
    type: 'pie',
    series: seriesData.map((data) => ({
      values: [data.value],
      text: data.text,
      'background-color': data['background-color'],
    })),
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND',
        method: 'ANIMATION_BOUNCE',
        sequence: 'ANIMATION_SINGLE',
        speed: 3000,
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      marker: {
        type: 'circle',
        size: 8,
      },
    },
    tooltip: {
      visible: true,
    },
  };

  return chartConfig;
}

function renderPieChart() {
  fetchPieData()
    .then((data) => {
      const chartConfig = generatePieChartConfig(data);
      zingchart.render({
        id: 'pie-chart-container',
        data: chartConfig,
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function fetchBoxPlotData() {
  return fetch('https://cse135kehu.site/api/performance')
    .then((response) => response.json())
    .then((data) => {
      return data.map((row) => ({
        requestStart: row.requestStart,
        responseEnd: row.responseEnd,
        responseTime: row.responseEnd - row.requestStart,
      }));
    });
}

function generateBoxPlotChartConfig(data) {
  const seriesData = data.map((row) => ({
    values: [row.requestStart, row.responseEnd, row.responseTime],
  }));

  let chartConfig = {
    type: 'boxplot',
    title: {
      text: 'User Request and Response Ranges',
      'offset-y': -11,
      'font-weight': "none"
    },
    plotarea: {
      marginTop: '20%',
      marginLeft: '25%',
      marginRight: '12%',
    },
    plot: {
      barWidth: 70,
      hoverState: {
        visible: false,
      },
    },
    tooltip: {
      shadow: false,
      borderRadius: 3,
      rules: [
        {
          rule: '%i == 0',
          backgroundColor: '#9A8AAD',
        },
        {
          rule: '%i == 1',
          backgroundColor: '#AABD82',
        },
        {
          rule: '%i == 2',
          backgroundColor: '#D18585',
        },
      ],
    },
    scaleX: {
      offsetStart: 40,
      offsetEnd: 40,
      lineColor: 'none',
      labels: ['Request Start', 'Response End', 'Response Time'],
      tick: {
        visible: false,
      },
      item: {
        fontSize: 14,
      },
      guide: {
        visible: false,
      },
    },
    scaleY: {
      offsetStart: 20,
      offsetEnd: 20,
      values: '0:500:50',
      lineColor: '#7F7F7F',
      tick: {
        lineColor: '#7F7F7F',
      },
      guide: {
        visible: false,
      },
    },
    options: {
      box: {
        borderColor: '#204A7B',
        borderWidth: 2,
        rules: [
          {
            rule: '%i == 0',
            backgroundColor: '#9A8AAD',
          },
          {
            rule: '%i == 1',
            backgroundColor: '#AABD82',
          },
          {
            rule: '%i == 2',
            backgroundColor: '#D18585',
          },
        ],
      },
      medianStroke: {
        lineWidth: 2,
        lineColor: '#FC0B1A',
      },
      lineMedianLevel: {
        lineColor: '#FC0B1A',
        lineWidth: 2,
      },
      lineMinLevel: {
        lineColor: '#204A7B',
        lineWidth: 2,
      },
      lineMinConnector: {
        lineColor: '#204A7B',
        lineWidth: 2,
      },
      lineMaxLevel: {
        lineColor: '#204A7B',
        lineWidth: 2,
      },
      lineMaxConnector: {
        lineColor: '#204A7B',
        lineWidth: 2,
      },
    },
    series: [
      {
        dataBox: [
          seriesData.map((data) => data.values[0]),
          seriesData.map((data) => data.values[1]),
          seriesData.map((data) => data.values[2]),
        ],
      },
    ],
  };

  return chartConfig;
}

function renderBoxPlotChart() {
  fetchBoxPlotData()
    .then((data) => {
      const chartConfig = generateBoxPlotChartConfig(data);
      zingchart.render({
        id: 'boxplot-chart-container',
        data: chartConfig,
        width: '100%',
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}
