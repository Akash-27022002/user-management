# Deployment Guide

This guide will help you deploy your project on Render.

## Step-by-Step Instructions

### 1. Login to Render

1. Go to [Render](https://render.com/).
2. If you don't have an account, sign up and verify your email address.
3. Login to your Render account.

### 2. Create a New Web Service

1. After logging in, click on the "New" button in the dashboard.
2. Select "Web Service" from the dropdown.

### 3. Connect Your GitHub Repository

1. Render will prompt you to connect your GitHub account. Click on "Connect account".
2. Authorize Render to access your GitHub repositories.
3. Select the repository you want to deploy from the list.

### 4. Configure the Web Service

1. **Name**: Enter a name for your service.
2. **Branch**: Select the branch you want to deploy (e.g., `main`).
3. **Build Command**: Enter the command to build your project. Example:
   ```sh
   ./build.sh
