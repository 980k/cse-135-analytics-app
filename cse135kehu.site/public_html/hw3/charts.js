// chart.js

function fetchBarData() {
  return fetch('/api/performance')
    .then((response) => response.json())
    .then((data) => {
      return data.map((row) => ({
        connectStart: row.connectStart,
        secureConnectionStart: row.secureConnectionStart,
      }));
    });
}

function generateBarChartConfig(data) {
  const seriesData = data.map((row) => ({
    values: [row.connectStart, row.secureConnectionStart],
  }));

  const chartConfig = {
    type: 'bar',
    series: [
      { values: seriesData.map((data) => data.values[0]), text: 'Connect Start', backgroundColor: '#0080ff' },
      { values: seriesData.map((data) => data.values[1]), text: 'Secure Connection Start', backgroundColor: '#ff7f00' },
    ],
    scaleX: {
      label: {
        text: 'Connect vs. Secure Connect Start',
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

function renderBarChart() {
  fetchBarData()
    .then((data) => {
      const chartConfig = generateBarChartConfig(data);
      zingchart.render({
        id: 'bar-chart-container',
        data: chartConfig,
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function fetchLineData() {
  return fetch('/api/activity')
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

function fetchPieData() {
  return fetch('/api/performance')
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




















