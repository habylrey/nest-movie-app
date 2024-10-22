module.exports = {
    apps: [{
      name: "nest-movie-app",
      script: "dist/main.js",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }]
  }; 