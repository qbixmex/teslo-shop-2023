# Teslo Shop

Website developed with NextJs

## Run development

```bash
#npm
npm run dev

# yarn
yarn dev
```

## Build application

```bash
# npm
npm run build

# yarn
yarn build
```

## Start application

**IMPORTANT: You must run build before run this script**

```bash
# npm
npm run start

# yarn
yarn start
```

## Run Lint

```bash
# npm
npm run lint

# yarn
yarn lint
```

## Run Docker Compose

__Info: ```-d```, means: ```detached```__

```bash
docker-compose up -d
```

## Configure Environment Variables

```bash
cp .env.template .env
```

__Edit__ ```.env```

```
MONGO_URL=mongodb://localhost:27017/teslodb
# Put your "Tax Rate"
NEXT_PUBLIC_TAX_RATE=0.12
JWT_SECRET_SEED=super_secret_key
```

__You can generate a very strong secret seed with node crypto module__

```bash
node
require('crypto').randomBytes(64).toString('hex');
```

## Seed Database

```http://localhost/api/seed```

You can use POSTMAN for example.