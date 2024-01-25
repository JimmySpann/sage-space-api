import fs from 'fs';

export const saveJson = (jsonObj, name = 'test') => {
    try {
        fs.writeFileSync(`${name}.json`, JSON.stringify(jsonObj));
    } catch (err) {
        console.log('saveJson Error:', err);
    }
}