// Utility to intercept console logs for display in debug panel
let subscribers = [];
const MAX_LOGS = 100;
const logs = [];

const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

const notifySubscribers = () => {
  subscribers.forEach(cb => cb([...logs]));
};

// Safe serializer to handle circular references and DOM elements
const safeStringify = (obj) => {
  const seen = new WeakSet();
  
  try {
    return JSON.stringify(obj, (key, value) => {
      // Handle primitive types
      if (typeof value !== 'object' || value === null) {
        return value;
      }

      // Handle Circular References
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);

      // Handle DOM Elements
      if (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement) {
        return `[HTMLElement: ${value.tagName.toLowerCase()}${value.id ? `#${value.id}` : ''}${value.className ? `.${value.className}` : ''}]`;
      }

      // Handle React Fiber Nodes / Internal React properties
      if (key.startsWith('_react') || key.startsWith('__react')) {
        return undefined; // Skip React internal properties
      }

      // Handle Window/Document objects
      if (typeof window !== 'undefined' && value === window) return '[Window]';
      if (typeof document !== 'undefined' && value === document) return '[Document]';

      // Handle Events
      if (typeof Event !== 'undefined' && value instanceof Event) {
        return `[Event: ${value.type}]`;
      }

      return value;
    }, 2);
  } catch (e) {
    return `[Unserializable Object: ${e.message}]`;
  }
};

const addLog = (type, args) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      return safeStringify(arg);
    }
    return String(arg);
  }).join(' ');

  const logEntry = {
    id: Date.now() + Math.random(),
    timestamp: new Date().toLocaleTimeString(),
    type,
    message
  };

  logs.unshift(logEntry);
  if (logs.length > MAX_LOGS) logs.pop();
  notifySubscribers();
};

// Initialize interceptors
export const initConsoleCapture = () => {
  if (console.isInterceptorsAttached) return;

  console.log = (...args) => {
    originalLog.apply(console, args);
    addLog('info', args);
  };

  console.error = (...args) => {
    originalError.apply(console, args);
    addLog('error', args);
  };

  console.warn = (...args) => {
    originalWarn.apply(console, args);
    addLog('warn', args);
  };

  console.isInterceptorsAttached = true;
};

export const subscribeToLogs = (callback) => {
  subscribers.push(callback);
  callback([...logs]); // Initial data
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
};

export const clearLogs = () => {
  logs.length = 0;
  notifySubscribers();
};