const mongoose = require('mongoose');
const listing = require('../models/listing');
const initData = require('./data.js');



const Mongo_URL ="mongodb://127.0.0.1:27017/Wanderlust";

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() 
{
    await mongoose.connect(Mongo_URL)
    
}
const initDB =async () => {
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("Data was Inialized");


}
initDB();
