FROM node:alpine
ENV NODE_ENV development
WORKDIR /src
COPY package.json /src/
COPY package-lock.json /src/
COPY . /src/
RUN npm i
EXPOSE 8000
CMD ["npm", "run", "dev"]
