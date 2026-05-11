import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, Target, BarChart3, Zap, ArrowRight, ChevronDown, Shield, Brain, TrendingUp, Cpu, Globe, Sparkles, Layers, Hexagon } from 'lucide-react';

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 37, 255, ${p.a * 0.5})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230, 37, 255, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const FloatingOrbs = () => (
  <>
    <div className="fixed top-[-15%] left-[-5%] w-[50%] h-[70%] bg-[#E625FF]/8 blur-[160px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
    <div className="fixed bottom-[-20%] right-[-10%] w-[45%] h-[60%] bg-[#0FEFFD]/6 blur-[150px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="fixed top-[40%] right-[15%] w-[20%] h-[30%] bg-[#5B16E6]/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
  </>
);

const GridBackground = () => (
  <div className="fixed inset-0 -z-10 opacity-[0.03]">
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(230,37,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,37,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
  </div>
);

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute -z-5 ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0.08, 0.15, 0.08], scale: 1, rotate: [0, 180, 360] }}
    transition={{ duration: 20, repeat: Infinity, delay, ease: 'linear' }}
  >
    <Hexagon size={60} className="text-[#E625FF]" />
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  const gradients = {
    magenta: 'from-[#E625FF] to-[#5B16E6]',
    cyan: 'from-[#0FEFFD] to-[#5B16E6]',
    purple: 'from-[#5B16E6] to-[#E625FF]',
  };
  const borderColors = {
    magenta: 'group-hover:border-[#E625FF]/40',
    cyan: 'group-hover:border-[#0FEFFD]/40',
    purple: 'group-hover:border-[#5B16E6]/40',
  };
  const shadowColors = {
    magenta: 'group-hover:shadow-[0_0_30px_rgba(230,37,255,0.15)]',
    cyan: 'group-hover:shadow-[0_0_30px_rgba(15,239,253,0.15)]',
    purple: 'group-hover:shadow-[0_0_30px_rgba(91,22,230,0.15)]',
  };
  const glowColors = {
    magenta: 'shadow-[0_0_20px_rgba(230,37,255,0.3)]',
    cyan: 'shadow-[0_0_20px_rgba(15,239,253,0.3)]',
    purple: 'shadow-[0_0_20px_rgba(91,22,230,0.3)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative bg-[#12131A]/60 backdrop-blur-xl border border-white/[0.06] p-8 rounded-3xl ${borderColors[color]} ${shadowColors[color]} transition-all duration-500 hover:translate-y-[-4px]`}
    >
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradients[color]} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[color]} flex items-center justify-center mb-6 ${glowColors[color]} group-hover:scale-110 transition-transform duration-500`}>
        <Icon className="text-white" size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-white font-bold text-lg mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradients[color]} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-full`} />
    </motion.div>
  );
};

