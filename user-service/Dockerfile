FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

# its just an instruction, you can configure it manually via -p
EXPOSE 3008

CMD ["npm", "start"]