FROM node:lts-alpine3.13 as build-stage
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install
COPY ./ /app/
ARG FRONTEND_ENV=production
ENV NODE_ENV=${FRONTEND_ENV}
RUN yarn build --mode=$NODE_ENV

FROM nginx:1.15
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf