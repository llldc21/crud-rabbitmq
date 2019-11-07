FROM mhart/alpine-node:12

WORKDIR /app
COPY . . 

RUN npm install --quiet

EXPOSE 4000
CMD ["node", "index.js"]