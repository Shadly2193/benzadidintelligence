# Admin payments → monthly Google Sheet

When a payment is saved in Admin → Course applications, that student's line in the course block
(columns AE–AV of the current month's tab) is added or updated. Students who only filled the form
are not sent. If the Sheet is down, the admin panel still saves and shows a small warning.

Sheet: **Benzadid Intelligence_Website clients**, owned by **benzadidintelligence@gmail.com**. Do these steps signed in to that account.

## Setup (once)

1. Open the Sheet → **Extensions → Apps Script**. Delete what is in `Code.gs`, paste all of `scripts/google-sheet-webhook.gs`, press **Save**.
2. Make a long random password (for example at https://www.random.org/passwords/). Keep it.
3. Apps Script → ⚙️ **Project Settings** → **Script Properties** → **Add script property**. Property `SHEET_SECRET`, value your password. **Save**.
4. Safe test: open the **November 2026** tab in the Sheet, then in Apps Script choose `testOnCopy` at the top and press **Run**. Allow access when Google asks. A new tab "SCRIPT TEST" appears with TEST STUDENT in AF4, Paid. The real tab is not changed. Delete "SCRIPT TEST" afterwards.
5. **Deploy → New deployment** → ⚙️ **Web app**. Execute as **Me**, Who has access **Anyone**, then **Deploy**. Copy the URL ending in `/exec`.
   "Anyone" only lets the website send data with the password. Nobody can read the Sheet through it.
6. Vercel → **Settings → Environment Variables**, Production:
   - `GOOGLE_SHEET_WEBHOOK_URL` = the URL
   - `GOOGLE_SHEET_WEBHOOK_SECRET` = the password
7. **Deployments → Redeploy** the latest one.
8. Admin → Course applications → **Sync all to Sheet**.

## Every new month

1. Right-click last month's tab → **Duplicate**.
2. Rename it exactly like `December 2026` (no dot at the end).
3. Admin → **Sync all to Sheet**. Previously Received and Received This Month are recalculated for everyone.
4. Clear the Course Expenses amounts and update the titles.
5. Delete the lines of students refunded last month from the new tab only.

## Rules

- Enter payments only in the admin panel. Hand edits in AF–AO, AR or AS are overwritten at the next sync.
- Notes (AU) is yours. The formula columns are never written.
- Only the current month's tab is ever written. Earlier months stay as they are.

## If you change the script later

**Deploy → Manage deployments → pencil → Version: New version → Deploy.** The URL stays the same.
