# Bragi Note MVP Plan

## Overview

The Minimum Viable Product (MVP) for Bragi Note focuses on delivering core value quickly while validating the three main use cases: catching up on missed information, improving communication, and simplifying complex content.

**Timeline**: Month 1-2 (8 weeks)
**Target**: Functional web application with 2 core features + basic third feature
**Success Criteria**: 100 beta users, 70% feature usage rate, positive feedback on core value proposition

---

## Core Features

### 1. "Did I Miss Anything?" (Primary Focus)

**Scope**: Basic implementation for Slack chat exports

#### What Users Can Do

- Upload a Slack chat export (JSON/CSV format)
- Get a summary of what happened while they were away
- See key decisions, action items, and deadlines mentioned

#### Technical Implementation

- Simple text processing pipeline using OpenAI GPT-3.5
- Basic prompt engineering for extraction
- Structured output format (JSON)
- No advanced AI features (sentiment analysis, context awareness)

#### User Experience

- Clean, simple web interface
- Drag-and-drop file upload
- Loading states with progress indicators
- Results displayed in readable card format
- Copy/share functionality for summaries

#### Success Metrics

- 80% of uploaded chats produce usable summaries
- Average processing time < 30 seconds
- User satisfaction score > 4/5

### 2. "Say It Better" (Secondary Focus)

**Scope**: Simple message rewriting with basic tone options

#### What Users Can Do

- Paste a message they want to send
- Select from 3-5 tone options (Professional, Friendly, Firm, Apologetic, Urgent)
- Get a rewritten version that preserves meaning but improves tone

#### Technical Implementation

- Prompt-based rewriting using GPT-3.5
- Pre-defined tone templates
- Side-by-side comparison view
- One-click copy functionality

#### User Experience

- Minimalist text input/output interface
- Tone selector buttons with clear labels
- Before/after comparison
- Quick feedback buttons (thumbs up/down)

#### Success Metrics

- 90% of rewrites preserve original meaning
- Average rewrite time < 10 seconds
- 60% of users use the feature multiple times per session

### 3. "Explain It Like I'm Stressed" (Basic Implementation)

**Scope**: Simple document explanation for short texts

#### What Users Can Do

- Paste short documents (emails, notices, simple contracts)
- Get a plain-language summary
- Highlight key action items

#### Technical Implementation

- Basic summarization prompts
- Limited to text < 2000 words
- Simple output format

#### User Experience

- Text input with character counter
- Summary output with key points highlighted
- Basic formatting for readability

#### Success Metrics

- 75% of explanations are rated helpful
- Processing limited to < 5000 characters initially

---

## Technical Architecture (MVP)

### Frontend

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React useState/useEffect (keep simple)
- **Deployment**: Vercel (free tier)

### Backend

- **API**: Next.js API routes
- **AI Integration**: Oumi
- **Agentic Pipeline**: Kestra
- **Database**: None initially (in-memory storage)
- **Authentication**: None (anonymous usage)

### Key Components

- File upload handling for Slack exports
- Text processing pipeline
- Simple prompt management
- Basic error handling and loading states

---

## Development Phases

### Week 1-2: Foundation

- Set up Next.js project with basic UI
- Implement "Did I Miss Anything" basic version
- Create file upload and processing pipeline
- Build simple results display

### Week 3-4: Feature Completion

- Complete "Say It Better" feature
- Add basic "Explain It" functionality
- Polish UI/UX across all features
- Implement basic error handling

### Week 5-6: Testing & Polish

- User testing with 10-20 beta users
- Fix critical bugs and UX issues
- Add basic analytics (page views, feature usage)
- Performance optimization

### Week 7-8: Launch Preparation

- Create landing page with feature explanations
- Set up basic user feedback collection
- Prepare documentation for beta users
- Final testing and deployment

---

## User Acquisition (MVP)

### Target Users

- Tech workers on remote teams (primary)
- Students missing classes
- Early adopters interested in AI productivity tools

### Channels

- Personal network and LinkedIn posts
- Product Hunt launch
- Reddit (r/productivity, r/Slack, r/artificial)
- Indie hacker communities

### Goal

- 100 active beta users in first month
- 50% weekly retention
- Qualitative feedback on core value

---

## Success Criteria

### Product Metrics

- **Feature Usage**: >70% of users try all features
- **Session Length**: Average 5+ minutes
- **Return Usage**: 40% of users return within 1 week
- **Error Rate**: <5% of requests fail

### User Feedback

- **Satisfaction**: Average rating >4/5
- **Value Perception**: Users report saving time or reducing anxiety
- **Feature Requests**: Clear patterns for what to build next

### Technical Metrics

- **Performance**: <3 second response times for AI features
- **Reliability**: 99% uptime
- **Cost**: <$0.01 per user per day

---

## Risk Mitigation

### Technical Risks

- **AI API Limits**: Start with conservative usage limits per user
- **Processing Time**: Optimize prompts and implement queuing if needed
- **File Size Limits**: Restrict to reasonable file sizes initially

### Product Risks

- **Feature Complexity**: Keep MVP extremely simple, avoid feature creep
- **User Onboarding**: Clear, minimal instructions for each feature
- **Value Delivery**: Focus on delivering immediate value, not advanced features

### Business Risks

- **User Acquisition**: Leverage personal network for initial beta
- **Competition**: Differentiate through emotional focus, not just features
- **Monetization**: Freemium model with clear upgrade path

---

## Post-MVP Roadmap

Based on MVP learnings, prioritize:

1. **Chrome Extension** (highest user demand)
2. **User Accounts & History** (enables personalization)
3. **More Input Sources** (email, Teams, WhatsApp)
4. **Advanced AI Features** (context awareness, learning)

---

## Budget (MVP)

- **OpenAI API**: ~$500 (for testing + initial users)
- **Vercel Hosting**: $0 (free tier)
- **Domain**: $10-20/year
- **Design Tools**: Existing tools
- **Total**: <$600

---

## Team (MVP)

- **Solo Developer**: Full-stack development, design, testing
- **AI Prompt Engineer**: Refine prompts for quality
- **Beta Testers**: 10-20 users for feedback
- **Mentor/Advisor**: Product and technical guidance

---

## Go-Live Checklist

- [ ] All core features working end-to-end
- [ ] Error handling for common failure cases
- [ ] Mobile-responsive design
- [ ] Basic privacy policy and terms
- [ ] User feedback collection mechanism
- [ ] Analytics tracking implemented
- [ ] Performance testing completed
- [ ] Beta user list ready
- [ ] Launch announcement prepared
