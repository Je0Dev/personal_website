import { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

interface Token {
  type: 'keyword' | 'string' | 'comment' | 'number' | 'operator' | 'function' | 'constant' | 'plain';
  value: string;
}

const languageMap: Record<string, string> = {
  'c': 'c',
  'python': 'python',
  'python3': 'python',
  'tsx': 'tsx',
  'typescript': 'typescript',
  'js': 'javascript',
  'sql': 'sql',
  'bash': 'bash',
  'shell': 'bash',
  'json': 'json',
  'makefile': 'makefile',
  'cpp': 'cpp',
};

const tokenColors: Record<string, string> = {
  keyword: 'text-purple-400',
  string: 'text-blue-300',
  comment: 'text-gray-500 italic',
  number: 'text-pink-400',
  operator: 'text-cyan-300',
  function: 'text-violet-400',
  constant: 'text-yellow-400',
  plain: 'text-gray-200',
};

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code;

  const patterns: [RegExp, string][] = [
    [/\/\/.*$/gm, 'comment'],
    [/#.*$/gm, 'comment'],
    [/""".*?"""/gs, 'string'],
    [/'''.*?'''/gs, 'string'],
    [/"(?:[^"\\]|\\.)*"/g, 'string'],
    [/'(?:[^'\\]|\\.)*'/g, 'string'],
    [/\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|new|this|async|await|try|catch|throw|finally|typeof|instanceof|in|of|switch|case|break|continue|default|do|typedef|struct|enum|void|int|long|short|float|double|char|unsigned|static|extern|inline)\b/g, 'keyword'],
    [/\b(true|false|null|undefined|NaN|Infinity|TRUE|FALSE|NULL)\b/g, 'constant'],
    [/\b\d+\.?\d*\b/g, 'number'],
    [/=>|==|!=|===|!==|<=|>=|&&|\|\||[+\-*/%=<>!&|^~]/g, 'operator'],
    [/\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/g, 'function'],
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const [pattern, tokenType] of patterns) {
      const match = remaining.match(pattern);
      if (match && match.index === 0) {
        tokens.push({ type: tokenType as Token['type'], value: match[0] });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({ type: 'plain', value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayLanguage = languageMap[language] || language;
  const languageTitle = displayLanguage.charAt(0).toUpperCase() + displayLanguage.slice(1);

  const tokenizedCode = useMemo(() => tokenize(code), [code]);

  return (
    <div className="rounded border-4 border-[var(--border-color)] overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--accent-cyan)] border-b-4 border-[var(--border-color)]">
        <span className="text-xs font-mono font-bold text-[#111] uppercase">{languageTitle}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-xs font-bold text-[#111] hover:text-white transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 bg-[var(--bg-color)] overflow-x-auto text-sm font-mono leading-relaxed">
        <code>
          {tokenizedCode.map((token, i) => (
            <span key={i} className={tokenColors[token.type]}>
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}