# Sanity Studio — XR Summits

Content Studio for **XR Summits** (`projectId: fych0nrj`, dataset: `production`).

## URLs

| Environment | URL                                                                  |
| ----------- | -------------------------------------------------------------------- |
| Local       | [http://localhost:3333](http://localhost:3333)                       |
| Production  | [https://xr-summits.sanity.studio](https://xr-summits.sanity.studio) |

## Run locally

```bash
# from repo root
npm run studio

# or from this folder
npm run dev
```

## Schema types

| Type      | Purpose                                               |
| --------- | ----------------------------------------------------- |
| `speaker` | Conference speakers (name, role, photo, bio, order)   |
| `partner` | Event / media / tech partners (logo, category, order) |

Toggle **Show on website** (`active`) to hide a document without deleting it.

Photos/logos can be uploaded in Studio, or set via the URL fallback fields (`photoUrl` / `logoUrl`) pointing at existing `/public` assets.

## Deploy / update hosted Studio

```bash
# from repo root
npm run studio:deploy

# or from this folder
npm run deploy
```

After schema changes you want live in the hosted Studio, re-run deploy.
