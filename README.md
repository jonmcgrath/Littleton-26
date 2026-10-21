# Littleton NH Weekend Hikes

A small static site listing easy-to-moderate hikes within about 30 minutes of Littleton, NH, each 2 to 4 hours. Pick Saturday or Sunday, and each hike shows the latest sensible start time based on calculated sunset. Every hike has trail info links, trail map links and one-tap Waze buttons.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Files

- `index.html`: page structure
- `styles.css`: styling, with automatic dark mode
- `data.js`: all hike data and links. Edit this to add or change hikes.
- `app.js`: rendering, day picker and sunset calculation

The day picker always shows the upcoming Saturday and Sunday, so the site stays current without edits. The hike list itself reflects research done October 21, 2026.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploy to GitHub and Vercel

1. Create a new empty repository on GitHub.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Littleton hikes site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. In Vercel, choose Add New Project, then import the repository.
4. Set Framework Preset to "Other". Leave Build Command and Output Directory empty. Deploy.

Every push to `main` redeploys automatically.

## Data caveats

- Distances, climb and times come from the linked sources, which sometimes disagree. Ranges are shown where they do.
- Drive times are estimates. Waze shows the live ETA.
- Trailhead coordinates are approximate. Each Waze link also carries a name or address search. Check the pin before driving.
- The Sugarloaf and Mount Pemigewasset entries are slightly beyond a 30 minute drive.
