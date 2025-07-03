let bindingId = "smartChartData";
let chart = null;
let currentData = null;

// 预定义颜色主题
const colorSchemes = {
  default: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
  business: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6'],
  nature: ['#8bc34a', '#4caf50', '#009688', '#00bcd4', '#03a9f4', '#2196f3'],
  warm: ['#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a']
};

Office.onReady(() => {
  try {
    initializeEventListeners();
    initializeChart();
  } catch (error) {
  } finally {
  }
});

function initializeEventListeners() {
  document.getElementById("bindBtn").onclick = addOrRebind;
  document.getElementById("chartType").onchange = updateChart;
  document.getElementById("chartTitle").oninput = updateChart;
  document.getElementById("primaryColor").onchange = updateChart;
  document.getElementById("seriesMode").onchange = updateChart;
  document.getElementById("enableAnimation").onchange = updateChart;
  document.getElementById("enable3D").onchange = updateChart;
  document.getElementById("showLegend").onchange = updateChart;
  document.getElementById("showGrid").onchange = updateChart;
  document.getElementById("showTooltip").onchange = updateChart;
}

function initializeChart() {
  chart = echarts.init(document.getElementById("chart"));
  
  // 显示默认图表
  const option = {
    title: {
      text: 'Waiting for Data Binding...',
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 24,
        color: '#999'
      }
    }
  };
  chart.setOption(option);
}

function addOrRebind() {
  setStatus("🔄 正在绑定数据...", "loading");
  
  Office.context.document.bindings.addFromSelectionAsync(
    Office.BindingType.Matrix,
    { id: bindingId },
    result => {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        setStatus("✅ Data binding successful! Chart will update automatically", "success");
        const binding = result.value;
        
        // 移除旧的事件监听器
        binding.removeHandlerAsync(Office.EventType.BindingDataChanged, () => {});
        
        // 添加新的事件监听器
        binding.addHandlerAsync(
          Office.EventType.BindingDataChanged,
          () => {
            setStatus("🔄 Data change detected. Updating chart...", "loading");
            setTimeout(() => refreshChart(binding), 100);
          }
        );
        
        refreshChart(binding);
      } else {
        // 尝试获取已存在的绑定
        Office.context.document.bindings.getByIdAsync(bindingId, r => {
          if (r.status === Office.AsyncResultStatus.Succeeded) {
            refreshChart(r.value);
          } else {
            setStatus("⚠️ Please select a data range with a header row", "error");
          }
        });
      }
    }
  );
}

function refreshChart(binding) {
  binding.getDataAsync({ coercionType: Office.CoercionType.Matrix }, res => {
    if (res.status !== Office.AsyncResultStatus.Succeeded) {
      setStatus("❌ Failed to read data: " + res.error.message, "error");
      return;
    }
    
    const matrix = res.value;
    if (!Array.isArray(matrix) || matrix.length < 2) {
      setStatus("⚠️ Please select at least 2 rows of data (including header)", "error");
      return;
    }
    
    currentData = matrix;
    processDataAndRender();
    showDataPreview(matrix);
    setStatus(`✅ Chart Updated (${new Date().toLocaleTimeString()})`, "success");
  });
}

function processDataAndRender() {
  if (!currentData) return;
  
  const chartType = document.getElementById("chartType").value;
  const seriesMode = document.getElementById("seriesMode").value;
  
  let processedData;
  
  if (seriesMode === 'auto') {
    // Auto Detect：如果有2列则Single Series，多列则Multiple Series
    processedData = currentData[0].length <= 2 ? 
      processSingleSeries(currentData) : 
      processMultiSeries(currentData);
  } else if (seriesMode === 'single') {
    processedData = processSingleSeries(currentData);
  } else {
    processedData = processMultiSeries(currentData);
  }
  
  renderChart(processedData, chartType);
}

function processSingleSeries(matrix) {
  const headers = matrix[0];
  const dataRows = matrix.slice(1);
  
  return {
    categories: dataRows.map(row => row[0]),
    series: [{
      name: headers[1] || 'Value',
      data: dataRows.map(row => Number(row[1]) || 0)
    }]
  };
}

function processMultiSeries(matrix) {
  const headers = matrix[0];
  const dataRows = matrix.slice(1);
  const categories = dataRows.map(row => row[0]);
  
  const series = [];
  for (let i = 1; i < headers.length; i++) {
    series.push({
      name: headers[i],
      data: dataRows.map(row => Number(row[i]) || 0)
    });
  }
  
  return { categories, series };
}

