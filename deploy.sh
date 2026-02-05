#!/bin/bash

# Script para hacer deploy automático del blog
# Hace add, commit, push y npm run deploy

# Colores para el output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando deploy del blog...${NC}\n"

# Git add
echo -e "${GREEN}📦 Agregando cambios...${NC}"
git add .

# Git commit con mensaje genérico
FECHA=$(date +"%Y-%m-%d %H:%M")
echo -e "${GREEN}💾 Commiteando cambios...${NC}"
git commit -m "Update blog - $FECHA"

# Git push
echo -e "${GREEN}⬆️  Pusheando a GitHub...${NC}"
git push

# npm run deploy
echo -e "${GREEN}🌐 Desplegando a GitHub Pages...${NC}"
npm run deploy

echo -e "\n${BLUE}✅ Deploy completado!${NC}"
