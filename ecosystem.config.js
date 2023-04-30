module.exports = {
  apps: [
    {
      name: 'Timie API',
      script: 'dist/main.js',
      watch: './src',
      ignore_watch: ['node_modules'],
      env: {
        PORT: 5000,
        MONGO_URI: 'mongodb://root:example@localhost:27017',
      },
    },
  ],
};
