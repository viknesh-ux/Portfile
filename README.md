# CyberShield | Futuristic Cybersecurity Portfolio

A high-end, cyberpunk-themed cybersecurity portfolio website built with Next.js 15, Supabase, and Framer Motion.

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom OKLCH Color Palette
- **Animations**: Framer Motion
- **UI Components**: ShadCN UI + Custom Cyber Components
- **Backend**: Supabase (Auth, Database, Storage)
- **Icons**: Lucide React
- **Notifications**: Sonner

## ✨ Features
- **Futuristic UI**: Dark theme with neon accents, scanlines, and animated grid backgrounds.
- **Dynamic CMS**: Admin dashboard to manage all site content (Hero, About, Projects, Skills, etc.).
- **Interactive Terminal**: Custom-built hacker terminal with functional commands.
- **Command Palette**: `Ctrl+K` navigation for a pro-user experience.
- **Secure Admin**: Protected routes via Supabase Auth.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Glassmorphism**: Premium frosted glass effects throughout.

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
npm install
```

### 2. Supabase Configuration
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** and run the contents of `supabase_schema.sql` (found in the artifacts).
3. In **Authentication > Providers**, ensure Email/Password is enabled.
4. In **Project Settings > API**, copy your `URL` and `Anon Key`.

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Locally
```bash
npm run dev
```

## 🔒 Security
- **RLS**: Row Level Security is enabled on all tables.
- **Admin Access**: Only users with the `admin` role in the `profiles` table can access the `/admin` dashboard.
- **Encrypted Transmission**: Contact form submissions are stored securely in Supabase.

## 📁 Project Structure
- `src/app`: Next.js App Router (Pages & Layouts)
- `src/components/shared`: Reusable UI components (Terminal, CyberButton, GlassCard)
- `src/components/sections`: Frontend portfolio sections
- `src/lib/supabase`: Supabase client configuration
- `src/hooks`: Custom React hooks

---

Created with ❤️ by Antigravity
