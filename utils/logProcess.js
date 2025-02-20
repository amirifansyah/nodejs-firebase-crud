import fs from "fs";
import moment from "moment";
import readline from "readline";

function writeLog(method, endpoint, status) {
    const logFilePath = "./logs.txt"; 
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss"); 
    const logEntry = `[${timestamp}] ${method} ${endpoint} ${status}\n`;

    
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error("Gagal menulis log:", err);
    });
}


async function countRequestsLastHour(logFilePath) {
    const oneHourAgo = moment().subtract(1, "hours");
    const requestCounts = {};

    if (!fs.existsSync(logFilePath)) {
        console.log("⚠️ File log tidak ditemukan.");
        return {};
    }

    const fileStream = fs.createReadStream(logFilePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
        const logMatch = line.match(/^\[(.+)\] (\w+) (\/\S+) (\d{3})$/);
        if (!logMatch) continue; 

        const [_, timestamp, method, endpoint, status] = logMatch;
        const logTime = moment(timestamp, "YYYY-MM-DD HH:mm:ss");

        if (logTime.isAfter(oneHourAgo)) {
            const key = `${method} ${endpoint}`;
            requestCounts[key] = (requestCounts[key] || 0) + 1;
        }
    }

    return requestCounts;
}

export { writeLog, countRequestsLastHour };
