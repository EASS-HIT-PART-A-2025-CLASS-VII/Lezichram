FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production || npm install --legacy-peer-deps --production
COPY . .
EXPOSE 4000
CMD ["npm", "start"] 