const StatItem = ({ value, label, color, suffix = '' }) => {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);
  const numeric = parseInt(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const dur = 2000;
          const step = Math.ceil(numeric / (dur / 16));
          const interval = setInterval(() => {
            start += step;
            if (start >= numeric) {
              setDisplayed(numeric);
              clearInterval(interval);
            } else setDisplayed(start);
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-5xl md:text-6xl font-black ${color} tracking-tighter`}>
        {displayed}{suffix}
      </div>
      <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mt-2">{label}</div>
    </div>
  );
};

const PhaseTimeline = ({ phases, index }) => {
  const icons = [Brain, Cpu, Zap];
  const colors = ['#E625FF', '#0FEFFD', '#5B16E6'];
  const Icon = icons[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-start gap-6 group"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300" style={{ background: `linear-gradient(135deg, ${colors[index]}, ${colors[(index + 1) % 3]})` }}>
          <Icon className="text-white" size={20} strokeWidth={1.5} />
        </div>
        {index < 2 && <div className="w-[2px] h-16 bg-gradient-to-b mt-2 opacity-30" style={{ background: `linear-gradient(to bottom, ${colors[index]}, ${colors[index + 1]})` }} />}
      </div>
      <div className="pt-2">
        <h4 className="text-white font-bold text-base tracking-tight">{phases.title}</h4>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{phases.description}</p>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B0B10]/80 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#5B16E6] to-[#E625FF] flex items-center justify-center shadow-[0_0_20px_rgba(230,37,255,0.3)]">
            <Rocket className="text-white" size={18} />
          </div>
          <span className="text-white font-black text-lg tracking-[0.15em]">
            Ri<span className="text-[#E625FF]">B</span>uzz
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Diagnóstico', 'Estrategia', 'Ejecución'].map((item) => (
            <button key={item} className="text-[11px] text-gray-400 hover:text-white font-bold uppercase tracking-[0.15em] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E625FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          ))}
        </div>
        <button
          onClick={onGetStarted}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white font-black text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(230,37,255,0.2)] hover:shadow-[0_10px_40px_rgba(230,37,255,0.35)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          Acceder <ArrowRight size={14} />
        </button>
      </div>
    </motion.nav>
  );
};

const LandingView = ({ onGetStarted }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="relative bg-[#0B0B10] text-white font-sans overflow-x-hidden selection:bg-[#E625FF]/30">
      <Particles />
      <FloatingOrbs />
      <GridBackground />
      <Navbar onGetStarted={onGetStarted} />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <FloatingShape className="top-[15%] left-[8%]" />
        <FloatingShape className="bottom-[20%] right-[10%]" delay={5} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="relative z-10 px-6 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E625FF]/20 bg-[#E625FF]/5 text-[#E625FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles size={12} /> Commercial Operating System
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.03em] leading-[0.9] mb-6"
          >
            <span className="text-white">Ri</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E625FF] via-[#0FEFFD] to-[#5B16E6]">Buzz</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Tu sistema operativo comercial inteligente. <br className="hidden md:block" />
            <span className="text-white font-medium">Diagnostica, estrategiza y ejecuta</span> con precisión quirúrgica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onGetStarted}
              className="group relative bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white font-black text-xs uppercase tracking-[0.25em] px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(230,37,255,0.25)] hover:shadow-[0_20px_60px_rgba(230,37,255,0.4)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-3"
            >
              <Rocket size={18} className="group-hover:rotate-[-12deg] transition-transform" />
              Iniciar Diagnóstico
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group px-8 py-5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2">
              <Shield size={14} />
              Ver Plataforma
            </button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-20 flex flex-wrap justify-center gap-10 md:gap-16"
          >
            {[
              { value: '12', label: 'Módulos IA' },
              { value: '3', label: 'Fases Estratégicas' },
              { value: '100%', label: 'Data-Driven' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">{s.value}</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-[0.25em] font-bold mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] text-gray-600 uppercase tracking-[0.3em] font-bold">Desliza</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0FEFFD]/20 bg-[#0FEFFD]/5 text-[#0FEFFD] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Layers size={12} /> Arquitectura
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Diagnóstico en{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E625FF] to-[#0FEFFD]">3 dimensiones</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Analizamos tu negocio desde 12 ángulos distintos para construir una estrategia imbatible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Target}
              color="magenta"
              title="Diagnóstico IA"
              description="Analiza tu negocio con 12 módulos de inteligencia artificial para identificar oportunidades y gaps críticos."
              index={0}
            />
            <FeatureCard
              icon={BarChart3}
              color="cyan"
              title="Estrategia Data-Driven"
              description="Genera playbooks estratégicos basados en datos reales con fórmulas de monetización probadas."
              index={1}
            />
            <FeatureCard
              icon={Zap}
              color="purple"
              title="Ejecución Automática"
              description="Implementa scripts de IA, gestiona tareas y sincroniza tu operación en un solo lugar."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E625FF]/[0.02] to-transparent -z-5" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#5B16E6]/20 bg-[#5B16E6]/5 text-[#5B16E6] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <TrendingUp size={12} /> Metodología
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              De los datos a la{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0FEFFD] to-[#E625FF]">ejecución</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Tres fases. Un objetivo: transformar tu operación comercial.
            </p>
          </motion.div>

          <div className="max-w-lg mx-auto space-y-2">
            {[
              { title: 'Diagnóstico Inteligente', description: 'Respondes 12 módulos de preguntas diseñadas por nuestros algoritmos. Cada respuesta afina el diagnóstico.' },
              { title: 'Procesamiento RiBuzz', description: 'Nuestra IA procesa tus respuestas y genera un playbook estratégico personalizado con acciones concretas.' },
              { title: 'Implementación Guiada', description: 'Ejecuta el plan paso a paso con seguimiento en tiempo real y métricas de progreso.' },
            ].map((phase, i) => (
              <PhaseTimeline key={i} phases={phase} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E625FF]/[0.02] via-transparent to-[#0FEFFD]/[0.02] -z-5" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E625FF]/20 bg-[#E625FF]/5 text-[#E625FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Globe size={12} /> Impacto
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Métricas que{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B16E6] to-[#0FEFFD]">importan</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            <StatItem value="12" label="Módulos IA" color="text-[#E625FF]" />
            <StatItem value="3" label="Fases" color="text-[#0FEFFD]" />
            <StatItem value="70" label="Variables" color="text-white" suffix="+" />
            <StatItem value="100" label="Data-Driven" color="text-[#5B16E6]" suffix="%" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-[#12131A] to-[#181A24] border border-white/[0.06] rounded-[40px] p-12 md:p-20 text-center overflow-hidden"
          >
            <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[80%] bg-[#E625FF]/8 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-30%] left-[-20%] w-[60%] h-[80%] bg-[#0FEFFD]/8 blur-[120px] rounded-full" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B16E6] to-[#E625FF] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(230,37,255,0.3)]">
                  <Rocket className="text-white" size={32} />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6"
              >
                ¿Listo para{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E625FF] to-[#0FEFFD]">despegar</span>?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-400 text-sm max-w-md mx-auto mb-10 leading-relaxed"
              >
                Tu diagnóstico inicial es completamente gratis. Descubre cómo optimizar tu operación comercial en minutos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-[#E625FF] to-[#5B16E6] text-white font-black text-xs uppercase tracking-[0.25em] px-12 py-6 rounded-full shadow-[0_20px_50px_rgba(230,37,255,0.3)] hover:shadow-[0_20px_60px_rgba(230,37,255,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 inline-flex items-center gap-3"
                >
                  Comenzar Ahora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.04] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-2 h-2 rounded-full bg-[#0FEFFD] animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Sistemas Operativos</span>
          </div>
          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            v2.04.12 // RiBuzz Corp © {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-6">
            {['Privacidad', 'Términos', 'Soporte'].map((item) => (
              <button key={item} className="text-[9px] text-gray-500 hover:text-gray-300 font-bold uppercase tracking-[0.2em] transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;