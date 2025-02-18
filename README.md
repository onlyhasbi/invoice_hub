```markdown
## Getting Started

###Requirement:
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
  - Invoice number generated automatically
  - Amount formatting to Rupiah currency
- **Invoice List**
  - Filtering by invoice name or status
  - Delete and update invoice
- **Change Theme**
```

Note:
   - Filtering by invoice name only work from start of invoice name
   - When add new invoice it will always success. to make the result of promise generate randomly
     please open the comment line code on this path : src/hooks/fakePromise.ts line-35
