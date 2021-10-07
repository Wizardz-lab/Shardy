module.exports = {
    apps: [
        {
            name: "Koni's bot",
            script: "index.js",
            //options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            autorestart: true,
            watch: false,
        },
    ],
};
