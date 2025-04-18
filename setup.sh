#!/bin/bash

set -e

mkdir -p incidents

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

git clone https://github.com/ByeLarry/incidents-admin-frontend.git
cd incidents-admin-frontend
docker-compose up -d
cd ../

git clone https://github.com/ByeLarry/incidents-search-service.git
cd incidents-search-service/solution
docker-compose -f "docker-compose.yml" -f "docker-compose.override.yml" -p "incidents-search-service" up -d
cd ../../