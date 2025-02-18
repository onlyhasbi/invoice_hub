
## Getting Started

Requirement:
- Node >= 18

First, run the development server:
```bash
# first
npm install
# then
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Features:
- **Create Invoice**
  - [x]  Invoice number generated automatically
  - [x]  Amount formatting to Rupiah currency
- **Invoice List**
  - [x]  Filtering by invoice name or status
  - [x]  Delete and update invoice
- **Change Theme**


### Note:
When add new invoice it will always success. to make the result of promises generate randomly, please open the comment on `line code 35` on this path : `src/hooks/fakePromise.ts`

Resource : https://www.figma.com/design/JgZrN7zuHEr5TlnuApwuyD/FE-Engineer-Challenge---Nabitu?node-id=0-1&p=f&t=Ms7QdiLjPnF5ZdQi-0
