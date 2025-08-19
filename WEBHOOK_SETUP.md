# Google Chat Webhook Integration

This setup automatically sends notifications to your Google Chat when new weeks are published.

## How it works

1. **Build Hook**: When you run `npm run build`, it builds your site and then runs the notification script
2. **Week Detection**: The script scans your `src/content/weeks/` folder for markdown files
3. **Change Tracking**: It compares the latest week number with the last published week (stored in `.last-published-week`)
4. **Notifications**: If new weeks are found, it sends a formatted message to your Google Chat webhook

## Usage

### Automatic (Recommended)
```bash
npm run build
```
This builds your site AND sends notifications for any new weeks.

### Manual
```bash
npm run notify
```
This only runs the notification check without building.

### Build Only (No Notifications)
```bash
npm run build:only
```
This builds the site without checking for new weeks.

## Week File Requirements

For a week to trigger a notification, the markdown file must:

1. Be in `src/content/weeks/` folder
2. NOT start with `_` (underscore files are ignored)
3. Have `week: N` where N > 0 in the frontmatter
4. Have a `title` in the frontmatter
5. Optionally have a `description` in the frontmatter

Example week file (`week-2.md`):
```markdown
---
title: "JavaScript Fundamentals"
description: "Learn the basics of JavaScript programming"
week: 2
---

# Week 2 Content
...
```

## What gets sent to Google Chat

The notification includes:
- Week number and title
- Description (if provided)
- Direct link to the week page on your site

Example message:
```
🎉 New Week Published!

Week 2: JavaScript Fundamentals

Learn the basics of JavaScript programming

[View on site](https://tech-a.munusshih.com/week-2/)
```

## Troubleshooting

- **No notifications sent**: Check that your week files follow the naming and format requirements
- **Script fails**: Check the console output for error messages
- **Multiple notifications**: The script sends one notification per new week found

## Files involved

- `scripts/notify-new-week.mjs` - The notification script
- `.last-published-week` - Tracks the last notified week number (auto-generated)
- `package.json` - Contains the build scripts

## Security Note

The webhook URL is hardcoded in the script. Keep this repository private or move the URL to an environment variable for production use.
