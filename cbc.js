/*
COMPLETE BLOOD COUNT:
-WBC: [4500,11000](cells/μL) 
    - Low: Leukopenia - increased infection risk; fatigue
    - High: Leukocytosis - possibly leukemia; infection or inflammation

-RBC: [4.2,6.1](million cells/μL)
    - Low: Anemia - fatigue, weakness; risk of complications from blood loss.
    - High: Polycythemia - increased clotting risk; potential for stroke or heart attack.
    
-Platelets: [150000,450000](platelets/μL)
    - Low: Thrombocytopenia - increased bleeding risk
    - High: Thrombocytosis - increased clotting risk
*/

// Generate random data within a given range
function generateData(min, max) {
    const data = [];
    for (let i = 1; i <= 7; i++) { // Data for 30 days
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        data.push(value);
    }
    return data;
}

// Data for WBC, RBC, and Platelets
const wbcData = generateData(4500, 11000);
const rbcData = generateData(4.2, 6.1);
const plateletsData = generateData(150000, 450000);

// Create ApexChart for WBC
const wbcApex = {
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
        name: 'WBC',
        data: wbcData
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
        text: 'White Blood Cells Counts',
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

// Create ApexChart for RBC
const rbcApex = {
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
        name: 'RBC',
        data: rbcData
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
        text: 'Red Blood Cells Counts',
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

// Create ApexChart for Platelets
const plateletsApex = {
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
        name: 'Platelets',
        data: plateletsData
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
        text: 'Platelets Counts',
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

const wbcChart = new ApexCharts(document.querySelector("#wbc-chart"), wbcApex);
const rbcChart = new ApexCharts(document.querySelector("#rbc-chart"), rbcApex);
const plateletsChart = new ApexCharts(document.querySelector("#platelets-chart"), plateletsApex);
wbcChart.render();
rbcChart.render();
plateletsChart.render();
document.getElementById('wbc-count').innerText = wbcData[wbcData.length - 1];
document.getElementById('rbc-count').innerText = `${rbcData[rbcData.length - 1]} MIL`
document.getElementById('platelets-count').innerText = plateletsData[plateletsData.length - 1];

