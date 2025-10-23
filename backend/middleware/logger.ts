interface LogEntry {
  timestamp: string;
  method: string;
  path: string;
  status?: number;
  error?: string;
}

export function logRequest(method: string, path: string): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    method,
    path,
  };
  console.log("[REQUEST]", JSON.stringify(entry));
}

export function logError(method: string, path: string, error: Error): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    method,
    path,
    error: error.message,
  };
  console.error("[ERROR]", JSON.stringify(entry));
}

export function logSuccess(method: string, path: string, status: number = 200): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    method,
    path,
    status,
  };
  console.log("[SUCCESS]", JSON.stringify(entry));
}
