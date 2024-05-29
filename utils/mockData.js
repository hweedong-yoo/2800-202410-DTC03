const bloodModel = require('../models/bloodModels');
const vitalsModel = require('../models/vitalsModel');

/**
 * Generates mock data points based on the specified length, minimum value, and maximum value.
 * @param {number} length - The number of data points to generate.
 * @param {number} min - The minimum value for the data points.
 * @param {number} max - The maximum value for the data points.
 * @returns {Array<Object>} An array of data points, where each data point is represented as an object with a date and a value.
 */
function createMockData(length, min, max) {
    const data = [];
    const interval = 60 * 1000; // 1 minute in milliseconds
    const currentTime = new Date().getTime(); // Current timestamp
    let currentValue = min;

    for (let i = 0; i < length; i++) {
        const time = new Date(currentTime - (i * interval));
        const randomStep = Math.random() * 4 - 2; // Random step between -2 and 2
        currentValue += randomStep;
        currentValue = Math.max(min, Math.min(max, currentValue)); // Ensure the value stays within the range

        data.push({ date: time, value: Math.round(currentValue) });
    }

    return data.reverse(); // Reverse the array to have the data points in ascending order of time
}

/**
 * Adds mock data for BPM, temperature, and respiratory rate to the database.
 * Creates new instances of bloodModel and vitalsModel with mock data and saves them to the database.
 * @param {string} userID - The ID of the user for whom the mock data is being added.
 * @returns {Promise<void>} - A promise that resolves when the mock data is successfully saved to the database.
 */
async function addMockData(userID) {
    // Generate mock data for BPM, temperature, and respiratory rate
    const bpmData = createMockData(10, 60, 100);
    const temperatureData = createMockData(10, 36, 38);
    const respiratoryRateData = createMockData(10, 12, 20);

    console.log(bpmData, temperatureData, respiratoryRateData);
    
    // Create new instances of bloodModel and vitalsModel with mock data
    const newBlood = new bloodModel({
        userID: userID,
        platelets: [220000, 210000, 195000, 160000, 150000, 155000, 140000],
        glucose: [90, 95, 88, 92, 85, 100, 93],
        calcium: [9.5, 9.3, 9.7, 9.6, 9.8, 9.4, 9.9],
        bun: [15, 14, 12, 16, 13, 17, 12],
        creatinine: [1.1, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7],
        alt: [20, 22, 21, 23, 25, 24, 20],
        ast: [18, 19, 22, 18, 21, 20, 23],
        ldl: [100, 110, 90, 100, 80, 95, 90],
        hdl: [60, 70, 65, 60, 50, 65, 70],
        tri: [100, 125, 140, 110, 130, 135, 110],
        vulnerabilities: ["immunity"],
        rbc: [4.7, 5.2, 4.9, 4.8, 4.3, 4.6, 5.1],
        wbc: [7000, 5300, 6200, 7400, 5500, 4200, 3400]
    });

    const newVitals = new vitalsModel({
        userID: userID,
        BPM: bpmData,
        temperature: temperatureData,
        respiratoryRate: respiratoryRateData,
        vulnerabilities: []
    });

    // Save the new instances to the database if they don't already exist
    const vitals = await vitalsModel.findOne({ userID: userID });
    console.log(vitals);
    if (!vitals) {
        await newVitals.save();
        console.log('New vitals saved.');
    } else {
        console.log('Vitals already exist for this userID');
    }

    const blood = await bloodModel.findOne({ userID: userID });
    console.log(blood);
    if (!blood) {
        await newBlood.save();
        console.log('New blood record saved.');
    } else {
        console.log('Blood record already exists for this userID');
    }
}

module.exports = addMockData;
