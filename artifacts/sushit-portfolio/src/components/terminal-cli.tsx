import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Terminal } from "lucide-react";
import { useLocation } from "wouter";

const COMMANDS: { command: string; description: string }[] = [
  { command: "about", description: "navigate to /about" },
  { command: "project", description: "navigate to /projects" },
  { command: "projects", description: "navigate to /projects" },
  { command: "experience", description: "navigate to /experience" },
  { command: "opensource", description: "navigate to /opensource" },
  { command: "contact", description: "page to be defined" },
  { command: "help", description: "show this help" },
  { command: "clear", description: "clear the terminal" },
];

const NAVIGABLE_PAGES: Record<string, string> = {
  about: "/about",
  project: "/projects",
  projects: "/projects",
  experience: "/experience",
  opensource: "/opensource",
};

const PENDING_PAGES: Record<string, string> = {
  contact: "/contact",
};

const LINES_KEY = "sushit.terminal.lines";
const HISTORY_KEY = "sushit.terminal.history";

type Line = {
  type: "command" | "output" | "error";
  text: string;
};

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key: string, value: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable; terminal still works for the session
  }
};

function TerminalCli() {
  const [, navigate] = useLocation();
  const [lines, setLines] = useState<Line[]>(() =>
    readStorage(LINES_KEY, [
      {
        type: "output",
        text: "Welcome. Type 'help' for available commands.",
      },
    ]),
  );
  const [history, setHistory] = useState<string[]>(() =>
    readStorage(HISTORY_KEY, []),
  );
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    writeStorage(LINES_KEY, lines);
  }, [lines]);

  useEffect(() => {
    writeStorage(HISTORY_KEY, history);
  }, [history]);

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      return;
    }
    const newLines: Line[] = [{ type: "command", text: trimmed }];
    const command = trimmed.toLowerCase();
    const route = NAVIGABLE_PAGES[command];

    if (route) {
      newLines.push({ type: "output", text: `navigating to ${route} …` });
      setLines((prev) => [...prev, ...newLines]);
      navigate(route);
      return;
    }

    const pendingPage = PENDING_PAGES[command];

    if (pendingPage) {
      newLines.push({
        type: "output",
        text: `page ${pendingPage} — to be defined`,
      });
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    switch (command) {
      case "help":
        newLines.push({ type: "output", text: "Available commands:" });
        for (const { command: name, description } of COMMANDS) {
          newLines.push({
            type: "output",
            text: `  ${name.padEnd(12)} ${description}`,
          });
        }
        break;
      case "clear":
        setLines([]);
        break;
      default:
        newLines.push({
          type: "error",
          text: `command not found: ${trimmed}. Type 'help' for available commands.`,
        });
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }
    execute(trimmed);
    setHistory((prev) =>
      prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed],
    );
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) {
        return;
      }
      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) {
        return;
      }
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <div
      data-testid="terminal-cli"
      onClick={() => inputRef.current?.focus()}
      className="terminal-panel mx-auto max-w-4xl"
    >
      <div className="flex items-center justify-between border-b border-[#8AFF57]/15 px-5 py-3.5 text-[10px] uppercase tracking-[0.18em] text-[#8AFF57]/40 sm:px-6">
        <span className="flex items-center gap-2">
          <Terminal size={13} /> zsh — sushit@local
        </span>
        <span>type &apos;help&apos; to begin</span>
      </div>
      <div
        ref={scrollRef}
        data-testid="terminal-output"
        className="max-h-[320px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-6 sm:px-6"
      >
        {lines.map((line, index) => (
          <p
            key={`${index}-${line.text.slice(0, 12)}`}
            className={
              line.type === "command"
                ? "text-[#CAFF3C]"
                : line.type === "error"
                  ? "text-[#CAFF3C]"
                  : "whitespace-pre-wrap break-words text-[#8AFF57]/70"
            }
          >
            {line.type === "command" && (
              <span className="mr-2 select-none text-[#8AFF57]/50">$</span>
            )}
            {line.text}
          </p>
        ))}
        <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
          <span className="select-none text-[#CAFF3C]">$</span>
          <input
            ref={inputRef}
            data-testid="terminal-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal command input"
            className="flex-1 bg-transparent text-[#CAFF3C] caret-[#CAFF3C] outline-none placeholder:text-[#8AFF57]/25"
            placeholder="type a command…"
          />
        </form>
      </div>
    </div>
  );
}

export default TerminalCli;
