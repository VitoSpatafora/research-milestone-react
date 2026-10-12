# ContentBoard

ContentBoard is a lightweight, admin-style content manager built for the Research Milestone project. It lets a user create content entries, organize them, and manage their publication status in one focused workspace.

## Features

- Add content items with a title, category, and description
- Browse seeded example items and new entries in a content library
- Search by keyword and filter by all items, published items, or drafts
- Publish or unpublish an item
- Edit and delete existing items
- Keep work after refresh with browser `localStorage`
- View simple content totals at a glance

## Setup and run

This project uses **npm** as its package manager.

```bash
npm install
npm run dev
```

Vite will show a local URL in the terminal. Open it in a browser to use the app. To create a production build, run:

```bash
npm run build
```

The project's dependencies and scripts are declared in `package.json`. The exact dependency versions installed on a machine are recorded in `package-lock.json`, making installations repeatable.

## Technologies considered

I considered a plain HTML/CSS/JavaScript implementation as well as React. React was selected because it supports fast UI development, reusable components, and has a large ecosystem of tools and learning resources. Its tradeoffs are the need for build tooling and the added complexity of managing component state as an app grows.

## What I learned

This project strengthened my understanding of React components and how state changes update the interface. I practiced controlled forms for collecting user input, passing item data through event handlers, and rendering filtered lists. I also learned how `localStorage` can preserve front-end data across page refreshes. Finally, I used npm to install packages, run development scripts, and understand how dependency information is saved in the project files.
