const fs = require('fs');
const path = require('path');
const config = require('../config');

const getFilePath = (fileName) => path.join(config.dataDir, fileName);

const readJSON = async (fileName) => {
    try{
        const raw = await fs.readFileSync(getFilePath(fileName), 'utf-8');
        return JSON.parse(raw);
    }catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

const writeJSON = async (fileName, data) => {
    await fs.writeFileSync(getFilePath(fileName), JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
    readJSON,
    writeJSON,
};