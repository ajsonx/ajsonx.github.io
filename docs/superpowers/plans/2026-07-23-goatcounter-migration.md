# GoatCounter Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public LeanCloud page-view counter with GoatCounter without retaining historical counts.

**Architecture:** Keep the existing counter placeholders in generated pages but rename them for GoatCounter. A shared browser script reads each article path, requests the corresponding public GoatCounter count, and falls back to `0`; GoatCounter's official `count.js` records visits independently.

**Tech Stack:** Static HTML, browser JavaScript, GoatCounter hosted service

## Global Constraints

- Do not preserve or import LeanCloud page-view history.
- Use `https://ajsonx.goatcounter.com/count`.
- Do not modify Valine comments in this migration.
- Do not modify article content or visual styling.

---

### Task 1: Shared GoatCounter display logic

**Files:**
- Create: `js/goatcounter-views.js`

**Interfaces:**
- Consumes: `.goatcounter_visitors` elements whose `id` is the article pathname.
- Produces: Text content in each `.goatcounter-visitors-count` element.

- [ ] Verify the current site fails the desired structural checks because the shared script and GoatCounter placeholders do not exist.
- [ ] Add a small browser script that requests `/counter/<encoded-path>.json`.
- [ ] Display the returned `count`, or `0` for missing paths, blocked requests, and malformed responses.

### Task 2: Replace generated-page integrations

**Files:**
- Modify: all generated `*.html` files containing `function leancloudSelector`
- Delete: `leancloud.memo`
- Delete: `leancloud_counter_security_urls.json`

**Interfaces:**
- Consumes: `js/goatcounter-views.js`.
- Produces: Pages that record views through GoatCounter and display GoatCounter counts.

- [ ] Replace LeanCloud counter class names with GoatCounter class names.
- [ ] Replace each inline LeanCloud Counter block with the official GoatCounter tracking script and the shared display script.
- [ ] Confirm all 68 former Counter pages were migrated and no old Counter block remains.
- [ ] Confirm Valine integrations remain unchanged.

### Task 3: Browser and production verification

**Files:**
- Verify only; no new files.

**Interfaces:**
- Consumes: the generated static site.
- Produces: evidence that desktop, mobile, fallback, and live tracking work.

- [ ] Serve the site locally and verify an article page plus the home page in a real browser.
- [ ] Verify desktop and mobile layouts retain the existing metadata alignment.
- [ ] Publish the focused change to `master`.
- [ ] Verify GoatCounter receives a production pageview and the live site no longer runs the LeanCloud Counter code.
