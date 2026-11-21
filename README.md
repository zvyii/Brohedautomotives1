# Brohed Automotives website

Two wheeler garage website (Jagatpura, Jaipur). Static site: no build step, no server. Works directly on GitHub Pages.

## Folder structure

```
index.html        main page
404.html          "page not found" page
css/style.css     all styles
js/app.js         services, WhatsApp booking, 3D garage
js/three.min.js   Three.js r128 (self-hosted, MIT license)
img/              logo, storefront photo, gallery photos
.nojekyll         tells GitHub Pages to serve files as they are
```

## GitHub Pages par host karne ke steps

1. GitHub par naya repository banao, jaise `brohed-automotives` (Public).
2. Is folder ki saari files repository mein upload karo (`index.html` repository ke root mein hona chahiye).
   - Website se: repository kholo, **Add file > Upload files**, saari files aur folders drag karo, **Commit changes** dabao.
   - Ya git se:
     ```
     git init
     git add .
     git commit -m "Brohed Automotives website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/brohed-automotives.git
     git push -u origin main
     ```
3. Repository mein **Settings > Pages** kholo.
4. **Build and deployment** mein Source: **Deploy from a branch**, Branch: **main**, folder: **/ (root)**, phir **Save**.
5. 1 se 2 minute baad site is address par live hogi:
   `https://YOUR-USERNAME.github.io/brohed-automotives/`

## Custom domain (optional)

**Settings > Pages > Custom domain** mein apna domain likho aur domain ke DNS mein GitHub Pages ka record jodo.

## Cheezein badalni hon to

- **WhatsApp number:** `js/app.js` ke shuru mein `var WA='919057330033';` (country code 91 ke saath, bina + ke).
- **Services ka text:** `js/app.js` mein `SERVICES` list.
- **Address, timing, Google Maps link:** `index.html` mein `location` section. Maps link `https://share.google/7j4njs6KCoO7Ocdc9` hai.
- **Photos:** `img/` folder mein usi naam se nayi photo daal do.
- **Rang:** `css/style.css` ke shuru mein `--yellow` aur `--bg`.

## Zaroori baatein

- Site ko `file://` se seedha double click karke kholne par 3D logo texture load nahi hota. Local mein dekhna ho to folder mein `python3 -m http.server` chalao aur `http://localhost:8000` kholo. GitHub Pages par ye problem nahi hai.
- WhatsApp button message taiyar karta hai, lekin bhejna customer ko khud padta hai (Send dabana).
- Google Maps ko page ke andar embed nahi kiya, button se Google Maps khulta hai.
- Google par site dikhane ke liye Google Search Console mein site ka address jod do. Page mein business ki jaankari (name, address, rating) pehle se structured data mein hai.
