# NIKKYTOKS VENTURES — Ready-to-run website

Node.js 18+ required. No npm install needed.

1. Extract the ZIP.
2. Open `nikkytoks-site` in VS Code.
3. Open Terminal > New Terminal.
4. Run `node server.js`.
5. Customer website: http://localhost:3000
6. Private admin page: http://localhost:3000/admin

On first launch, the server automatically creates the `data` folder and starter catalogue. You do not need to create JSON files.

Admin password for local demo: `ChangeThisBeforeLaunch!` — change before hosting publicly by setting `ADMIN_PASSWORD` environment variable. Do not put the site online with the default password.

Admin and customer pages are separate interfaces but share the same server and catalogue database. Customers see no admin link. Photos and product data are stored locally. For a real public deployment, improve authentication, add HTTPS, backups and persistent storage.
