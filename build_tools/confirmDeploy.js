import readlineSync from 'readline-sync';

// Prompt the user to continue or cancel the deployment sequence
const continueSequence = readlineSync.keyInYN('Do you want to continue with the deployment sequence? (This version will be pushed to the live site)');

if (continueSequence) {
  console.log('Continuing with the deployment sequence...');
  process.exit(0); // Exit the script with a success status code (0)
} else {
  console.log('Deployment sequence cancelled.');
  process.exit(1); // Exit the script with a failure status code (1)
}
