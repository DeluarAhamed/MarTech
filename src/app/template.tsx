import { ViewTransition } from "react";

// Templates remount on every navigation, so enter/exit fire per route change.
// Animations are defined in globals.css (.page-enter / .page-exit) and disabled for reduced motion.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
