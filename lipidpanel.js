/* 
LIPID PANEL:
- Total Cholesterol: HDL + LDL + 20% triglycerides
  - Normal Range: Less than 200 mg/dL
    - High: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.

- LDL Cholesterol:
  - Normal Range: Less than 100 mg/dL
    - High: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.

- HDL Cholesterol:
  - Normal Range: Above 60 mg/dL
    - Low: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.

- Triglycerides:
  - Normal Range: Less than 150 mg/dL
    - Low: Increased cardiovascular disease risk; lifestyle modifications or medications may be recommended.

 */

// Generate random data within a given range
function generateData(min, max) {
    const data = [];
    for (let i = 1; i <= 30; i++) { // Data for 30 days
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        data.push(value);
    }
    return data;
}

// Data for Lipid Panel
const ldlCholesterolData = generateData(70, 150);
const hdlCholesterolData = generateData(35, 65);
const triCholesterolData = generateData(95, 155)
const totalCholesterolData = ldlCholesterolData.map((num, index) => 
    num + hdlCholesterolData[index] + triCholesterolData[index]*0.2
);
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

// Create ApexChart for HDL Cholesterol
const triCholesterolApex = {
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
        name: 'Triglycerides',
        data: triCholesterolData
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
        text: 'Triglycerides Levels',
        align: 'left',
        style: {
            fontSize: '16px',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            color: '#334155'
        }
    },
    colors: ['#23dd7d']
};

const totalCholesterolChart = new ApexCharts(document.querySelector("#total-cholesterol-chart"), totalCholesterolApex);
const ldlCholesterolChart = new ApexCharts(document.querySelector("#ldl-cholesterol-chart"), ldlCholesterolApex);
const hdlCholesterolChart = new ApexCharts(document.querySelector("#hdl-cholesterol-chart"), hdlCholesterolApex);
const triCholesterolChart = new ApexCharts(document.querySelector("#tri-cholesterol-chart"), triCholesterolApex);
totalCholesterolChart.render();
ldlCholesterolChart.render();
hdlCholesterolChart.render();
triCholesterolChart.render();
document.getElementById('total-cholesterol-count').innerText = totalCholesterolData[totalCholesterolData.length - 1];
document.getElementById('ldl-cholesterol-count').innerText = ldlCholesterolData[ldlCholesterolData.length - 1];
document.getElementById('hdl-cholesterol-count').innerText = hdlCholesterolData[hdlCholesterolData.length - 1];
document.getElementById('tri-cholesterol-count').innerText = triCholesterolData[triCholesterolData.length - 1];