function renderChart(data, chartType) {
  const primaryColor = document.getElementById("primaryColor").value;
  const chartTitle = document.getElementById("chartTitle").value;
  const enableAnimation = document.getElementById("enableAnimation").checked;
  const enable3D = document.getElementById("enable3D").checked;
  const showLegend = document.getElementById("showLegend").checked;
  const showGrid = document.getElementById("showGrid").checked;
  const showTooltip = document.getElementById("showTooltip").checked;
  
  // 生成颜色方案
  const colors = generateColorScheme(primaryColor, data.series.length);
  
  let option = {
    color: colors,
    title: {
      text: chartTitle,
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: showTooltip ? {
      trigger: chartType === 'pie' ? 'item' : 'axis',
      formatter: chartType === 'pie' ? 
        '{a} <br/>{b}: {c} ({d}%)' : 
        null
    } : {},
    legend: showLegend && data.series.length > 1 ? {
      top: '10%',
      type: 'scroll'
    } : {},
    grid: showGrid && chartType !== 'pie' && chartType !== 'radar' ? {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: showLegend ? '20%' : '15%',
      containLabel: true
    } : {},
    animationDuration: enableAnimation ? 1000 : 0,
    animationEasing: 'elasticOut'
  };
  
  // 根据Chart Type设置不同的配置
  switch (chartType) {
    case 'bar':
      setupBarChart(option, data, enable3D);
      break;
    case 'line':
      setupLineChart(option, data, enable3D);
      break;
    case 'pie':
      setupPieChart(option, data, enable3D);
      break;
    case 'area':
      setupAreaChart(option, data);
      break;
    case 'scatter':
      setupScatterChart(option, data);
      break;
    case 'radar':
      setupRadarChart(option, data);
      break;
  }
  
  chart.setOption(option, true);
}

function setupBarChart(option, data, enable3D) {
  option.xAxis = {
    type: 'category',
    data: data.categories,
    axisLabel: { rotate: 30 }
  };
  option.yAxis = { type: 'value' };
  option.series = data.series.map(s => ({
    name: s.name,
    type: 'bar',
    data: s.data,
    itemStyle: {
      borderRadius: enable3D ? [0, 0, 0, 0] : [4, 4, 0, 0]
    },
    ...(enable3D && {
      stack: 'total',
      emphasis: { focus: 'series' }
    })
  }));
}

function setupLineChart(option, data, enable3D) {
  option.xAxis = {
    type: 'category',
    data: data.categories
  };
  option.yAxis = { type: 'value' };
  option.series = data.series.map(s => ({
    name: s.name,
    type: 'line',
    data: s.data,
    smooth: enable3D,
    symbol: enable3D ? 'circle' : 'emptyCircle',
    symbolSize: enable3D ? 8 : 6,
    lineStyle: {
      width: enable3D ? 4 : 2
    }
  }));
}

function setupPieChart(option, data) {
  const seriesData = data.categories.map((name, i) => ({
    name: name,
    value: data.series[0].data[i]
  }));
  
  option.series = [{
    name: data.series[0].name,
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '30',
        fontWeight: 'bold'
      }
    },
    data: seriesData
  }];
}

function setupAreaChart(option, data) {
  option.xAxis = {
    type: 'category',
    data: data.categories
  };
  option.yAxis = { type: 'value' };
  option.series = data.series.map(s => ({
    name: s.name,
    type: 'line',
    data: s.data,
    areaStyle: {
      opacity: 0.6
    },
    smooth: true
  }));
}

function setupScatterChart(option, data) {
  option.xAxis = { type: 'value' };
  option.yAxis = { type: 'value' };
  option.series = data.series.map((s, index) => ({
    name: s.name,
    type: 'scatter',
    data: s.data.map((value, i) => [i, value]),
    symbolSize: 10
  }));
}

function setupRadarChart(option, data) {
  option.radar = {
    indicator: data.categories.map(name => ({ name, max: Math.max(...data.series.map(s => Math.max(...s.data))) }))
  };
  option.series = [{
    type: 'radar',
    data: data.series.map(s => ({
      value: s.data,
      name: s.name
    }))
  }];
}

function generateColorScheme(primaryColor, count) {
  const colors = [primaryColor];
  const hsl = hexToHsl(primaryColor);
  
  for (let i = 1; i < count; i++) {
    const newHue = (hsl.h + (360 / count) * i) % 360;
    colors.push(hslToHex(newHue, hsl.s, hsl.l));
  }
  
  return colors;
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h: h * 360, s: s, l: l };
}

function hslToHex(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function showDataPreview(matrix) {
  const preview = document.getElementById("dataPreview");
  const table = document.getElementById("dataTable");
  
  let html = "";
  matrix.slice(0, 6).forEach((row, i) => {
    html += `<tr>`;
    row.forEach(cell => {
      html += i === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
    });
    html += `</tr>`;
  });
  
  if (matrix.length > 6) {
    html += `<tr><td colspan="${matrix[0].length}">... …more ${matrix.length - 6}  rows of data</td></tr>`;
  }
  
  table.innerHTML = html;
  preview.style.display = "block";
}

function updateChart() {
  if (currentData) {
    processDataAndRender();
  }
}

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
  } else {
    status.style.background = "#e3f2fd";
    status.style.borderColor = "#2196f3";
    status.style.color = "#1565c0";
  }
}