# GeoSpacial Monorepo

This monorepo contains a client (React + Vite + TypeScript) and a server (Express + TypeScript + MySQL) with a shared design system package, managed by pnpm workspaces.

## Prerequisites

- Node.js (v20+)
- pnpm (v9+)
- Docker & Docker Compose

## Quick Start

1.  **Install Dependencies**
    ```bash
    pnpm install
    ```

2.  **Build the monorepo**
    ```bash
    pnpm build
    ```

3.  **Start Dev Environment (Docker)**
    Start the Client, Server, and Database with hot reload enabled.
    ```bash
    docker-compose up --build
    ```

    Seed the database
    ```bash
    docker-compose exec server pnpm exec tsx node_modules/knex/bin/cli.js seed:run
    ```
    - Client: http://localhost:5173
    - Server: http://localhost:3000

4.  **Local Development (Without Docker)**
    You can also run services locally:
    ```bash
    # Run all services in parallel
    pnpm dev
    
    # Or navigate to specific package
    cd client && pnpm dev
    cd server && pnpm dev
    ```

    Seed the database
    ```
    cd server && pnpm exec tsx node_modules/knex/bin/cli.js seed:run
    ```