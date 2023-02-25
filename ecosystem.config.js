module.exports = {
  apps : [{
    name   : "movie-project",
    script : "./src/index.js",
    max_memory_restart:'1G',
    autorestart: true,
  }]
}
