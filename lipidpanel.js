/* 
LIPID PANEL:
- Total Cholesterol:
  - Normal Range: Less than 200 mg/dL
    - High: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.

- LDL Cholesterol:
  - Normal Range: Less than 100 mg/dL
    - High: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.

- HDL Cholesterol:
  - Normal Range: 40 to 60 mg/dL
    - Low: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.
 */

// Data for Lipid Panel
const totalCholesterolData = generateData(120, 240);
const ldlCholesterolData = generateData(70, 150);
const hdlCholesterolData = generateData(35, 65);

// Create ApexChart for Total Cholesterol
const totalCholesterolApex = {
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    series: [{
        name: 'Total Cholesterol',
        data: totalCholesterolData
    }],
    xaxis: {
        categories: Array.from(Array(30), (_, i) => i + 1),
        labels: {
            show: false
        }
    },
    yaxis: {
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    title: {
        text: 'Total Cholesterol Levels',
        align: 'left',
        style: {
            fontSize: '16px',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            color: '#334155'
        }
    },
    colors: ['#007bff']
};

// Create ApexChart for LDL Cholesterol
const ldlCholesterolApex = {
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    series: [{
        name: 'LDL Cholesterol',
        data: ldlCholesterolData
    }],
    xaxis: {
        categories: Array.from(Array(30), (_, i) => i + 1),
        labels: {
            show: false
        }
    },
    yaxis: {
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    title: {
        text: 'LDL Cholesterol Levels',
        align: 'left',
        style: {
            fontSize: '16px',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            color: '#334155'
        }
    },
    colors: ['#28a745']
};

// Create ApexChart for HDL Cholesterol
const hdlCholesterolApex = {
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    series: [{
        name: 'HDL Cholesterol',
        data: hdlCholesterolData
    }],
    xaxis: {
        categories: Array.from(Array(30), (_, i) => i + 1),
        labels: {
            show: false
        }
    },
    yaxis: {
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    title: {
        text: 'HDL Cholesterol Levels',
        align: 'left',
        style: {
            fontSize: '16px',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            color: '#334155'
        }
    },
    colors: ['#6c757d']
};

const totalCholesterolChart = new ApexCharts(document.querySelector("#total-cholesterol-chart"), totalCholesterolApex);
const ldlCholesterolChart = new ApexCharts(document.querySelector("#ldl-cholesterol-chart"), ldlCholesterolApex);
const hdlCholesterolChart = new ApexCharts(document.querySelector("#hdl-cholesterol-chart"), hdlCholesterolApex);
totalCholesterolChart.render();
ldlCholesterolChart.render();
hdlCholesterolChart.render();
document.getElementById('total-cholesterol-count').innerText = glucoseData[glucoseData.length - 1];
document.getElementById('ldl-cholesterol-count').innerText = calciumData[calciumData.length - 1];
document.getElementById('hdl-cholesterol-count').innerText = bunData[bunData.length - 1];