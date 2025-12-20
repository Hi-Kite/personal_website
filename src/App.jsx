import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Mail, 
  ArrowUpRight, 
  User, 
  Layout, 
  Compass, 
  Sparkles,
  Clock,
  ChevronRight,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Music,
  BookOpen,
  Coffee,
  Heart
} from 'lucide-react';

// --- Apple HIG & 液态玻璃配置 ---
const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.8
};

// --- 个人数据 ---
const PROJECTS = [
  { id: 1, title: 'NeoVibe', tag: 'Framework', desc: '基于原子理论的高级设计系统。', icon: <Layout className="text-blue-400" /> },
  { id: 2, title: 'imfz Portal', tag: 'Web', desc: '个人数字化展示空间门户。', icon: <Globe className="text-purple-400" /> },
  { id: 3, title: 'Atmosphere', tag: 'Graphics', desc: 'WebGL 实时环境渲染引擎。', icon: <Cpu className="text-emerald-400" /> },
];

const STATUS_OPTIONS = [
  { text: "正在编写代码", icon: <Cpu size={12} />, color: "text-emerald-400" },
  { text: "寻找灵感中", icon: <Sparkles size={12} />, color: "text-blue-400" },
  { text: "咖啡休息时间", icon: <Coffee size={12} />, color: "text-orange-400" }
];

// --- 背景组件：液态流光 ---
const LiquidBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
    <div className="absolute inset-0 opacity-40">
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-600/30 blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-600/20 blur-[100px]"
      />
      <motion.div 
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[150px]"
      />
    </div>
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>
);

// --- HIG 组件库 ---

