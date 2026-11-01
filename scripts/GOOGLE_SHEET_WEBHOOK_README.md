# Course applications → Google Sheet

Every saved course form is copied to a private Google Sheet, one row per person.
If the Sheet is not set up, or is down, the form still works: the row is only saved in Supabase.

Owner account: **benzadidintelligence@gmail.com**. Do every step while signed in to that account.
About 10 minutes.

## 1. Run the new Supabase SQL (once)

The form now asks for WhatsApp and email.

1. Open Supabase → your project → **SQL Editor** → **New query**.
2. Paste everything from `supabase/course_applications_contact.sql`.
3. Press **Run**. You should see "Success".

## 2. Make the Sheet

1. Go to https://sheets.google.com → **Blank spreadsheet**.
2. Name it, for example: `Digital Residency – Applications`.
3. Do **not** share it with anyone. It will hold BMDC numbers and ID links.

## 3. Add the script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete everything in `Code.gs`.
3. Paste everything from `scripts/google-sheet-webhook.gs`.
4. Press **Save** (disk icon).

## 4. Set the secret

1. Make a long random password, for example from https://www.random.org/passwords/ (32 characters).
2. In Apps Script: **Project Settings** (gear icon, left) → **Script Properties** → **Add script property**.
3. Property: `SHEET_SECRET`, Value: your random password. Press **Save script properties**.
4. Keep the password. It goes into Vercel in step 6.

## 5. Deploy

1. Top right: **Deploy → New deployment**.
2. Gear icon next to "Select type" → **Web app**.
3. Description: `course form`.
4. Execute as: **Me (benzadidintelligence@gmail.com)**.
5. Who has access: **Anyone**.
   This is needed so the website can send rows. The secret stops everyone else, and nobody can read the Sheet through it.
6. Press **Deploy**. Google asks for permission: **Authorize access** → pick the account →
   "Google hasn't verified this app" → **Advanced** → **Go to … (unsafe)** → **Allow**.
   This is normal for your own script.
7. Copy the **Web app URL** (it ends in `/exec`).

## 6. Put the URL and secret in Vercel

Vercel → project → **Settings → Environment Variables**, for **Production** (and Preview if you test there):

| Name | Value |
|---|---|
| `GOOGLE_SHEET_WEBHOOK_URL` | the Web app URL from step 5 |
| `GOOGLE_SHEET_WEBHOOK_SECRET` | the password from step 4 |

Then **Deployments → … → Redeploy**, so the site reads the new values.
For local testing, add the same two lines to `.env.local`.

## 7. Test

Fill the course form once with test data. A row should appear in the `Applications` tab within a few seconds.
Delete the test row afterwards (and the test entry in the admin panel).

## Columns

Timestamp (Bangladesh time) · Name · WhatsApp · Email · Who (doctor/student) · BMDC no. / College + session · ID photo link · **Status · Payment · Amount · Notes**

The last four start empty. You fill them by hand.

The ID photo itself is never put in the Sheet. The link opens the admin panel's application list, where only you can see the image after logging in.

## If you change the script later

**Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**
The URL stays the same, so Vercel does not need changing.

## If rows stop coming

- Vercel → project → **Logs**, search `google sheet log failed`.
  - `unauthorized` means the secret in Vercel and in Script Properties are not the same.
  - A timeout means Google was slow. The row is still safe in Supabase.
