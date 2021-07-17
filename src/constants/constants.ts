const isProduction = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

const firebaseProjectId = 'infinitecloud-website-api';

const functionsUrl = isProduction ?
    `https://${firebaseProjectId}.web.app/v1`
    :
    'http://localhost:5001/infinitecloud-website-api/us-central1/api/v1';

const appName = 'Infinite Cloud';
const botUsername = 'infinitecloud_bot';
const botRepoUrl = 'https://github.com/Luca8991/infinitecloud_bot';
const websiteRepoUrl = 'https://github.com/Luca8991/infinite-cloud-website';

const constants = {
    isProduction,
    functionsUrl,
    firebaseProjectId,
    appName,
    botUsername,
    botRepoUrl,
    websiteRepoUrl,
};

export default constants;