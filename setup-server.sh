#!/usr/bin/env bash
set -e

echo "=== 1. INSTALLING NODE.JS 20 AND NGINX ==="
export DEBIAN_FRONTEND=noninteractive
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y -q nodejs nginx iptables-persistent

echo "=== 2. INSTALLING PM2 ==="
sudo npm install -g pm2

echo "=== 3. CONFIGURING FIREWALL (IPTABLES) ==="
sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 3000 -j ACCEPT
sudo mkdir -p /etc/iptables
sudo iptables-save | sudo tee /etc/iptables/rules.v4 > /dev/null

echo "=== 4. CREATING APP DIRECTORY ==="
mkdir -p /home/ubuntu/proboard-shop

echo "=== 5. CHECKING VERSIONS ==="
node -v
npm -v
pm2 -v
nginx -v
echo "SERVER PROVISIONING COMPLETE!"
