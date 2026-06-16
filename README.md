# TeX Resume Engineer

A desktop and mobile-optimized resume builder and compiler modeled after professional LaTeX typesetting patterns. This application allows you to visually customize resume components and instantaneously exports either **clean LaTeX code (.tex)** or a **perfectly formatted, page-fitted PDF document**.

---

## 🚀 How to Download / Export Your Resume as a PDF

This application offers **two convenient methods** to export a polished PDF:

### Method 1: Direct Browser Print (Fastest & Simplest)
We have integrated a print-media engine that hides all control bars, forms, dashboards, and sidebars, allowing you to print or save the visual sheet as a PDF directly from your browser.

1. Locate the **"Print PDF"** button inside the "Page Sizing & Spacing Presets" control bar at the top of the Visual Preview panel. 
2. Click the button (or press `Ctrl + P` / `Cmd + P` on your keyboard).
3. In the printer preview window that appears:
   - **Destination**: Choose **"Save as PDF"** or **"Microsoft Print to PDF"**.
   - **Layout**: Select **Portrait**.
   - **Quality/Paper Size**: Choose the matching format (**A4** or **Letter-size**) you configured in the layout settings.
   - **Headers and Footers**: Ensure this option is **unchecked** (to hide automatic browser timestamps or web addresses).
   - **Background Graphics**: Ensure this option is **checked** (to preserve custom color accents and subtle lines).
4. Click **Save** to download your PDF document.

---

### Method 2: Overleaf compilation (Professional Vector Output)
Because this application is a true LaTeX-based resume engine, compiling your exported TeX source file on Overleaf gets you a pixel-perfect, peerless vector PDF.

1. Click on the **"LaTeX Code (.tex)"** tab above the Preview Panel to view the auto-generated typesetting markup.
2. Select **"Copy LaTeX"** to copy the code to your clipboard, or click **"Download .tex"** to save the raw text file.
3. Open a browser and navigate to **[Overleaf.com](https://www.overleaf.com)** (a free online LaTeX editor).
4. Sign in and click **New Project** ➔ **Empty Project**.
5. Delete all default placeholder text inside the `main.tex` template in your workspace and paste your generated code.
6. Click **Recompile** (or hit `Ctrl + Enter` / `Cmd + Enter`).
7. Click the **Download PDF** button directly to download a typesetting-caliber, recruiter-ready resume!

---

## ✨ Features In This App

* **Live Interactive Form Fields**: Easily change your personal info, programming skills, job experiences, educational details, side projects, activities, and certifications.
* **Auto-Fit & Overflow Monitor**: Automatically flags if the current content length exceeds a single page layouts size. The **"Auto-Fit"** utility instantly adjusts fonts, spacing gaps, dynamic margins, and line heights so everything nests perfectly onto page boundaries.
* **Color Accent Theme Presets**: Choose elegant custom design themes directly matching professional standards.
* **Responsive Visual Showcase**: Built with fluid scale containers so you can review typesetting accurately on any desktop, tablet, or mobile phone.

---

## 🛠️ Local Development & Quick Start

If you downloaded the code files and want to run this application on your local machine, follow these steps:

### Prerequisites
Make sure you have NodeJS (v16.x or newer) installed.

### 1. Install Dependencies
Run the package manager from the directory root:
```bash
npm install
```

### 2. Run in Dev Mode
Launch the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 3. Build & Compile for Production
Compile static output files:
```bash
npm run build
```
The optimized production build is generated inside the `/dist` folder.

