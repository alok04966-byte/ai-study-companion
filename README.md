# AI Study Companion

A React-based application to manage study tasks, subjects, and AI-powered learning tools.

## Features
- Subject & Topic Management
- Task Tracking
- Revision Planner
- AI Study Assistant

## Tech Stack
- React
- Context API
- LocalStorage
- AI API (Gemini or OpenAI via env config)

## AI Configuration
- Default provider: Gemini (`VITE_AI_PROVIDER=gemini`)
- Optional provider: OpenAI (`VITE_AI_PROVIDER=openai`)

Set one of the following in `.env`:
- `VITE_GEMINI_API_KEY=...`
- `VITE_OPENAI_API_KEY=...`