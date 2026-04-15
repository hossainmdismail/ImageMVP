"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExperienceContent } from "@/types";

interface AdminDashboardProps {
  initialAuthenticated: boolean;
}

const emptyContent: ExperienceContent = {
  hero: {
    eyebrow: "",
    title: "",
    description: "",
    highlights: [],
    viralityTitle: "",
    viralityDescription: ""
  },
  settings: {
    companionMode: "friend",
    defaultAgeRange: "18-24",
    defaultVibe: "Playful",
    defaultFavoriteColor: "#FF6B35",
    helmetRequired: true,
    poseDirection: "",
    cameraFrame: "",
    poseVariants: [],
    wardrobeDirection: "",
    realismDirection: ""
  },
  bikes: [],
  environments: [],
  colors: [],
  behaviorQuestion: {
    title: "",
    description: "",
    options: []
  }
};

export function AdminDashboard({ initialAuthenticated }: AdminDashboardProps) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [content, setContent] = useState<ExperienceContent>(emptyContent);
  const [loading, setLoading] = useState(initialAuthenticated);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    void loadContent();
  }, [authenticated]);

  async function loadContent() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/admin/content");

      if (!response.ok) {
        if (response.status === 401) {
          setAuthenticated(false);
          return;
        }

        throw new Error("Failed to load dashboard content.");
      }

      const data = (await response.json()) as ExperienceContent;
      setContent(data);
    } catch (issue) {
      console.error(issue);
      setError("Could not load admin content.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    try {
      setError("");
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      setAuthenticated(true);
      setPassword("");
      setSuccess("Logged in successfully.");
    } catch (issue) {
      console.error(issue);
      setError("Login failed. Check admin username and password.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setContent(emptyContent);
    setSuccess("");
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Save failed.");
      }

      setSuccess("Dashboard content saved.");
    } catch (issue) {
      console.error(issue);
      setError(issue instanceof Error ? issue.message : "Could not save content.");
    } finally {
      setSaving(false);
    }
  }

  function updateHero<K extends keyof ExperienceContent["hero"]>(
    key: K,
    value: ExperienceContent["hero"][K]
  ) {
    setContent((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [key]: value
      }
    }));
  }

  function updateSettings<K extends keyof ExperienceContent["settings"]>(
    key: K,
    value: ExperienceContent["settings"][K]
  ) {
    setContent((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [key]: value
      }
    }));
  }

  function updateListItem<T>(list: T[], index: number, value: T) {
    return list.map((item, itemIndex) => (itemIndex === index ? value : item));
  }

  if (!authenticated) {
    return (
      <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/80 bg-white/80 p-8 shadow-glow backdrop-blur">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
            Admin
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Company dashboard login</h1>
          <p className="text-sm leading-7 text-slate-600">
            Sign in to edit bikes, colors, environments, question content, and the solo vs friend image mode.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Username</label>
            <Input value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <Button className="w-full" onClick={handleLogin}>
            Log in
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-[32px] border border-white/80 bg-white/80 p-8 shadow-glow backdrop-blur">
        <div className="h-8 w-56 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-96 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="h-48 animate-pulse rounded-[28px] bg-slate-100" />
          <div className="h-48 animate-pulse rounded-[28px] bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-white/80 bg-slate-950 p-6 text-white shadow-glow">
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
            Admin Dashboard
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Manage experience content</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            Update the company-facing content here. Changes affect the public quiz and the AI prompt behavior.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={handleLogout}>
            Log out
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

      <Section title="Hero copy">
        <Field label="Eyebrow">
          <Input value={content.hero.eyebrow} onChange={(event) => updateHero("eyebrow", event.target.value)} />
        </Field>
        <Field label="Title">
          <textarea
            className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
            value={content.hero.title}
            onChange={(event) => updateHero("title", event.target.value)}
          />
        </Field>
        <Field label="Description">
          <textarea
            className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
            value={content.hero.description}
            onChange={(event) => updateHero("description", event.target.value)}
          />
        </Field>
        <Field label="Highlights">
          <ArrayEditor
            items={content.hero.highlights}
            onChange={(items) => updateHero("highlights", items)}
            addLabel="Add highlight"
          />
        </Field>
        <Field label="Virality title">
          <Input
            value={content.hero.viralityTitle}
            onChange={(event) => updateHero("viralityTitle", event.target.value)}
          />
        </Field>
        <Field label="Virality description">
          <textarea
            className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
            value={content.hero.viralityDescription}
            onChange={(event) => updateHero("viralityDescription", event.target.value)}
          />
        </Field>
      </Section>

      <Section title="Prompt settings">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Companion mode">
            <select
              className="w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm shadow-sm outline-none"
              value={content.settings.companionMode}
              onChange={(event) => updateSettings("companionMode", event.target.value as "friend" | "solo")}
            >
              <option value="friend">Friend</option>
              <option value="solo">Solo</option>
            </select>
          </Field>
          <Field label="Default age range">
            <Input
              value={content.settings.defaultAgeRange}
              onChange={(event) => updateSettings("defaultAgeRange", event.target.value)}
            />
          </Field>
          <Field label="Default vibe">
            <Input
              value={content.settings.defaultVibe}
              onChange={(event) => updateSettings("defaultVibe", event.target.value)}
            />
          </Field>
          <Field label="Default favorite color">
            <Input
              value={content.settings.defaultFavoriteColor}
              onChange={(event) => updateSettings("defaultFavoriteColor", event.target.value)}
            />
          </Field>
          <Field label="Helmet required">
            <select
              className="w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm shadow-sm outline-none"
              value={content.settings.helmetRequired ? "true" : "false"}
              onChange={(event) => updateSettings("helmetRequired", event.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Field>
          <Field label="Pose direction">
            <textarea
              className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
              value={content.settings.poseDirection}
              onChange={(event) => updateSettings("poseDirection", event.target.value)}
            />
          </Field>
          <Field label="Camera frame">
            <textarea
              className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
              value={content.settings.cameraFrame}
              onChange={(event) => updateSettings("cameraFrame", event.target.value)}
            />
          </Field>
          <Field label="Pose variants">
            <ArrayEditor
              items={content.settings.poseVariants}
              onChange={(items) => updateSettings("poseVariants", items)}
              addLabel="Add pose variant"
            />
          </Field>
          <Field label="Wardrobe direction">
            <textarea
              className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
              value={content.settings.wardrobeDirection}
              onChange={(event) => updateSettings("wardrobeDirection", event.target.value)}
            />
          </Field>
          <Field label="Realism direction">
            <textarea
              className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
              value={content.settings.realismDirection}
              onChange={(event) => updateSettings("realismDirection", event.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Bike cards">
        <div className="space-y-4">
          {content.bikes.map((bike, index) => (
            <div key={bike.id || index} className="rounded-[28px] border border-slate-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Bike ID">
                  <Input
                    value={bike.id}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        bikes: updateListItem(current.bikes, index, { ...bike, id: event.target.value })
                      }))
                    }
                  />
                </Field>
                <Field label="Bike name">
                  <Input
                    value={bike.name}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        bikes: updateListItem(current.bikes, index, { ...bike, name: event.target.value })
                      }))
                    }
                  />
                </Field>
                <Field label="Image path">
                  <Input
                    value={bike.image}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        bikes: updateListItem(current.bikes, index, { ...bike, image: event.target.value })
                      }))
                    }
                  />
                </Field>
                <Field label="Description">
                  <Input
                    value={bike.description}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        bikes: updateListItem(current.bikes, index, { ...bike, description: event.target.value })
                      }))
                    }
                  />
                </Field>
              </div>
              <Button
                className="mt-4"
                variant="ghost"
                onClick={() =>
                  setContent((current) => ({
                    ...current,
                    bikes: current.bikes.filter((_, bikeIndex) => bikeIndex !== index)
                  }))
                }
              >
                Remove bike
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() =>
              setContent((current) => ({
                ...current,
                bikes: [
                  ...current.bikes,
                  {
                    id: `bike-${current.bikes.length + 1}`,
                    name: "New Bike",
                    description: "Describe the bike.",
                    image: "/bikes/neo-cafe.svg"
                  }
                ]
              }))
            }
          >
            Add bike
          </Button>
        </div>
      </Section>

      <Section title="Environments">
        <div className="space-y-4">
          {content.environments.map((environment, index) => (
            <div key={environment.id || index} className="rounded-[28px] border border-slate-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Environment ID">
                  <Input
                    value={environment.id}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        environments: updateListItem(current.environments, index, {
                          ...environment,
                          id: event.target.value as typeof environment.id
                        })
                      }))
                    }
                  />
                </Field>
                <Field label="Label">
                  <Input
                    value={environment.label}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        environments: updateListItem(current.environments, index, {
                          ...environment,
                          label: event.target.value
                        })
                      }))
                    }
                  />
                </Field>
                <Field label="Description">
                  <Input
                    value={environment.description}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        environments: updateListItem(current.environments, index, {
                          ...environment,
                          description: event.target.value
                        })
                      }))
                    }
                  />
                </Field>
                <Field label="Scene direction">
                  <Input
                    value={environment.sceneDirection}
                    onChange={(event) =>
                      setContent((current) => ({
                        ...current,
                        environments: updateListItem(current.environments, index, {
                          ...environment,
                          sceneDirection: event.target.value
                        })
                      }))
                    }
                  />
                </Field>
              </div>
              <Button
                className="mt-4"
                variant="ghost"
                onClick={() =>
                  setContent((current) => ({
                    ...current,
                    environments: current.environments.filter((_, itemIndex) => itemIndex !== index)
                  }))
                }
              >
                Remove environment
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() =>
              setContent((current) => ({
                ...current,
                environments: [
                  ...current.environments,
                  {
                    id: "city",
                    label: "New Environment",
                    description: "Describe the place.",
                    sceneDirection: "Describe the cinematic scene direction."
                  }
                ]
              }))
            }
          >
            Add environment
          </Button>
        </div>
      </Section>

      <Section title="Color presets">
        <ArrayEditor
          items={content.colors}
          onChange={(items) =>
            setContent((current) => ({
              ...current,
              colors: items
            }))
          }
          addLabel="Add color"
        />
      </Section>

      <Section title="Behavior question">
        <div className="grid gap-4">
          <Field label="Question title">
            <Input
              value={content.behaviorQuestion.title}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  behaviorQuestion: {
                    ...current.behaviorQuestion,
                    title: event.target.value
                  }
                }))
              }
            />
          </Field>
          <Field label="Question description">
            <textarea
              className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
              value={content.behaviorQuestion.description}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  behaviorQuestion: {
                    ...current.behaviorQuestion,
                    description: event.target.value
                  }
                }))
              }
            />
          </Field>
          <div className="space-y-4">
            {content.behaviorQuestion.options.map((option, index) => (
              <div key={option.id || index} className="rounded-[28px] border border-slate-200 bg-white p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Option ID">
                    <Input
                      value={option.id}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              id: event.target.value as typeof option.id
                            })
                          }
                        }))
                      }
                    />
                  </Field>
                  <Field label="Label">
                    <Input
                      value={option.label}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              label: event.target.value
                            })
                          }
                        }))
                      }
                    />
                  </Field>
                  <Field label="Description">
                    <Input
                      value={option.description}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              description: event.target.value
                            })
                          }
                        }))
                      }
                    />
                  </Field>
                  <Field label="Emotional tone">
                    <Input
                      value={option.emotionalTone}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              emotionalTone: event.target.value
                            })
                          }
                        }))
                      }
                    />
                  </Field>
                  <Field label="Traits">
                    <ArrayEditor
                      items={option.traits}
                      onChange={(items) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              traits: items
                            })
                          }
                        }))
                      }
                      addLabel="Add trait"
                    />
                  </Field>
                  <Field label="Friend mode social dynamic">
                    <textarea
                      className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
                      value={option.socialDynamicFriend}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              socialDynamicFriend: event.target.value
                            })
                          }
                        }))
                      }
                    />
                  </Field>
                  <Field label="Solo mode social dynamic">
                    <textarea
                      className="min-h-28 w-full rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
                      value={option.socialDynamicSolo}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          behaviorQuestion: {
                            ...current.behaviorQuestion,
                            options: updateListItem(current.behaviorQuestion.options, index, {
                              ...option,
                              socialDynamicSolo: event.target.value
                            })
                          }
                        }))
                      }
                    />
                  </Field>
                </div>
                <Button
                  className="mt-4"
                  variant="ghost"
                  onClick={() =>
                    setContent((current) => ({
                      ...current,
                      behaviorQuestion: {
                        ...current.behaviorQuestion,
                        options: current.behaviorQuestion.options.filter((_, itemIndex) => itemIndex !== index)
                      }
                    }))
                  }
                >
                  Remove option
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                setContent((current) => ({
                  ...current,
                  behaviorQuestion: {
                    ...current.behaviorQuestion,
                    options: [
                      ...current.behaviorQuestion.options,
                      {
                        id: "new-option",
                        label: "New option",
                        description: "Describe this behavior.",
                        traits: ["confident"],
                        emotionalTone: "bold",
                        socialDynamicFriend: "two close friends enjoying the ride",
                        socialDynamicSolo: "a rider with a striking solo presence"
                      }
                    ]
                  }
                }))
              }
            >
              Add behavior option
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-glow backdrop-blur sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function ArrayEditor({
  items,
  onChange,
  addLabel
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex gap-3">
          <Input
            value={item}
            onChange={(event) =>
              onChange(items.map((currentItem, itemIndex) => (itemIndex === index ? event.target.value : currentItem)))
            }
          />
          <Button variant="ghost" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
            Remove
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={() => onChange([...items, ""])}>
        {addLabel}
      </Button>
    </div>
  );
}
