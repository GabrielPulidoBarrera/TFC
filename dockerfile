FROM node:lts AS base
WORKDIR /app


COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

FROM build-deps AS build
COPY . .
RUN find node_modules/.bin -type f -exec chmod +x {} \;

RUN npx prisma generate


#Para aplicar un cambio en la schema de la base de datos de coolify, primero, desactiva por completo el SSL de la base de datos, segundo, quita el comentario de los siguientes 3 atributos, tercero, haz deploy, y finalmente, con los cambios aplicados, deshaz todos estos cambios.

# ARG DATABASE_URL
# COPY prisma.config.ts ./prisma.config.ts
# RUN npx prisma db push --force-reset

RUN ./node_modules/.bin/astro build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src/generated ./src/generated

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]