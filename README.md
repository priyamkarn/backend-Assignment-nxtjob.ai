Using Koyeb for Deploying

Deployment Link:https://yearning-doris-nxtjobai-cf89e3fa.koyeb.app/
<br>
Api-Doc:https://yearning-doris-nxtjobai-cf89e3fa.koyeb.app/api-docs/
 
# Backend-NextJob

## Description

This is a backend application for managing job-related operations. It uses Node.js, Express, and TypeScript, with Swagger documentation for the API and Prisma ORM with mysql for database interaction.

---

## Setup Instructions

### Prerequisites

1. **Node.js and npm**: Ensure you have Node.js (>= 16) and npm installed on your system.
2. **Database**: Set up your database and update the `DATABASE_URL` environment variable in the `.env` file.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/priyamkarn/backend-Assignment-nxtjob.ai
   npm init -y
   prisma setup
   npx prisma migrate
   cd src
   node --loader ts-node/esm src/index.ts
   or
   npx tsc
   node dist/index.js

   for docker
    docker build -t nextjob-api .
    docker run -p 3001:3001 nextjob-api

   for vitest

   go to src/testing npx vitest

   
   
.env variables
DATABASE_URL="YOUR SQL DB URL"
---

PORT="YOUR PORT TO USE"
---

NODE_ENV=development
---
