import { Link } from 'react-router-dom';

import { AIInsightCard } from '../components/design-system/AIInsightCard';
import { CompassCard } from '../components/design-system/CompassCard';
import { JourneyCard } from '../components/design-system/JourneyCard';
import { MoodSelector } from '../components/design-system/MoodSelector';
import { ProgressRing } from '../components/design-system/ProgressRing';
import { SectionContainer } from '../components/design-system/SectionContainer';
import { SunriseHero } from '../components/design-system/SunriseHero';
import { WarmButton } from '../components/design-system/WarmButton';

export function HomePage() {
  const todayLabel = new Date().toLocaleDateString('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 space-y-6">
        <SunriseHero
          eyebrow="Good morning"
          title="Begin the day with gentle momentum"
          description="Mira meets you in the quiet hour with clarity, warmth, and a small compass for what matters today."
          illustration={
            <div className="space-y-3">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">Today</div>
              <div className="text-2xl font-semibold text-[#fff9ed]">{todayLabel}</div>
              <p className="max-w-xs text-sm leading-7 text-[#f6e6c8]">
                Choose one meaningful step and let the rest of the day unfold with intention.
              </p>
            </div>
          }
          actions={
            <>
              <Link to="/register">
                <WarmButton>Start Your Day</WarmButton>
              </Link>
              <Link to="/login">
                <WarmButton variant="secondary">Sign In</WarmButton>
              </Link>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionContainer eyebrow="Today’s compass" title="Your current journey">
            <div className="grid gap-4 md:grid-cols-2">
              <CompassCard title="Today’s Focus" subtitle="Morning guide">
                <p>Protect one hour for your highest-value work and leave the rest to breathe.</p>
              </CompassCard>
              <CompassCard title="Energy Check" subtitle="Gentle pacing">
                <p>Notice what feels alive right now, then let that guide your next step.</p>
              </CompassCard>
              <CompassCard title="One Small Win" subtitle="Momentum" className="md:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p>Write the first sentence, send the first message, or close the first loop.</p>
                  <WarmButton variant="ghost">Open the ritual</WarmButton>
                </div>
              </CompassCard>
            </div>
          </SectionContainer>

          <SectionContainer eyebrow="Daily momentum" title="A calm companion">
            <div className="space-y-4">
              <AIInsightCard title="You’ve been building steady momentum for six days." label="AI encouragement">
                <p>That consistency matters. Today, keep the bar kind and the pace light.</p>
              </AIInsightCard>
              <JourneyCard title="Your best next action" meta="One thing that matters today">
                <p>Choose a single outcome that feels meaningful, then let the rest of your day support it.</p>
              </JourneyCard>
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">How are you feeling?</p>
                <div className="mt-3">
                  <MoodSelector />
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionContainer eyebrow="Daily priorities" title="The shape of your day">
            <div className="space-y-4">
              <ProgressRing value={72} label="Today’s progress" sublabel="A steady rhythm is already forming." />
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">Upcoming commitments</p>
                    <p className="mt-2 text-sm leading-7 text-[#f6e6c8]">A gentle reminder for later: protect your energy before your schedule fills up.</p>
                  </div>
                  <WarmButton variant="secondary">Preview</WarmButton>
                </div>
              </div>
            </div>
          </SectionContainer>

          <SectionContainer eyebrow="Reflection" title="A little warmth for the day ahead">
            <div className="space-y-4">
              <JourneyCard title="Let the day begin softly" meta="Reflection">
                <p>Every meaningful day starts with one quiet decision. What do you want to carry with you today?</p>
              </JourneyCard>
              <AIInsightCard title="You do not need to do everything." label="Gentle guidance">
                <p>When the day feels full, return to what matters most. A small step is still a step forward.</p>
              </AIInsightCard>
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  );
}
