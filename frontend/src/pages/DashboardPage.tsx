import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { createAuthenticatedClient } from '../lib/apiClient';
import { AIInsightCard } from '../components/design-system/AIInsightCard';
import { CompassCard } from '../components/design-system/CompassCard';
import { GlassPanel } from '../components/design-system/GlassPanel';
import { JourneyCard } from '../components/design-system/JourneyCard';
import { MoodSelector } from '../components/design-system/MoodSelector';
import { ProgressRing } from '../components/design-system/ProgressRing';
import { SectionContainer } from '../components/design-system/SectionContainer';
import { WarmButton } from '../components/design-system/WarmButton';

interface Vision {
  id: number;
  title: string;
  statement?: string;
}

interface Journey {
  id: number;
  title: string;
  description?: string | null;
  status: string;
}

interface Goal {
  id: number;
  title: string;
  description?: string | null;
  status: string;
}

interface Task {
  id: number;
  title: string;
  details?: string | null;
  status: string;
  is_complete: boolean;
  priority: string;
}

export function DashboardPage() {
  const { user, token } = useAuth();
  const [vision, setVision] = useState<Vision | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const client = useMemo(() => createAuthenticatedClient(token), [token]);

  const fetchData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const [journeysRes, goalsRes, tasksRes, visionRes] = await Promise.all([
        client.get<Journey[]>('/journeys'),
        client.get<Goal[]>('/goals'),
        client.get<Task[]>('/tasks'),
        client.get<Vision | null>('/visions').catch(() => ({ data: null })),
      ]);

      setJourneys(journeysRes.data);
      setGoals(goalsRes.data);
      setTasks(tasksRes.data);
      setVision(visionRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [client]);

  const completedTasks = tasks.filter((t) => t.is_complete).length;
  const activeTasks = tasks.filter((t) => !t.is_complete).length;
  const progressPercent = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const insights = useMemo(() => {
    const next: string[] = [];

    if (goals.length > 0) {
      const longestGoal = [...goals].sort((a, b) => (a.title.length > b.title.length ? 1 : -1))[0];
      next.push(`You are shaping ${goals.length} meaningful goals, including “${longestGoal?.title ?? 'your current focus'}”.`);
    }

    if (tasks.length > 0) {
      const pending = tasks.filter((task) => !task.is_complete);
      const urgent = pending.filter((task) => task.priority === 'high' || task.priority === 'urgent');
      if (urgent.length > 0) {
        next.push(`You have ${urgent.length} priority task${urgent.length > 1 ? 's' : ''} asking for attention today.`);
      } else {
        next.push('Your task list feels steady. You can keep the pace gentle and still make progress.');
      }
    }

    if (journeys.length > 0) {
      next.push(`You are currently tending to ${journeys.length} journey${journeys.length > 1 ? 'ies' : 'y'} in a thoughtful way.`);
    }

    if (next.length === 0) {
      next.push('Your space is still empty. Start with one small intention and let the rest unfold.');
    }

    return next.slice(0, 3);
  }, [goals, journeys, tasks]);

  const toggleTaskComplete = async (task: Task) => {
    try {
      const response = await client.put<Task>(`/tasks/${task.id}`, {
        is_complete: !task.is_complete,
        status: task.is_complete ? 'todo' : 'done',
      });
      setTasks((current) => current.map((item) => (item.id === task.id ? response.data : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="relative py-12 flex items-center justify-center min-h-screen">
        <div className="relative z-10 flex min-h-[50vh] items-center justify-center">
          <div className="rounded-[1.5rem] border border-white/15 bg-white/10 px-6 py-4 text-[#fff9ed] backdrop-blur-xl">
            Loading your sanctuary...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl space-y-10">
        <section>
          <div className="flex flex-col gap-8 rounded-[2rem] bg-gradient-to-br from-white/15 to-white/5 p-6 backdrop-blur-xl sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">
                Personal sanctuary
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#fff9ed] sm:text-5xl">
                  Welcome back, {user?.full_name || user?.username || 'traveler'}.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[#f6e6c8]">
                  Your dashboard is designed to feel like a calm room for work, reflection, and gentle momentum.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <WarmButton>Continue where you left off</WarmButton>
                <WarmButton variant="secondary">Open your ritual</WarmButton>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
              <GlassPanel className="text-center">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#ffe7b5]">Journeys</p>
                <p className="mt-2 text-2xl font-semibold text-[#fff9ed]">{journeys.length}</p>
              </GlassPanel>
              <GlassPanel className="text-center">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#ffe7b5]">Goals</p>
                <p className="mt-2 text-2xl font-semibold text-[#fff9ed]">{goals.length}</p>
              </GlassPanel>
              <GlassPanel className="text-center">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#ffe7b5]">Tasks</p>
                <p className="mt-2 text-2xl font-semibold text-[#fff9ed]">{activeTasks}</p>
              </GlassPanel>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-[1.5rem] border border-rose-200/40 bg-rose-400/15 p-4 text-sm text-rose-100 backdrop-blur-xl max-w-3xl mx-auto">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <SectionContainer eyebrow="Daily compass" title="Today’s priorities" className="lg:col-span-2">
            <div className="space-y-4">
              <CompassCard title="Current focus" subtitle="One meaningful intention">
                <p>
                  {goals[0]
                    ? `Return to “${goals[0].title}” and take one gentle step toward it.`
                    : 'Choose one gentle intention and let that guide the rest of your day.'}
                </p>
              </CompassCard>

              <CompassCard title="Interactive checklist" subtitle="Progress in motion">
                {activeTasks === 0 ? (
                  <p>No active tasks right now. Add one and keep the day moving with ease.</p>
                ) : (
                  <div className="space-y-2">
                    {tasks.filter((task) => !task.is_complete).slice(0, 4).map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTaskComplete(task)}
                        className="flex w-full items-center justify-between rounded-[1rem] border border-white/10 bg-white/10 px-3 py-3 text-left text-sm text-[#fff9ed] transition hover:bg-white/15"
                      >
                        <span>{task.title}</span>
                        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[#ffe7b5]">{task.priority}</span>
                      </button>
                    ))}
                  </div>
                )}
              </CompassCard>

              <GlassPanel>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#ffe7b5]">How are you feeling?</p>
                <div className="mt-3">
                  <MoodSelector />
                </div>
              </GlassPanel>
            </div>
          </SectionContainer>

          <div className="space-y-4">
            <div className="space-y-4">
              <AIInsightCard title="A quiet voice for your day" label="Dynamic insight">
                <ul className="space-y-2">
                  {insights.map((item) => (
                    <li key={item} className="rounded-[1rem] border border-white/10 bg-white/10 px-3 py-2 text-sm leading-7 text-[#f6e6c8]">
                      {item}
                    </li>
                  ))}
                </ul>
              </AIInsightCard>
              <ProgressRing value={progressPercent} label="Growth" sublabel={completedTasks > 0 ? `${completedTasks} completed and counting.` : 'A gentle beginning is still progress.'} />
              {vision ? (
                <JourneyCard title={vision.title} meta="Vision">
                  {vision.statement ? <p>{vision.statement}</p> : <p>Your guiding direction remains visible here.</p>}
                </JourneyCard>
              ) : (
                <JourneyCard title="Your direction is still taking shape" meta="Vision">
                  <p>Add a vision to give the rest of your workspace a deeper sense of purpose.</p>
                </JourneyCard>
              )}
            </div>
          </div>
        </div>

        {/* The CRUD forms and lists have been removed from this view to reduce clutter. */}
        {/* They will be reintroduced in dedicated pages or modals. */}
      </div>
    </div>
  );
}
