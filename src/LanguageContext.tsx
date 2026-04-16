import { useState, useEffect, createContext, useContext } from 'react';

type Language = 'en' | 'de' | 'es' | 'zh';

interface Translations {
  nav: { home: string; projects: string; hardware: string; notes: string; contact: string; };
  sidebar: { search: string; theme: string; };
  home: { 
    title: string; subtitle: string; downloadCV: string; viewWork: string; basedIn: string; yearsCoding: string; 
    projects: string; languages: string; aboutMe: string; techStack: string; coursework: string; hobbies: string; cta: string;
    basedInLocation: string; studentAt: string; greeting: string; tagline: string; readMore: string;
  };
  stats: { yearsCodingLabel: string; projectsLabel: string; languagesLabel: string; };
  about: { title: string; text: string; };
  skills: { title: string; explore: string; };
  coursework: { title: string; };
  hobbies: { title: string; };
  cta: { title: string; };
  projects: { 
    title: string; subtitle: string; filter: string; search: string; reset: string; 
    noResults: string; viewCode: string; featured: string; stars: string; forks: string;
    checkGithub: string;
  };
  notes: { 
    title: string; subtitle: string; readMore: string; copy: string; copied: string; 
    search: string; filter: string; minRead: string; relatedProjects: string;
  };
  contact: {
    title: string; subtitle: string; name: string; email: string; message: string;
    send: string; sent: string; or: string; getInTouch: string;
  };
  hardware: { title: string; subtitle: string; };
  common: { readMore: string; relatedProjects: string; relatedNotes: string; copy: string; copied: string; search: string; filter: string; };
  footer: { rights: string; };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: { home: 'Home', projects: 'Projects', hardware: 'Hardware', notes: 'Notes', contact: 'Contact' },
    sidebar: { search: 'Search...', theme: 'Theme' },
    home: { 
      title: "Hi, I'm George", subtitle: 'Software & Hardware', downloadCV: 'Download CV', viewWork: 'View Work', 
      basedIn: 'Based in', yearsCoding: 'Years Coding', projects: 'Projects', languages: 'Languages', 
      aboutMe: 'About Me', techStack: 'Tech Stack', coursework: 'Coursework', hobbies: 'Hobbies & Interests', 
      cta: "Let's Build Something Amazing Together", basedInLocation: 'Greece', studentAt: 'ECE Student @UoP',
      greeting: "Hi, I'm", tagline: 'ECE Student & Software Developer', readMore: 'Read More'
    },
    stats: { yearsCodingLabel: 'Years Coding', projectsLabel: 'Projects', languagesLabel: 'Languages' },
    about: { title: 'About Me', text: '' },
    skills: { title: 'Skills', explore: 'Explore' },
    coursework: { title: 'Coursework' },
    hobbies: { title: 'Hobbies & Interests' },
    cta: { title: '' },
    projects: { 
      title: 'My Projects', subtitle: 'Check out my GitHub for more', filter: 'Filter by', search: 'Search projects...', 
      reset: 'Reset Filters', noResults: 'No projects found 😔', viewCode: 'View Code', featured: 'Featured',
      stars: 'stars', forks: 'forks', checkGithub: 'Check my GitHub for more'
    },
    notes: { 
      title: 'My Notes', subtitle: 'Thoughts, tutorials & snippets', readMore: 'Read More', copy: 'Copy', copied: 'Copied!', 
      search: 'Search notes...', filter: 'Filter by', minRead: 'min read', relatedProjects: 'Related Projects'
    },
    contact: {
      title: 'Get In Touch', subtitle: "Let's build something together", name: 'Your Name', email: 'Your Email', 
      message: 'Your Message', send: 'Send Message', sent: 'Sent!', or: 'or', getInTouch: 'Get in touch'
    },
    hardware: { title: 'Hardware Projects', subtitle: 'Embedded systems & more' },
    common: { readMore: 'Read More', relatedProjects: 'Related Projects', relatedNotes: 'Related Notes', copy: 'Copy', copied: 'Copied!', search: 'Search...', filter: 'Filter' },
    footer: { rights: 'All rights reserved.' },
  },
  de: {
    nav: { home: 'Startseite', projects: 'Projekte', hardware: 'Hardware', notes: 'Notizen', contact: 'Kontakt' },
    sidebar: { search: 'Suchen...', theme: 'Design' },
    home: { 
      title: 'Hallo, ich bin George', subtitle: 'Software & Hardware', downloadCV: 'Lebenslauf', viewWork: 'Projekte', 
      basedIn: 'Wohnhaft in', yearsCoding: 'Jahre Programmierung', projects: 'Projekte', languages: 'Sprachen', 
      aboutMe: 'Über mich', techStack: 'Tech-Stack', coursework: 'Kurse', hobbies: 'Hobbys', 
      cta: 'Lass uns etwas Erstaunliches bauen', basedInLocation: 'Griechenland', studentAt: 'ECE Student @UoP',
      greeting: 'Hallo, ich bin', tagline: 'ECE Student & Software Developer', readMore: 'Mehr lesen'
    },
    stats: { yearsCodingLabel: 'Jahre Programmierung', projectsLabel: 'Projekte', languagesLabel: 'Sprachen' },
    about: { title: 'Über mich', text: '' },
    skills: { title: 'Fähigkeiten', explore: 'Entdecken' },
    coursework: { title: 'Kurse' },
    hobbies: { title: 'Hobbys & Interessen' },
    cta: { title: '' },
    projects: { 
      title: 'Meine Projekte', subtitle: 'Schau mein GitHub für mehr', filter: 'Filtern', search: 'Projekte suchen...', 
      reset: 'Filter zurücksetzen', noResults: 'Keine Projekte gefunden 😔', viewCode: 'Code ansehen', featured: 'Empfohlen',
      stars: 'Sterne', forks: 'Forks', checkGithub: 'Schau mein GitHub für mehr'
    },
    notes: { 
      title: 'Meine Notizen', subtitle: 'Gedanken, Tutorials & Snippets', readMore: 'Mehr lesen', copy: 'Kopieren', copied: 'Kopiert!', 
      search: 'Notizen suchen...', filter: 'Filtern', minRead: 'Min. Lesen', relatedProjects: 'Verwandte Projekte'
    },
    contact: {
      title: 'Kontakt', subtitle: 'Lass uns zusammen etwas bauen', name: 'Dein Name', email: 'Deine E-Mail', 
      message: 'Deine Nachricht', send: 'Nachricht senden', sent: 'Gesendet!', or: 'oder', getInTouch: 'Kontakt aufnehmen'
    },
    hardware: { title: 'Hardware Projekte', subtitle: 'Eingebettete Systeme & mehr' },
    common: { readMore: 'Mehr lesen', relatedProjects: 'Verwandte Projekte', relatedNotes: 'Verwandte Notizen', copy: 'Kopieren', copied: 'Kopiert!', search: 'Suchen...', filter: 'Filtern' },
    footer: { rights: 'Alle Rechte vorbehalten.' },
  },
  es: {
    nav: { home: 'Inicio', projects: 'Proyectos', hardware: 'Hardware', notes: 'Notas', contact: 'Contacto' },
    sidebar: { search: 'Buscar...', theme: 'Tema' },
    home: { 
      title: 'Hola, soy George', subtitle: 'Software y Hardware', downloadCV: 'Descargar CV', viewWork: 'Ver Trabajo', 
      basedIn: 'Ubicado en', yearsCoding: 'Años de Código', projects: 'Proyectos', languages: 'Idiomas', 
      aboutMe: 'Sobre Mí', techStack: 'Stack Tecnológico', coursework: 'Cursos', hobbies: 'Pasatiempos', 
      cta: 'Construyamos Algo Increíble Juntos', basedInLocation: 'Grecia', studentAt: 'Estudiante de ECE @UoP',
      greeting: 'Hola, soy', tagline: 'Estudiante de ECE y Desarrollador', readMore: 'Leer Más'
    },
    stats: { yearsCodingLabel: 'Años de Código', projectsLabel: 'Proyectos', languagesLabel: 'Idiomas' },
    about: { title: 'Sobre Mí', text: '' },
    skills: { title: 'Habilidades', explore: 'Explorar' },
    coursework: { title: 'Cursos' },
    hobbies: { title: 'Pasatiempos & Intereses' },
    cta: { title: '' },
    projects: { 
      title: 'Mis Proyectos', subtitle: 'Mira mi GitHub para más', filter: 'Filtrar por', search: 'Buscar proyectos...', 
      reset: 'Restablecer Filtros', noResults: 'No se encontraron proyectos 😔', viewCode: 'Ver Código', featured: 'Destacado',
      stars: 'estrellas', forks: 'forks', checkGithub: 'Mira mi GitHub para más'
    },
    notes: { 
      title: 'Mis Notas', subtitle: 'Pensamientos, tutoriales y fragmentos', readMore: 'Leer Más', copy: 'Copiar', copied: '¡Copiado!', 
      search: 'Buscar notas...', filter: 'Filtrar por', minRead: 'min. leer', relatedProjects: 'Proyectos Relacionados'
    },
    contact: {
      title: 'Contáctame', subtitle: 'Construyamos algo juntos', name: 'Tu Nombre', email: 'Tu Email', 
      message: 'Tu Mensaje', send: 'Enviar Mensaje', sent: '¡Enviado!', or: 'o', getInTouch: 'Contáctame'
    },
    hardware: { title: 'Proyectos de Hardware', subtitle: 'Sistemas embebidos y más' },
    common: { readMore: 'Leer Más', relatedProjects: 'Proyectos Relacionados', relatedNotes: 'Notas Relacionadas', copy: 'Copiar', copied: '¡Copiado!', search: 'Buscar...', filter: 'Filtrar' },
    footer: { rights: 'Todos los derechos reservados.' },
  },
  zh: {
    nav: { home: '首页', projects: '项目', hardware: '硬件', notes: '笔记', contact: '联系' },
    sidebar: { search: '搜索...', theme: '主题' },
    home: { 
      title: '你好，我是George', subtitle: '软件与硬件', downloadCV: '下载简历', viewWork: '查看作品', 
      basedIn: '位于', yearsCoding: '编程年数', projects: '项目', languages: '语言', 
      aboutMe: '关于我', techStack: '技术栈', coursework: '课程', hobbies: '爱好', 
      cta: '让我们一起创造精彩', basedInLocation: '希腊', studentAt: 'UoP ECE学生',
      greeting: '你好，我是', tagline: 'ECE学生与软件开发者', readMore: '阅读更多'
    },
    stats: { yearsCodingLabel: '编程年数', projectsLabel: '项目', languagesLabel: '语言' },
    about: { title: '关于我', text: '' },
    skills: { title: '技能', explore: '探索' },
    coursework: { title: '课程' },
    hobbies: { title: '爱好' },
    cta: { title: '' },
    projects: { 
      title: '我的项目', subtitle: '查看我的GitHub获取更多', filter: '筛选', search: '搜索项目...', 
      reset: '重置筛选', noResults: '未找到项目 😔', viewCode: '查看代码', featured: '精选',
      stars: '星标', forks: '分支', checkGithub: '查看我的GitHub获取更多'
    },
    notes: { 
      title: '我的笔记', subtitle: '思考、教程和代码片段', readMore: '阅读更多', copy: '复制', copied: '已复制！', 
      search: '搜索笔记...', filter: '筛选', minRead: '分钟阅读', relatedProjects: '相关项目'
    },
    contact: {
      title: '联系我', subtitle: '让我们一起创造点什么', name: '你的名字', email: '你的邮箱', 
      message: '你的消息', send: '发送消息', sent: '已发送！', or: '或', getInTouch: '联系我'
    },
    hardware: { title: '硬件项目', subtitle: '嵌入式系统等' },
    common: { readMore: '阅读更多', relatedProjects: '相关项目', relatedNotes: '相关笔记', copy: '复制', copied: '已复制！', search: '搜索...', filter: '筛选' },
    footer: { rights: '保留所有权利。' },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({ language: 'en', setLanguage: () => {}, t: translations.en });

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}