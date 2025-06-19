import fs from "node:fs";
import { parse } from "csv-parse";

const csvPath = new URL('./tasks.csv', import.meta.url)

const streams = fs.createReadStream(csvPath);

const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2
});

async function csv() {
    const recordsParse = streams.pipe(csvParse);

    for await (const record of recordsParse){
        const [title, description] = record;

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
        })
    }
}

csv()