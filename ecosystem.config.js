module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      watch: true,
      ignore_watch: ["node_modules", "logs", "public"],
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      
      env_production: {
        NODE_ENV: "production",
        PORT: 3000 // Set the port here
      }
    }
  ]
};
