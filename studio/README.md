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

| Type                  | Purpose                                               | Website section            |
| --------------------- | ----------------------------------------------------- | -------------------------- |
| `speaker`             | Conference speakers                                   | XRAS KL → Speakers         |
| `partner`             | Partner logos — category controls which page shows it | See categories below       |
| `eventPhoto`          | Past event gallery photos                             | Home → Ecosystem in Action |
| `eventCard`           | Upcoming events & programme highlights                | Home → Events section      |
| `aboutPillar`         | Why XR pillars                                        | About → Why XR ASIA SUMMIT |
| `aboutCompanyOverview`| Company overview copy (keep one published entry)      | About → Company Overview   |
| `aboutMission`        | Mission statement (keep one published entry)          | About → Our Mission        |
| `aboutIndustryFocus`  | Industry focus intro (keep one published entry)         | About → Industry Focus     |
| `industryFocusSector` | Industry sector cards                                   | About → Industry Focus     |
| `aboutHighlightPhoto` | Award highlight photos                                | About → Awards             |
| `awardRecognition`    | Awards copy (keep one published entry)                | About → Awards             |

### Partner categories

| Category           | Website section             |
| ------------------ | --------------------------- |
| Government Partner | Home → Past Partners slider |
| Tech Partner       | Home → Past Partners slider |
| Media Partner      | XRAS KL → Event Partners    |

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
