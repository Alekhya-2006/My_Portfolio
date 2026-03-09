# Cybersecurity Portfolio Website

Modern, responsive personal portfolio built with:
- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript

## Project Structure

```text
.
|- index.html   # Main page and all sections
|- style.css    # Custom theme/styles/animations
|- script.js    # Interactions (menu, reveal, progress bar, nav state)
```

## Quick Content Update Guide

Edit these sections in `index.html`:
- Hero: name, title, tagline
- About and Skills cards
- Project cards (title, description, tech, GitHub/live links)
- Timeline items
- Contact links and email
- Footer social links

Also update:
- `<meta name="author">`
- `og:url`
- Page `<title>`

## Local Preview

Open `index.html` directly in your browser, or use a local server:

```powershell
Password Strength Checker
A Python tool that analyzes password strength using entropy and common password lists.

Tech: Python
```

Then visit:
- Password Strength Checker
A Python tool that analyzes password strength using entropy and common password lists.

Tech: Python

## Deploy to GitHub Pages

1. Create a GitHub repository (for example: `portfolio`).
2. Push this project:

```powershell
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

3. In GitHub, go to:
- `Settings` -> `Pages`
4. Under **Build and deployment**:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`
5. Save and wait 1-2 minutes.
6. Your site URL will be:
- `https://<your-username>.github.io/portfolio/`

## Optional Custom Domain

In `Settings` -> `Pages`, set your custom domain and enable HTTPS.
