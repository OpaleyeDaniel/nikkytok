# NIKKYTOKS VENTURES — Sanity CMS Integration Guide

This platform is architected to seamlessly transition to **Sanity Studio CMS** whenever you are ready.

---

## 1. Architecture Overview

- **Local Development / Standalone Mode**:
  By default, all products and corporate settings are stored locally in `data/products.json` and `data/settings.json`.
- **Sanity CMS Mode**:
  When `SANITY_PROJECT_ID` is set, the website automatically pulls live products and images directly from your Sanity cloud database.
- **Fail-safe Fallback**:
  If Sanity is ever unreachable or unconfigured, the website immediately falls back to the local database without interruption.

---

## 2. Setting Up Sanity Studio (3 Quick Steps)

When you are ready to set up Sanity Studio:

### Step 1: Initialize Sanity Studio in a subfolder or separate repository
In your terminal, run:
```bash
npm create sanity@latest
```
Follow the interactive prompts:
- Select **Clean project with no predefined schemas**.
- Choose project name: `nikkytoks-cms`.
- Dataset: `production`.

### Step 2: Copy the Schema Files
Copy the pre-made schemas from `sanity-schema.js` into your Sanity Studio `schemaTypes` folder:
- `productSchema` -> `schemaTypes/product.js`
- `settingsSchema` -> `schemaTypes/settings.js`

Register them in `sanity.config.js`:
```javascript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { productSchema, settingsSchema } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'NIKKYTOKS VENTURES CMS',
  projectId: '<YOUR_PROJECT_ID>',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [productSchema, settingsSchema],
  },
});
```

### Step 3: Connect to NikkyToks Website
Set these environment variables when starting your server:
```bash
# In Windows PowerShell:
$env:SANITY_PROJECT_ID="your_project_id"
$env:SANITY_DATASET="production"
node server.js
```
Or define them in your cloud hosting provider (e.g. Render, Railway, Vercel, Heroku, VPS).

---

## 3. Product Schema Fields Mapped to Website

| Field in Sanity | Field on Website | Notes |
| :--- | :--- | :--- |
| `name` | Product Title | Displayed on product cards & modal |
| `category` | Equipment Category | Filters (Power Generation, Power Tools, etc.) |
| `brand` | OEM Brand Tag | e.g. Elepaq, Mikano, INGCO, Bosch, Nexans |
| `description` | Product Overview | Displayed on card & details modal |
| `specs` | Engineering Specs | Copper windings, KVA rating, cable size |
| `image` | Photo | Upload PNG, JPG, or WebP via Sanity Asset CDN |
| `icon` | Vector Icon | Select Zap, Tools, Wrench, Plug, Droplet, Oil, etc. |
| `featured` | Star / Featured | Pinned to top of catalogue & homepage |
| `available` | In-Stock / On Order | Controls green LED "In Stock" badge |

---

## 4. Direct Uploads from Sanity Studio
Once Sanity Studio is running:
1. Open your Sanity Studio URL (e.g. `https://nikkytoks.sanity.studio` or `http://localhost:3333`).
2. Click **Create New Equipment**.
3. Upload high-res product photos, write specs, and click **Publish**.
4. The product immediately appears live on the NIKKYTOKS VENTURES website!
