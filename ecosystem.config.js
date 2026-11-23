module.exports = {
  apps: [
    {
      name: 'proboard-shop',
      script: 'server.js',
      cwd: '/home/ubuntu/proboard-shop',
      node_args: '--env-file=.env.local',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
