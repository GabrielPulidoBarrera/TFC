FROM node:lts AS base
WORKDIR /app

# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

FROM build-deps AS build
COPY . .
# Fix permissions for all binary files in node_modules
RUN find node_modules/.bin -type f -exec chmod +x {} \;

ARG DATABASE_URL

# Generate Prisma Client (outputs to ./src/generated/prisma)
RUN npx prisma generate
COPY prisma.config.ts ./prisma.config.ts
RUN npx prisma migrate deploy

# Run the build
RUN ./node_modules/.bin/astro build

FROM base AS runtime
# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules
# Copy built application
COPY --from=build /app/dist ./dist
# Copy Prisma schema (if needed for migrations at runtime)
COPY --from=build /app/prisma ./prisma
# Copy the generated Prisma client from src
COPY --from=build /app/src/generated ./src/generated

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]