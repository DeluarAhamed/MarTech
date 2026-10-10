import { cx } from "./ui";

// Illustrative, not-to-scale sequence. No durations are shown until a timeline claim is approved.
const lanes = [
  {
    key: "factory",
    label: "Factory",
    sub: "MAR Technology",
    tone: "white",
    bars: [
      { label: "Design and engineering", from: 0, to: 26 },
      { label: "Module production", from: 26, to: 58 },
      { label: "Inspection and walk-through", from: 58, to: 70 },
    ],
  },
  {
    key: "site",
    label: "Site",
    sub: "Your team",
    tone: "bronze",
    bars: [
      { label: "Permits and approvals", from: 0, to: 30 },
      { label: "Sitework and foundations", from: 30, to: 60 },
      { label: "Utilities", from: 60, to: 70 },
    ],
  },
  {
    key: "set",
    label: "Together",
    sub: "Set and finish",
    tone: "white",
    bars: [{ label: "Set, connect, finish, handover", from: 70, to: 86 }],
  },
  {
    key: "trad",
    label: "Site-built",
    sub: "For comparison",
    tone: "ghost",
    bars: [
      { label: "Permits", from: 0, to: 30 },
      { label: "Sitework", from: 30, to: 50 },
      { label: "Framing, MEP and finishes on site", from: 50, to: 100 },
    ],
  },
] as const;

const SET_DAY = 70;

/**
 * "Built in parallel" schedule. Bars grow in sequence when the chart enters the viewport
 * ([data-reveal] + .is-in, CSS only). Static and fully readable without JS or with reduced motion.
 */
export function ParallelSchedule() {
  let n = 0;
  return (
    <div data-reveal className="parallel-schedule relative">
      <div className="hidden pl-[11rem] lg:block">
        <div className="relative mb-3 h-6">
          <span className="label absolute left-0 text-white/50">Start</span>
          <span className="label absolute -translate-x-1/2 text-bronze" style={{ left: `${SET_DAY}%` }}>Set day</span>
          <span className="label absolute right-0 text-white/50">Occupancy</span>
        </div>
      </div>
      <div className="relative space-y-3">
        {lanes.map((lane) => (
          <div key={lane.key} className={cx("grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-4", lane.key === "trad" && "mt-8 border-t border-white/15 pt-8")}>
            <div>
              <p className={cx("font-display text-lg font-bold", lane.tone === "ghost" ? "text-white/55" : "text-white")}>{lane.label}</p>
              <p className="label text-white/50">{lane.sub}</p>
            </div>
            <div className="relative flex flex-col gap-1.5 lg:block lg:h-14">
              {lane.bars.map((b) => {
                const i = n++;
                return (
                  <div
                    key={b.label}
                    className={cx(
                      "ps-bar cut-tr flex min-h-12 items-center px-4 text-sm font-semibold [--cut:0.7rem] lg:absolute lg:inset-y-0 lg:min-h-0",
                      lane.tone === "white" && "bg-white text-navy",
                      lane.tone === "bronze" && "bg-bronze text-carbon",
                      lane.tone === "ghost" && "border border-white/25 text-white/60 [clip-path:none]",
                    )}
                    style={{ left: `${b.from}%`, width: `calc(${b.to - b.from}% - 4px)`, transitionDelay: `${i * 110}ms` }}
                  >
                    <span className="truncate">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 left-[11rem] hidden lg:block">
          <span className="absolute inset-y-[-0.5rem] border-l-2 border-dashed border-bronze" style={{ left: `${SET_DAY}%` }} />
        </div>
      </div>
      <p className="mt-8 max-w-2xl text-sm text-white/60">
        Illustrative sequence, not to scale. Factory production runs while the site is prepared, and modules are set once
        foundations and utilities are ready. Project schedules are provided with your proposal.
      </p>
    </div>
  );
}
