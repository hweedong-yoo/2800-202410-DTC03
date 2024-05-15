/* 
BLOOD CHEMISTRY:
-Glucose: [70, 140]mg/dL 
    - Low: Hypoglycemia - increased infection risk; fatigue.
    - High: Hyperglycemia - possibly diabetes mellitus; increased thirst, frequent urination, fatigue.

-Calcium: [8.5, 10.5]mg/dL 
    - Low: Hypocalcemia - muscle cramps, numbness, tingling, seizures.
    - High: Hypercalcemia - fatigue, nausea, vomiting, kidney stones. 

-Kidney Function Markers:
  - Blood Urea Nitrogen (BUN): [7,20] mg/dL
  - Creatinine: [0.6,1.3] mg/dL
    - Elevated BUN and Creatinine: Kidney dysfunction or dehydration.

-Liver Function Tests:
  - Alanine Aminotransferase (ALT): [7,56] U/L
  - Aspartate Aminotransferase (AST): [10,40] U/L
    - Elevated Liver Enzymes: Liver damage or disease.
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

// Data for Blood Chemistry
const glucoseData = generateData(70, 140);
const calciumData = generateData(8.5, 10.5);
const bunData = generateData(7, 20);
const creatinineData = generateData(0.6, 1.3);
const altData = generateData(7, 56);
const astData = generateData(10, 40);
// Create ApexChart for Glucose
const glucoseApex = {
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
        name: 'Glucose',
        data: glucoseData
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
        text: 'Glucose Levels',
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

// Create ApexChart for Calcium
const calciumApex = {
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
        name: 'Calcium',
        data: calciumData
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
        text: 'Calcium Levels',
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

// Create ApexChart for Kidney Function Markers (BUN and Creatinine)
const kidneyMarkersApex = {
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
    series: [
        {
            name: 'BUN',
            data: bunData
        },
        {
            name: 'Creatinine',
            data: creatinineData
        }
    ],
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
        text: 'Kidney Function Markers (BUN and Creatinine)',
        align: 'left',
        style: {
            fontSize: '16px', 
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            color: '#334155'
        }
    },
    colors: ['#007bff', '#28a745']
};

// Create ApexChart for Liver Function Tests (ALT and AST)
const liverFunctionApex = {
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
    series: [
        {
            name: 'ALT',
            data: altData
        },
        {
            name: 'AST',
            data: astData
        }
    ],
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
        text: 'Liver Function Tests (ALT and AST)',
        align: 'left',
        style: {
            fontSize: '16px', 
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            color: '#334155'
        }
    },
    colors: ['#007bff', '#ffc107']
};


const glucoseChart = new ApexCharts(document.querySelector("#glucose-chart"), glucoseApex);
const calciumChart = new ApexCharts(document.querySelector("#calcium-chart"), calciumApex);
const kidneyMarkersChart = new ApexCharts(document.querySelector("#kidney-markers-chart"), kidneyMarkersApex);
const liverFunctionChart = new ApexCharts(document.querySelector("#liver-function-chart"), liverFunctionApex);
glucoseChart.render();
calciumChart.render();
kidneyMarkersChart.render();
liverFunctionChart.render();
document.getElementById('glucose-count').innerText = glucoseData[glucoseData.length - 1];
document.getElementById('calcium-count').innerText = calciumData[calciumData.length - 1];
document.getElementById('bun-count').innerText = bunData[bunData.length - 1];
document.getElementById('creatinine-count').innerText = creatinineData[creatinineData.length - 1];
document.getElementById('alt-count').innerText = altData[altData.length - 1];
document.getElementById('ast-count').innerText = astData[astData.length - 1];
