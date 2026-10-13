import 'dotenv/config';
import newman from 'newman';


const supabaseUrl= process.env.SUPABASE_URL;

const apikey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !apikey) {

    throw new Error ('Falta SUPABASE_URL o SUPABASE_PUBLISHABLE_KEY en .env — copiá .env.example y completalas.');
}

console.log('Variables Ok. URL: ',supabaseUrl);

newman.run({
    collection: 'postman/Backoffice-QA.postman_collection.json',
    environment: 'postman/BackofficeStaging.postman_environment.json',
    envVar: [
        { key: 'supabaseUrl', value: supabaseUrl },
        { key: 'apikey', value: apikey },
    ],
    reporters: 'cli',
    }, (err, summary) => {
    if (err || summary.run.failures.length > 0) {
        process.exitCode = 1;
    }
});

