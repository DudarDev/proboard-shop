#!/usr/bin/env bash
set -e

echo "=== 1. EXTRACTING ARCHIVE ==="
rm -rf /home/ubuntu/proboard-shop/*
tar -xzf /home/ubuntu/proboard-deploy.tar.gz -C /home/ubuntu/proboard-shop

echo "=== 2. STARTING PROBOARD SHOP WITH PM2 ==="
cd /home/ubuntu/proboard-shop
pm2 delete proboard-shop 2>/dev/null || true
PORT=3000 HOSTNAME="0.0.0.0" pm2 start server.js --name "proboard-shop"
pm2 save

echo "=== 3. CONFIGURING NGINX REVERSE PROXY ==="
sudo tee /etc/nginx/sites-available/proboard-shop > /dev/null <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/proboard-shop /etc/nginx/sites-enabled/proboard-shop
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "=== 4. ENSURING IPTABLES RULES FOR PORT 80, 443, 3000 ==="
sudo iptables -C INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT
sudo iptables -C INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT
sudo iptables -C INPUT -p tcp --dport 3000 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT 1 -p tcp --dport 3000 -j ACCEPT
sudo mkdir -p /etc/iptables
sudo iptables-save | sudo tee /etc/iptables/rules.v4 > /dev/null

echo "=== 5. HEALTHCHECKING LOCALHOST ==="
sleep 2
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:80/

pm2 status
echo "DEPLOYMENT COMPLETE!"
