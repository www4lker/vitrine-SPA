<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# My Experimental Portfolio

A collection of interactive summaries and Single Page Applications generated via AI. These are experimental prototypes exploring new ways to visualize complex information.

## Architecture

This is a lightweight, pure HTML/JavaScript application. No build steps or complex dependencies required.

- **index.html**: Main entry point.
- **viewer.html**: Project viewer.
- **scripts/sync-projects.js**: Node.js script to sync projects from `CORPUS/` to `projects/`.

## How to Run

1.  **View the Portfolio:**
    Simply open `index.html` in your web browser.

2.  **Add New Projects:**
    - Add your project folder to the `CORPUS/` directory.
    - Run the sync script:
      ```bash
      node scripts/sync-projects.js
      ```
    - Refresh `index.html`.

## Requirements

- **Node.js**: Only required if you need to run the `sync-projects.js` script to add new projects. The site itself is static and requires no runtime.
