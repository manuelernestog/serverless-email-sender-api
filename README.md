# Serverless Email API Powered by Sveltekit, Nodemailer and Gmail SMTP

This repository contains a SvelteKit application deployed on Vercel, providing an API endpoint to send emails using Nodemailer and Gmail's SMTP server.

> This repository does not work on Cloudflare due does not support Nodemailer, that's why we are using Vercel instead, but you can use Netlify or other hosting services compatible with Nodemailer. To use this repository in other hosting services, you need to change the `adapter` in `svelte.config.js` to the one that supports your hosting service.

## Features

- **Send Emails**: Send emails by making a `POST` request to the `/send` endpoint.
- **Authorization**: Secures the endpoint with a Bearer token.
- **JSON Payload**: Accepts email details (`from`, `to`, `subject`, `html`) in JSON format.

## Prerequisites

- **Node.js and npm**: [Install Node.js](https://nodejs.org/)
- **Gmail Account**: A Gmail account with App Passwords enabled (if using two-factor authentication)
- **Vercel Account**: [Sign up for Vercel](https://vercel.com/signup)

## Quick Setup

### 1. [Set Up Gmail App Password](#4-set-up-gmail-app-password)

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmanuelernestog%2Fserverless-email-sender-api&env=AUTH_TOKEN,SMTP_USERNAME,SMTP_PASSWORD&project-name=serverless-email-sender-api&repository-name=serverless-email-sender-api)

#### Configure your env vars:

```ini
AUTH_TOKEN=your_authorization_token // Set a random auth token for use it later on your requests
SMTP_USERNAME=your_gmail_address@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

### 3. [Send your first email!](#usage)



## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```ini
AUTH_TOKEN=your_authorization_token
SMTP_USERNAME=your_gmail_address@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

**Note**: Do not commit the `.env` file to version control to keep your credentials secure.

### 4. Set Up Gmail App Password

If you have two-factor authentication enabled on your Gmail account, you'll need to generate an App Password.

#### How to Configure an App Password for Your Gmail Account

1. **Enable Two-Factor Authentication (if not already enabled)**:
   - Go to your Google Account security settings: [Google Account Security](https://myaccount.google.com/security)
   - Under "Signing in to Google," select **2-Step Verification** and follow the prompts to enable it.

2. **Generate an App Password**:
   - Return to the [Google Account Security](https://myaccount.google.com/security) page.
   - Under "Signing in to Google," select **App Passwords** or type in the search bar **App Passwords**
   - Follow the prompts to enable it
   - Google will generate a 16-character app password. Copy this password; you'll need it for the `SMTP_PASSWORD` environment variable.

**Important**: Keep this app password secure and do not share it.

### 5. Run Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 6. Test the API

Make a `POST` request to `http://localhost:5173/send` with the appropriate headers and body.

#### Example Request

```bash
curl -X POST http://localhost:5173/send \
  -H "Authorization: Bearer your_authorization_token" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "your_gmail_address@gmail.com",
    "to": "recipient@example.com",
    "subject": "Hello World",
    "html": "<h1>It works!</h1>"
  }'
```


### 6 Deploy to Vercel

#### Import Project into Vercel

1. **Log In to Vercel**: Go to [Vercel Dashboard](https://vercel.com/dashboard) and log in.

2. **Import Project**:
   - Click on **"New Project"**.
   - Select the Git repository containing your SvelteKit application.

3. **Configure Project Settings**:
   - **Framework Preset**: Vercel should auto-detect SvelteKit.
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### Set Environment Variables

In the **"Environment Variables"** section, add the following variables:

- `AUTH_TOKEN`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`

**Note**: Vercel supports different environment variable configurations for development, preview, and production environments.

#### Deploy the Project

- Click **"Deploy"** to start the deployment process.

## Usage

### Endpoint

- **URL**: `https://your-pages-domain/send`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer your_authorization_token`
  - `Content-Type: application/json`
- **Body**:

  ```json
  {
    "from": "your_gmail_address@gmail.com",
    "to": "recipient@example.com",
    "subject": "Hello World",
    "html": "<h1>It works!</h1>"
  }
  ```

### Responses

- **200 OK**: Email sent successfully.
- **400 Bad Request**: Missing required fields or invalid JSON.
- **401 Unauthorized**: Missing or malformed `Authorization` header.
- **403 Forbidden**: Invalid authorization token.
- **500 Internal Server Error**: An error occurred on the server.

## Notes

- **Gmail SMTP**: Ensure that you have enabled [App Passwords](https://support.google.com/accounts/answer/185833) if you have two-factor authentication enabled.
- **Security**: Never expose your SMTP credentials in the code or commit them to version control.
- **Multiple Recipients**: The `to` field can be a single email address or an array of email addresses.
- **Email Limits**: Gmail has sending limits; for higher volumes, consider using a professional email service.

## Troubleshooting

- **Authentication Issues**: Verify your SMTP credentials and ensure App Passwords are used if necessary.
- **Email Delivery Problems**: Check your Gmail account for any security alerts or issues.
- **Environment Variables**: Ensure environment variables are correctly set both locally and in Vercel.

## Extra

### **Configure Custom Domain Alias in Gmail**

#### **1. Access Gmail Settings**

- Log in to your Gmail account.
- Click on the **gear icon** ⚙️ in the top-right corner.
- Select **"See all settings"** from the dropdown menu.

#### **2. Navigate to the "Accounts and Import" Tab**

- Click on the **"Accounts and Import"** tab at the top.

#### **3. Add Your Custom Email Address**

- In the **"Send mail as"** section, click on **"Add another email address"**.

#### **4. Enter Your Custom Email Details**

- **Name**: Enter the name you want recipients to see.
- **Email address**: Enter your custom domain email (e.g., `you@yourdomain.com`).
- **Treat as an alias**: Keep this checked if you want to receive replies in Gmail.
- Click **"Next Step"**.

#### **5. Choose the SMTP Server Option**

##### **Option A: Use Gmail's SMTP Servers**

- **SMTP Server**: `smtp.gmail.com`
- **Username**: Your full Gmail address (e.g., `yourgmail@gmail.com`).
- **Password**: Your Gmail password or [App Password](https://support.google.com/accounts/answer/185833) if 2FA is enabled.
- **Port**: `587` (TLS) or `465` (SSL)
- **Secure Connection**: Select **"Secured connection using TLS"**.
- Click **"Add Account"**.

#### **6. Verify Your Email Address**

- Gmail will send a verification email to your custom email address.
- Access your custom email inbox (via webmail or email client).
- Open the email from Gmail and click the verification link or enter the provided code in Gmail's settings.

#### **7. Set Your Custom Email as Default (Optional)**

- In Gmail settings under **"Send mail as"**, you can make your custom email the default address by clicking **"make default"** next to it.


## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