const MaterialCard = ({ children, className = "", onClick, noHover = false }) => (
  <motion.div 
    whileHover={noHover ? {} : { scale: 0.993, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    whileTap={noHover ? {} : { scale: 0.97 }}
    onClick={onClick}
    transition={SPRING_TRANSITION}
    className={`bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[28px] overflow-hidden ${className} ${onClick ? 'cursor-pointer' : ''} shadow-2xl relative group`}
  >
    {children}
  </motion.div>
);

const NavControl = ({ active, setPage }) => {
  const tabs = [
    { id: 'home', icon: Compass, label: '主页' },
    { id: 'works', icon: Layout, label: '作品' },
    { id: 'about', icon: User, label: '关于' }
  ];

  return (
    <div className="flex p-1.5 bg-white/[0.05] backdrop-blur-3xl rounded-full border border-white/10 w-full max-w-[420px] shadow-2xl">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id)}
            className="relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full transition-all duration-500 outline-none"
          >
            {isActive && (
              <motion.div 
                layoutId="nav-active-pill"
                className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-full"
                transition={SPRING_TRANSITION}
              />
            )}
            <tab.icon size={18} className={`relative z-10 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
            <span className={`relative z-10 text-sm font-semibold tracking-tight ${isActive ? 'text-black' : 'text-zinc-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// --- 视图层 ---

const HomeView = ({ setPage }) => {
  const [status] = useState(STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)]);

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      className="space-y-8"
    >
      <header className="py-10 md:py-16 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              Currently online / imfz.cn
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Hi, 我是 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Kite</span>
            </h1>
          </div>
          
          {/* 状态卡片 Widget */}
          <MaterialCard className="p-4 md:min-w-[200px] flex items-center gap-4 bg-white/[0.02]" noHover>
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
                {status.icon}
             </div>
             <div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Current Status</div>
                <div className={`text-sm font-medium ${status.color}`}>{status.text}</div>
             </div>
          </MaterialCard>
        </div>
        
        <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl font-light leading-relaxed">
          一名追求极致视觉与交互的开发者。在这里，我将数字逻辑转化为温润的感官体验。
        </p>
      </header>

      {/* 个人特性网格 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MaterialCard className="md:col-span-2 p-8 h-64 flex flex-col justify-end" onClick={() => setPage('works')}>
          <div className="absolute top-8 right-8 text-white/10 group-hover:text-white/20 transition-colors">
              <Layers size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              精选项目 <ArrowUpRight size={20} className="text-zinc-600" />
            </h3>
            <p className="text-zinc-500 mt-2">点击探索我近期构建的数字化案例。</p>
          </div>
        </MaterialCard>

        {/* 灵感卡片 */}
        <MaterialCard className="p-6 bg-gradient-to-br from-indigo-500/10 to-transparent" noHover>
          <Music className="text-indigo-400 mb-4" size={24} />
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">On Repeat</div>
          <div className="text-sm font-medium text-zinc-300 leading-snug">
            "Space Song" <br />
            <span className="text-zinc-500">Beach House</span>
          </div>
        </MaterialCard>

        {/* 书单卡片 */}
        <MaterialCard className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent" noHover>
          <BookOpen className="text-purple-400 mb-4" size={24} />
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Reading</div>
          <div className="text-sm font-medium text-zinc-300 leading-snug">
            "设计心理学" <br />
            <span className="text-zinc-500">Don Norman</span>
          </div>
        </MaterialCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MaterialCard className="p-8 flex items-center gap-4 group" onClick={() => setPage('about')}>
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <User size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold">关于我</h3>
            <p className="text-zinc-500 text-xs mt-1 tracking-tight">故事、背景与联系方式</p>
          </div>
        </MaterialCard>

        <MaterialCard className="p-8 flex items-center gap-4 group" onClick={() => window.open('https://imfz.cn')}>
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 transition-all">
              <Globe size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold">博客</h3>
            <p className="text-zinc-500 text-xs mt-1 tracking-tight">深度技术沉淀与分享</p>
          </div>
        </MaterialCard>

        <MaterialCard className="p-8 flex items-center gap-4 group" onClick={() => window.location.href='mailto:kite@imfz.cn'}>
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
              <Mail size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold">联络</h3>
            <p className="text-zinc-500 text-xs mt-1 tracking-tight">开启一段新的合作之旅</p>
          </div>
        </MaterialCard>
      </div>
    </motion.div>
  );
};

const WorksView = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="space-y-6 pb-12"
  >
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">
      <div>
        <h2 className="text-4xl font-bold tracking-tight">作品选集</h2>
        <p className="text-zinc-500 mt-2">在这里，我用代码实现对美学的坚持。</p>
      </div>
      <span className="text-zinc-500 font-mono text-sm border border-white/10 px-3 py-1 rounded-full bg-white/5 self-start">
        / 03 SELECTED
      </span>
    </div>
    
    <div className="grid grid-cols-1 gap-5">
      {PROJECTS.map((p) => (
        <MaterialCard key={p.id} className="p-8 group" onClick={() => {}}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-20 h-20 bg-white/[0.02] rounded-3xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
              {p.icon}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/80 mb-1 block">
                {p.tag}
              </span>
              <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{p.title}</h4>
              <p className="text-zinc-500 mt-1 text-base leading-relaxed">{p.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium group-hover:text-white transition-colors">
                View Case Study <ArrowUpRight size={16} />
            </div>
          </div>
        </MaterialCard>
      ))}
    </div>
  </motion.div>
);

// --- 主程序 ---

export default function App() {
  const [page, setPage] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen text-white font-['SF_Pro_Display','Inter',sans-serif] selection:bg-blue-500 selection:text-white antialiased">
      <LiquidBackground />

      {/* 状态栏 */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs border border-white/10">K</div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Kite Digital</div>
              <div className="text-[9px] text-zinc-600 font-mono">EST. 2025</div>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] font-medium text-zinc-500">
          <span className="tabular-nums tracking-widest uppercase">{currentTime.toLocaleDateString('zh-CN', {month: 'long', day: 'numeric'})}</span>
          <span className="bg-white/5 px-3 py-1 rounded-full border border-white/5 tabular-nums text-white">
            {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-4 pb-40">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomeView key="home" setPage={setPage} />}
          {page === 'works' && <WorksView key="works" />}
          {page === 'about' && (
             <motion.div 
               key="about"
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="max-w-4xl space-y-16"
             >
                <section className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Kite 的世界.</h2>
                    <p className="text-xl md:text-3xl text-zinc-400 leading-tight font-light max-w-2xl">
                        在 imfz.cn，我构建的不仅是网页，而是一个个能够呼吸的<span className="text-white italic">数字生命</span>。
                    </p>
                </section>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Story / 故事</h4>
                          <p className="text-zinc-400 leading-relaxed">
                            我是一名开发者，也是一名设计信徒。我坚信优雅的解决方案应该像空气一样自然。在过去的五年里，我一直游走于设计与代码的交界处，试图消除两者的隔阂。
                          </p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                             <Heart size={12} className="text-red-500" /> Passions / 爱好
                          </h4>
                          <div className="flex flex-wrap gap-2">
                              {['胶片摄影', '极简主义', '手冲咖啡', '赛博朋克'].map(p => (
                                  <span key={p} className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 text-xs text-zinc-300">{p}</span>
                              ))}
                          </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Connect / 联络</h4>
                            <div className="space-y-4">
                               <a href="#" className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all group">
                                  <span className="font-medium">GitHub</span>
                                  <Github size={18} />
                               </a>
                               <a href="#" className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all group">
                                  <span className="font-medium">Twitter / X</span>
                                  <Twitter size={18} />
                               </a>
                               <a href="mailto:kite@imfz.cn" className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all group">
                                  <span className="font-medium">Email</span>
                                  <Mail size={18} />
                               </a>
                            </div>
                        </div>
                    </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部 Tab Bar */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6 pointer-events-none">
        <div className="w-full max-w-[420px] pointer-events-auto">
          <NavControl active={page} setPage={setPage} />
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-6 py-16 border-t border-white/[0.05]">
        <div className="flex flex-col md:flex-row justify-between gap-10 items-center">
          <div className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase">
             Digital Sanctuary since 2025
          </div>
          <div className="text-[#48484A] text-[9px] tracking-widest uppercase">
            Designed with Intention / imfz.cn
          </div>
        </div>
      </footer>
    </div>
  );
}
