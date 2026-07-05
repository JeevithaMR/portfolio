# Jeevitha MR — Portfolio

A premium, single-page personal portfolio built with vanilla HTML, CSS, and JavaScript.

## Important: `index.html` is fully self-contained

All CSS and JavaScript are embedded directly inside `index.html` — there are
no external files it depends on to render correctly. This means:

- You can download **just `index.html` on its own** and it will still show
  full styling, colors, and animations. Nothing extra required.
- Moving the file anywhere, renaming the folder, opening it straight from
  Downloads, VS Code, or after unzipping — all of it works the same way.
- `css/style.css` and `js/main.js` are still included in this folder as
  readable reference copies of the same code (useful if you want to hand
  this to a developer later, or edit things separately), but `index.html`
  does **not** load them — everything it needs is already inside itself.

If you ever edit `css/style.css` or `js/main.js` separately, remember those
changes won't show up on the site until they're copied back into the
`<style>` and `<script>` blocks inside `index.html`.

## Structure

```
portfolio/
├── index.html              # Self-contained — open this directly, nothing else required
├── css/
│   └── style.css           # Reference copy of the styles (not loaded by index.html)
├── js/
│   └── main.js              # Reference copy of the script (not loaded by index.html)
├── assets/
│   └── images/
│       ├── hero/            # Optional hero visuals
│       ├── projects/        # Lenskart, Wellnest, Indore project media
│       ├── certifications/  # Certificate images
│       ├── awards/          # Award/recognition photos
│       └── victories/       # Competition mementos & certificates
│   └── documents/           # Project reports, research papers, PPTs (as PDF)
└── README.md
```

## Running locally

Just double-click `index.html`, or open it in a browser. That's it — no
server, no build step, no other files required for it to render correctly.

If you'd prefer to serve it locally anyway (optional, e.g. for testing on a
phone on the same network):

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Adding your project reports, research papers, and PPTs

Each project card has "Report" / "Research Paper" / "PPT" buttons that open a
file in a new tab. Drop your files into `assets/documents/` using these exact
names:

| Project | Files |
|---|---|
| Lenskart | `lenskart-report.pdf`, `lenskart-research-paper.pdf`, `lenskart-ppt.pdf` |
| Wellnest | `wellnest-report.pdf`, `wellnest-research-paper.pdf`, `wellnest-ppt.pdf` |
| Indore Market Analysis | `indore-market-report.pdf` |

**Important:** these buttons expect PDF files, since PDFs open directly in
the browser. If your report or PPT is currently a `.docx` or `.pptx`, export
it as a PDF first (in Word/PowerPoint: File → Save As / Export → PDF) — this
also looks more professional when a visitor clicks to view it.

## Do I need to upload my certificates before pushing to GitHub, or can I add them later?

You can add them **any time** — before or after. GitHub just stores whatever
files are in this folder; it doesn't require everything to be "complete"
upfront. A common, easy workflow:

1. Push the project to GitHub now, even with placeholders.
2. Whenever you have a certificate/report ready, drop it into the matching
   `assets/images/...` or `assets/documents/...` folder with the exact
   filename from the tables above.
3. Commit and push again (`git add .`, `git commit -m "Add certificates"`,
   `git push`) — if you're using GitHub Pages, the live site updates
   automatically within a minute or two.

So there's no need to wait until everything is ready — you can launch now and
fill in images/documents gradually.

## Adding your certificate, award, and victory images (easiest method)

Every "View Certificate" / "View" button is already wired to look for an
image at a specific path. **Just drop a JPG with the exact filename below
into the matching folder — no code editing required.** The lightbox checks
for the file automatically; if it's not there yet, the placeholder still
shows so nothing breaks.

| Section | Folder | Expected filename |
|---|---|---|
| Certifications | `assets/images/certifications/` | `acas.jpg` |
| | | `acas-pro.jpg` |
| | | `business-analysis.jpg` |
| | | `tally-accounting.jpg` |
| Experience | `assets/images/certifications/` | `internship.jpg` |
| Awards & Recognition | `assets/images/awards/` | `voice-of-sapthagiri.jpg` |
| | | `student-ambassador.jpg` |
| | | `acas-ace.jpg` |
| | | `acas-pro-enovation.jpg` |
| | | `best-individual-presenter.jpg` |
| | | `best-performance.jpg` |
| | | `exemplary-performance.jpg` |
| | | `ted-ed.jpg` |
| | | `anchor-extraordinaire.jpg` |
| Hall of Victories | `assets/images/victories/` | `aakhyana.jpg` |
| | | `yaksha-prashne-2nd.jpg` |
| | | `yaksha-prashne-3rd.jpg` |
| | | `manthan.jpg` |
| | | `mayajaala.jpg` |
| | | `vrittanta.jpg` |

**Tips:**
- Files must be `.jpg`. If your photo is a `.png` or `.jpeg`, either convert
  it or update the file extension in the matching `data-lightbox-src`
  attribute inside `index.html` (search for the certificate/award name).
- Just rename your photo to match the table exactly (case-sensitive) and drop
  it in — refresh the page and click "View" to confirm it shows up.

## Adding your project images (Lenskart, Wellnest, Indore report/PPT)

Projects currently show a styled placeholder panel above each description.

1. Drop the image into `assets/images/projects/` — e.g. `lenskart.jpg`,
   `wellnest.jpg`, `indore-market.jpg`.
2. In `index.html`, find the matching `<div class="project-media placeholder-media" ...>` and replace it with:
   ```html
   <div class="project-media">
     <img src="assets/images/projects/lenskart.jpg" alt="Lenskart project" />
   </div>
   ```
3. Repeat for each of the three project cards.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (keep `index.html` at the repo root).
2. Go to **Settings → Pages**.
3. Set the source branch to `main` and the folder to `/ (root)`.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes

- Fonts are loaded from Google Fonts (Space Grotesk, Inter, JetBrains Mono).
- No frameworks or build tools — just static HTML/CSS/JS, so it can be hosted anywhere.
- All animations respect `prefers-reduced-motion`.
