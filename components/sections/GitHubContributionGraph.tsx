import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import {
  fetchGitHubContributions,
  GITHUB_USERNAME,
  type GitHubContributionDay,
} from "@/lib/github";

const GITHUB_GREEN_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const WEEKS_IN_YEAR = 53;
const BLOCK_MARGIN = 4;
const WEEKDAY_LABEL_OFFSET = 36;

function getBlockSize(containerWidth: number): number {
  const availableWidth = Math.max(containerWidth - WEEKDAY_LABEL_OFFSET, 320);
  const calculated = Math.floor(availableWidth / WEEKS_IN_YEAR - BLOCK_MARGIN);
  return Math.min(Math.max(calculated, 10), 14);
}

type GitHubContributionGraphProps = {
  username?: string;
  onLoad?: () => void;
  onError?: () => void;
};

export function GitHubContributionGraph({
  username = GITHUB_USERNAME,
  onLoad,
  onError,
}: GitHubContributionGraphProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [contributions, setContributions] = useState<GitHubContributionDay[]>([]);
  const [error, setError] = useState(false);
  const [blockSize, setBlockSize] = useState(12);

  const loadContributions = useCallback(async () => {
    setError(false);
    setContributions([]);

    try {
      const data = await fetchGitHubContributions(username);
      setContributions(data.contributions);
      onLoad?.();
    } catch {
      setError(true);
      onError?.();
    }
  }, [onError, onLoad, username]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    void loadContributions();
  }, [mounted, retryKey, loadContributions]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || contributions.length === 0) return;

    const updateBlockSize = () => {
      setBlockSize(getBlockSize(container.clientWidth));
    };

    updateBlockSize();

    const observer = new ResizeObserver(updateBlockSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [contributions.length, mounted]);

  if (!mounted) {
    return <div className="github-graph-skeleton" aria-hidden="true" />;
  }

  if (error) {
    return (
      <div className="github-graph-error">
        <p>Unable to load GitHub activity.</p>
        <button
          type="button"
          className="github-retry-btn"
          onClick={() => setRetryKey((value) => value + 1)}
        >
          Retry
        </button>
      </div>
    );
  }

  if (contributions.length === 0) {
    return <div className="github-graph-skeleton" aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className="github-contributions-wrap">
      <ActivityCalendar
        key={`${retryKey}-${blockSize}-${contributions.length}`}
        data={contributions}
        colorScheme={resolvedTheme === "light" ? "light" : "dark"}
        theme={GITHUB_GREEN_THEME}
        blockSize={blockSize}
        blockMargin={BLOCK_MARGIN}
        blockRadius={2}
        fontSize={13}
        showWeekdayLabels
        maxLevel={4}
        className="github-contributions-calendar"
        labels={{
          totalCount: "{{count}} contributions in the last year",
        }}
        renderBlock={(block) =>
          cloneElement(block, {
            className: "github-contrib-block",
          })
        }
      />
    </div>
  );
}
