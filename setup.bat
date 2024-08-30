@echo off

mkdir incidents

cd incidents

git clone https://github.com/ByeLarry/incidents-frontend.git
cd incidents-frontend
docker-compose up -d
cd ../

git clone https://github.com/ByeLarry/incidents-gateway.git
cd incidents-gateway
docker-compose up -d 
cd ../

git clone https://github.com/ByeLarry/incidents-marks-service.git
cd incidents-marks-service
docker-compose up -d 
cd ../

git clone https://github.com/ByeLarry/incidents-auth-service.git
cd incidents-auth-service
docker-compose up -d 
cd ../
