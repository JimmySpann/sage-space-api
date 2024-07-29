// Converts string to array of strings by ", "
const inputString = process.argv[2];
const processedArray = [...inputString.split(', ')];
console.log('processedArray:', processedArray)