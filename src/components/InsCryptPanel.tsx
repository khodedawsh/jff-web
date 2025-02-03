import { useState } from 'react';
import { Loader2, Lock, Shield, AlertCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const monokai = {
  'code[class*="language-"]': {
    color: '#f8f8f2',
    background: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#f8f8f2',
    background: '#2d2a2e',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '0',
    overflow: 'auto',
    borderRadius: '0.3em',
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#2d2a2e',
    padding: '0.1em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: '#727072',
  },
  prolog: {
    color: '#727072',
  },
  doctype: {
    color: '#727072',
  },
  cdata: {
    color: '#727072',
  },
  punctuation: {
    color: '#939293',
  },
  property: {
    color: '#ff6188',
  },
  tag: {
    color: '#ff6188',
  },
  constant: {
    color: '#ff6188',
  },
  symbol: {
    color: '#ff6188',
  },
  deleted: {
    color: '#ff6188',
  },
  boolean: {
    color: '#ab9df2',
  },
  number: {
    color: '#ab9df2',
  },
  selector: {
    color: '#a9dc76',
  },
  'attr-name': {
    color: '#a9dc76',
  },
  string: {
    color: '#a9dc76',
  },
  char: {
    color: '#a9dc76',
  },
  builtin: {
    color: '#a9dc76',
  },
  inserted: {
    color: '#a9dc76',
  },
  operator: {
    color: '#78dce8',
  },
  entity: {
    color: '#78dce8',
    cursor: 'help',
  },
  url: {
    color: '#78dce8',
  },
  variable: {
    color: '#78dce8',
  },
  atrule: {
    color: '#ffd866',
  },
  'attr-value': {
    color: '#ffd866',
  },
  function: {
    color: '#ffd866',
  },
  keyword: {
    color: '#ff6188',
  },
  regex: {
    color: '#ffd866',
  },
  important: {
    color: '#ffd866',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};

declare global {
  interface Window {
    requestConfigs: (url: string, token: string, code?: string) => Promise<any>;
    generateToken: () => string;
  }
}

export function InsCryptPanel() {
  const [url, setUrl] = useState('https://holy-heart-0271.valhallaa.workers.dev');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = window.generateToken();
      const response = await window.requestConfigs(url, token, code);
      const configs = response.configs.map(c => c.url).join("\n");
      setResult(configs); // JSON.stringify(response, null, 2));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lock className="text-blue-600" size={18} />
          <h2 className="text-sm font-bold">Dawsh's Just For Fun project</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Shield size={14} />
          <span>Allow InSecure Connection</span>
        </div>
      </div>

      <div className="space-y-4 bg-[#f0f0f0] p-4 shadow-win98">
        <div className="flex flex-col gap-2">
          <label className="text-sm flex items-center gap-2">
            Target URL:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="win98-input w-full"
            placeholder="Enter target URL"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm flex items-center gap-2">
            Access Code (Optional):
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="win98-input w-full"
            placeholder="Enter access code"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !url}
          className="win98-button px-4 py-2 w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Lock size={16} />
          )}
          {loading ? 'Processing...' : 'Fetch Configuration'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <div className="text-sm mb-2 flex items-center gap-2">
            <Shield size={14} />
            Configuration Result:
          </div>
          <div className="shadow-win98 overflow-hidden">
            <div className="bg-[#2d2a2e] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6188]" />
                <div className="w-3 h-3 rounded-full bg-[#ffd866]" />
                <div className="w-3 h-3 rounded-full bg-[#a9dc76]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#939293] text-xs">JSON</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                  }}
                  className="flex items-center justify-center p-1 hover:bg-[#3d3a3e] rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#939293]"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span className="text-[#939293] text-xs">COPY</span>
                </button>
              </div>
            </div>
            <SyntaxHighlighter
              language="json"
              style={monokai}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                // maxHeight: '1000px',
              }}
            >
              {result}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}