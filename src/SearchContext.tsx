import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'note' | 'skill' | 'page';
  url: string;
  tags: string[];
};

interface SearchContextType {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  searchHistory: string[];
  addToHistory: (term: string) => void;
  clearHistory: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const searchData: SearchResult[] = [
  { id: '1', title: 'IMDb Clone Desktop App', description: 'Desktop app with local database, user auth, movie ratings', type: 'project', url: '/projects', tags: ['Java', 'JavaFX', 'SQLite'] },
  { id: '2', title: 'CLI ATM System', description: 'Banking simulation with account management and PIN auth', type: 'project', url: '/projects', tags: ['C', 'Makefile', 'Linux'] },
  { id: '3', title: 'Lang Website', description: 'Language learning platform with interactive lessons', type: 'project', url: '/projects', tags: ['TypeScript', 'React'] },
  { id: '4', title: 'Neon Vault Web Game', description: 'Cyberpunk puzzle game with neon aesthetics', type: 'project', url: '/projects', tags: ['JavaScript', 'Game Dev'] },
  { id: '5', title: 'Echoes: Fallen Kingdom', description: 'Text-based adventure RPG', type: 'project', url: '/projects', tags: ['Python', 'Game Dev'] },
  { id: '6', title: 'ESP32 Timer Sensor', description: 'Off-board timer with wireless data transmission', type: 'project', url: '/projects', tags: ['C++', 'ESP32', 'IoT'] },
  { id: '7', title: 'CLI Task Manager', description: 'Terminal-based task management with priorities', type: 'project', url: '/projects', tags: ['C', 'Data Structures'] },
  { id: '8', title: 'Student Database System', description: 'Engineering department management with CRUD', type: 'project', url: '/projects', tags: ['C', 'File I/O'] },
  { id: '9', title: 'Demystifying C-Pointers', description: 'Understanding pointers in C programming', type: 'note', url: '/notes', tags: ['C', 'Programming', 'Memory'] },
  { id: '10', title: 'My Journey', description: 'Personal note about pursuing engineering', type: 'note', url: '/notes', tags: ['Life', 'Learning'] },
  { id: '11', title: 'C / C++', description: 'Systems programming language', type: 'skill', url: '/', tags: ['Low-level', 'Systems'] },
  { id: '12', title: 'Python', description: 'Versatile programming language', type: 'skill', url: '/', tags: ['Scripting', 'Data'] },
  { id: '13', title: 'Java', description: 'Object-oriented programming', type: 'skill', url: '/', tags: ['OOP', 'Desktop'] },
  { id: '14', title: 'JavaScript', description: 'Web programming language', type: 'skill', url: '/', tags: ['Web', 'Frontend'] },
  { id: '15', title: 'TypeScript', description: 'Typed JavaScript', type: 'skill', url: '/', tags: ['Web', 'Type Safe'] },
  { id: '16', title: 'React', description: 'Frontend library', type: 'skill', url: '/', tags: ['Frontend', 'UI'] },
  { id: '17', title: 'Embedded', description: 'Embedded systems programming', type: 'skill', url: '/', tags: ['Hardware', 'IoT'] },
  { id: '18', title: 'Verilog', description: 'Hardware description language', type: 'skill', url: '/', tags: ['FPGA', 'HDL'] },
  { id: '19', title: 'Home', description: 'Welcome to my portfolio', type: 'page', url: '/', tags: ['Main', 'About'] },
  { id: '20', title: 'Projects', description: 'View my software projects', type: 'page', url: '/projects', tags: ['Work', 'Code'] },
  { id: '21', title: 'Hardware', description: 'Hardware engineering projects', type: 'page', url: '/hardware', tags: ['Electronics', 'FPGA'] },
  { id: '22', title: 'Notes', description: 'My blog posts and thoughts', type: 'page', url: '/notes', tags: ['Blog', 'Articles'] },
  { id: '23', title: 'Contact', description: 'Get in touch with me', type: 'page', url: '/contact', tags: ['Connect', 'Email'] },
];

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => { setIsOpen(false); setQuery(''); };
  const toggleSearch = () => isOpen ? closeSearch() : openSearch();

  const addToHistory = (term: string) => {
    if (!term.trim() || searchHistory.includes(term)) return;
    setSearchHistory(prev => [term, ...prev].slice(0, 5));
  };

  const clearHistory = () => setSearchHistory([]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    try {
      const regex = new RegExp(query, 'gi');
      return searchData.filter(item => 
        regex.test(item.title) || 
        regex.test(item.description) ||
        item.tags.some(tag => regex.test(tag))
      ).slice(0, 10);
    } catch {
      const lowerQuery = query.toLowerCase();
      return searchData.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      ).slice(0, 10);
    }
  }, [query]);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch, toggleSearch, query, setQuery, results, searchHistory, addToHistory, clearHistory }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
