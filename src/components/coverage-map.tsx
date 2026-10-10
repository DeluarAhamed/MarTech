import { distanceMiles, FACTORY, westernCodes, westernStates } from "@/content/locations";
import { mapPoints, stateShapes, US_VIEWBOX } from "@/content/us-map";
import { MapInteractions } from "./map-interactions";
import { cx } from "./ui";

/**
 * Service-area map. Paths are rendered on the server; MapInteractions adds hover/focus tooltips
 * client-side by reading data attributes, so the geometry is never shipped twice.
 *  - Western states: served from the Salt Lake City factory (freight-optimised), link to state pages.
 *  - All other states: welcome nationwide, assessed per project (FLEX™ for larger developments).
 */
export function CoverageMap({ className, compact = false, highlight }: { className?: string; compact?: boolean; highlight?: string }) {
  const [fx, fy] = mapPoints.factory;
  const [hx, hy] = mapPoints.hq;
  const bySlug = Object.fromEntries(westernStates.map((s) => [s.code, s]));

  const routes = westernStates
    .filter((s) => s.code !== "UT")
    .map((s, i) => {
      const [tx, ty] = mapPoints[s.code];
      // Curve each route gently to one side of the straight line.
      const mx = (fx + tx) / 2;
      const my = (fy + ty) / 2;
      const dx = tx - fx;
      const dy = ty - fy;
      const bend = 0.22;
      const cx2 = mx - dy * bend;
      const cy2 = my + dx * bend;
      return { code: s.code, d: `M${fx},${fy} Q${cx2.toFixed(1)},${cy2.toFixed(1)} ${tx},${ty}`, tx, ty, i };
    });

  return (
    <MapInteractions className={cx("relative", className)}>
      <svg viewBox={US_VIEWBOX} className="h-auto w-full" role="group" aria-label="Map of the United States showing MAR Technology's service area">
        <g data-states>
          {stateShapes.map((s) => {
            const west = westernCodes.has(s.code);
            const st = bySlug[s.code];
            const common = {
              "data-state": s.code,
              "data-name": s.name,
              "data-tier": west ? "west" : "national",
              "data-dist": st ? String(distanceMiles(FACTORY, st.anchor)) : "",
              "data-anchor": st ? st.anchor.city : "",
              "data-cx": s.cx,
              "data-cy": s.cy,
            };
            const shape = (
              <path
                d={s.d}
                className={cx(
                  "map-state stroke-white [stroke-width:0.9] transition-[fill,filter] duration-300",
                  highlight === s.code && "is-highlight",
                  west ? "fill-navy" : "fill-[#cdd2df]",
                )}
              />
            );
            return west && st ? (
              <a key={s.code} href={`/locations/${st.slug}/`} aria-label={`${s.name}: served from our Salt Lake City factory`} {...common} className="map-link outline-none">
                {shape}
              </a>
            ) : (
              <g key={s.code} {...common} tabIndex={compact ? undefined : 0} aria-label={`${s.name}: nationwide, assessed per project`} className="map-link outline-none">
                <title>{`${s.name}: nationwide, assessed per project`}</title>
                {shape}
              </g>
            );
          })}
        </g>

        {/* Freight routes from the factory */}
        <g aria-hidden="true" className="pointer-events-none">
          {routes.map((r) => (
            <g key={r.code}>
              <path d={r.d} className="map-route fill-none stroke-white/90 [stroke-width:1.6]" style={{ animationDelay: `${r.i * 90}ms` }} pathLength={1} />
              <circle cx={r.tx} cy={r.ty} r="3.2" className="map-dest fill-white stroke-navy [stroke-width:1.5]" style={{ animationDelay: `${600 + r.i * 90}ms` }} />
            </g>
          ))}
        </g>

        {/* HQ */}
        <g aria-hidden="true" className="pointer-events-none">
          <circle cx={hx} cy={hy} r="5" className="fill-brand-grey stroke-white [stroke-width:2]" />
          {!compact ? (
            <text x={hx + 9} y={hy + 4} className="fill-carbon text-[11px] font-semibold">Knightdale, NC · HQ</text>
          ) : null}
        </g>

        {/* Factory hub */}
        <g aria-hidden="true" className="pointer-events-none">
          <circle cx={fx} cy={fy} r="9" className="map-pulse fill-white/40" />
          <circle cx={fx} cy={fy} r="9" className="map-pulse fill-white/30 [animation-delay:1.2s]" />
          <circle cx={fx} cy={fy} r="8" className="fill-white stroke-navy [stroke-width:3]" />
          <circle cx={fx} cy={fy} r="3" className="fill-navy" />
        </g>
      </svg>

      {!compact ? (
        <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: `${(fx / 975) * 100}%`, top: `${(fy / 610) * 100}%` }}>
          <span className="absolute top-3 left-4 rounded-sm bg-white px-2 py-1 text-[0.7rem] font-bold tracking-[0.08em] whitespace-nowrap text-navy uppercase shadow-sm">
            Salt Lake City factory
          </span>
        </div>
      ) : null}
    </MapInteractions>
  );
}

export function MapLegend({ className }: { className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-x-6 gap-y-3 text-sm", className)}>
      <li className="flex items-center gap-2.5">
        <span className="size-3.5 rounded-[2px] bg-navy" /> Western states, served from our Utah factory
      </li>
      <li className="flex items-center gap-2.5">
        <span className="size-3.5 rounded-[2px] bg-[#cdd2df]" /> Nationwide, assessed per project
      </li>
      <li className="flex items-center gap-2.5">
        <span className="grid size-3.5 place-items-center rounded-full border-2 border-navy bg-white"><span className="size-1 rounded-full bg-navy" /></span>
        Salt Lake City factory
      </li>
    </ul>
  );
}
