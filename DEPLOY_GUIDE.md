# Haflati Landing Page — Deployment Guide

## Step 1: Deploy to Cloudflare Pages

Since you already own haflati.app on Cloudflare, deployment is simple.

### Option A: Drag & Drop Upload (Easiest)

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create** button (top right)
4. Select the **Pages** tab
5. Click **Upload assets**
6. Give your project a name: `haflati-landing`
7. **Drag and drop the entire `haflati-landing` folder** into the upload area
8. Wait for upload to complete
9. Click **Deploy site**
10. Your site is now live at `haflati-landing.pages.dev`!

### Option B: Connect to GitHub (Auto-deploy on changes)

1. Create a GitHub repository called `haflati-landing`
2. Push the `haflati-landing` folder to it
3. In Cloudflare Dashboard → Workers & Pages → Create → Pages
4. Select **Connect to Git**
5. Choose your `haflati-landing` repository
6. Build settings: leave everything empty (no build command needed, it's static)
7. Click **Save and Deploy**
8. Now every time you push changes to GitHub, it auto-deploys!

---

## Step 2: Connect Your Domain (haflati.app)

After deploying, connect your custom domain:

1. In Cloudflare Dashboard → Workers & Pages
2. Click on your `haflati-landing` project
3. Go to **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `haflati.app`
6. Click **Continue**
7. Cloudflare will automatically configure the DNS (since the domain is already on Cloudflare)
8. Wait 1-2 minutes for it to activate
9. Your site is now live at **https://haflati.app** !

Also add `www.haflati.app`:
1. Click **Set up a custom domain** again
2. Enter: `www.haflati.app`
3. The `_redirects` file will automatically redirect www to non-www

---

## Step 3: SSL/HTTPS

**No action needed!** .app domains require HTTPS, and Cloudflare Pages provides free SSL automatically. Your site will be served over HTTPS by default.

---

## Step 4: Set Up Form Submissions (Waitlist + Vendor Forms)

The landing page has two forms that need a backend to save submissions. We'll use Google Sheets + Google Apps Script (100% free).

### 4a. Create Google Sheets

Create **2 Google Sheets**:

1. **Haflati Waitlist** — with columns:
   - `Timestamp` | `Name` | `Phone` | `City` | `Event_Types`

2. **Haflati Vendor Signups** — with columns:
   - `Timestamp` | `Business_Name` | `Contact_Name` | `Phone` | `City` | `Category`

### 4b. Create Google Apps Script

1. Go to https://script.google.com
2. Click **New Project**
3. Delete all the code and paste this:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var type = data.type; // 'waitlist' or 'vendor'

  var sheetId;
  if (type === 'waitlist') {
    sheetId = 'PASTE_WAITLIST_SHEET_ID_HERE';
  } else {
    sheetId = 'PASTE_VENDOR_SHEET_ID_HERE';
  }

  var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  var timestamp = new Date().toISOString();

  if (type === 'waitlist') {
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.city || '',
      (data.event_types || []).join(', ')
    ]);
  } else {
    sheet.appendRow([
      timestamp,
      data.business_name || '',
      data.contact_name || '',
      data.phone || '',
      data.city || '',
      data.category || ''
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Replace `PASTE_WAITLIST_SHEET_ID_HERE` with your waitlist sheet ID
   - The sheet ID is in the URL: `docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit`
5. Replace `PASTE_VENDOR_SHEET_ID_HERE` with your vendor sheet ID
6. Click **Deploy** → **New deployment**
7. Type: **Web app**
8. Execute as: **Me**
9. Who has access: **Anyone**
10. Click **Deploy**
11. Copy the **Web app URL** — it looks like: `https://script.google.com/macros/s/ABCDEF.../exec`

### 4c. Update the Landing Page

1. Open `js/main.js`
2. Find this line near the top:
   ```
   var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/REPLACE_WITH_SCRIPT_ID/exec';
   ```
3. Replace `REPLACE_WITH_SCRIPT_ID` with the actual script ID from step 4b
4. Re-upload to Cloudflare Pages (or push to GitHub if using Option B)

---

## Step 5: Update WhatsApp Number

1. Open `index.html`
2. Search for `966XXXXXXXXX`
3. Replace with your actual WhatsApp number (e.g., `966501234567`)
4. Re-deploy

---

## Step 6: Test Everything

After deploying, test these:

- [ ] Site loads at https://haflati.app
- [ ] Site loads at https://www.haflati.app (redirects to non-www)
- [ ] Arabic text displays correctly (RTL)
- [ ] Language toggle (AR/EN) works
- [ ] Mobile menu works on phone
- [ ] WhatsApp button opens WhatsApp
- [ ] Chat widget opens and answers questions
- [ ] Waitlist form submits (check Google Sheet)
- [ ] Vendor form submits (check Google Sheet)
- [ ] FAQ accordion opens/closes
- [ ] All sections scroll smoothly
- [ ] Share on WhatsApp/Twitter shows correct preview image

---

## Updating the Site

### If using drag & drop:
1. Make your changes to the files
2. Go to Cloudflare Dashboard → Workers & Pages → haflati-landing
3. Click **Create new deployment**
4. Upload the updated folder

### If using GitHub:
1. Make your changes
2. Push to GitHub
3. Cloudflare auto-deploys within 1-2 minutes

---

## Troubleshooting

**Site not loading?**
- Check Cloudflare Dashboard → DNS → make sure haflati.app points to your Pages project

**Forms not saving?**
- Open browser console (F12) and check for errors
- Make sure the Google Apps Script URL is correct in main.js
- Make sure the script is deployed as "Anyone" access

**Arabic text looks wrong?**
- Make sure the `<html>` tag has `dir="rtl"` and `lang="ar"`
- Clear browser cache (Ctrl+Shift+R)

**Need help?**
- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Ask Claude Code for help!
