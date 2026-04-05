import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, visible } = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const features = [
  { icon: "🎯", title: "Smart Attendance & Engagement Hub", desc: "Gamified check-ins, XP badges, streaks and leaderboards to boost participation." },
  { icon: "🧠", title: "Adaptive Learning Engine", desc: "AI personalization with game-based modules that adapt to your pace." },
  { icon: "📊", title: "Real-Time Feedback Command Center", desc: "Live sentiment dashboard with instant analytics and insights." },
  { icon: "🌍", title: "Universal Language & Context Bridge", desc: "50+ languages with multilingual AI tutor for seamless learning." },
  { icon: "🤖", title: "Instant Help Network", desc: "24/7 AI study buddy for instant problem-solving assistance." },
];

const steps = [
  { num: "01", title: "Sign Up & Set Goals", desc: "Create your account and define your learning objectives.", icon: "🚀" },
  { num: "02", title: "AI Personalizes Your Path", desc: "Our AI analyzes your style and creates a custom learning journey.", icon: "✨" },
  { num: "03", title: "Learn, Earn Rewards & Grow", desc: "Complete lessons, earn XP, climb leaderboards and achieve mastery.", icon: "🏆" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Student, Grade 10", text: "EduSync AI transformed my study routine. The AI tutor explains concepts in my native language!", avatar: "👩‍🎓" },
  { name: "Raj Kumar", role: "Math Teacher", text: "The real-time feedback dashboard helps me understand exactly where my students struggle.", avatar: "👨‍🏫" },
  { name: "Ananya Patel", role: "Student, Grade 12", text: "The gamified attendance system made me actually excited to attend classes every day!", avatar: "👩‍💻" },
];

const stats = [
  { value: 50000, label: "Active Students", suffix: "+" },
  { value: 50, label: "Languages Supported", suffix: "+" },
  { value: 10000, label: "Micro-Lessons", suffix: "+" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [testiIdx, setTestiIdx] = useState(0);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const iv = setInterval(() => setTestiIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative z-10 min-h-screen">
      <header className="sticky top-5 z-50 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="gradient-text font-display font-bold text-2xl"
          >
            EduSync AI
          </button>

          <nav className="hidden sm:flex items-center gap-7 text-base">
            <button type="button" onClick={() => scrollToSection("features")} className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </button>
            <button type="button" onClick={() => scrollToSection("how-it-works")} className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </button>
            <button type="button" onClick={() => scrollToSection("testimonials")} className="text-muted-foreground hover:text-primary transition-colors">
              Testimonials
            </button>
          </nav>

          <button
            type="button"
            onClick={() => navigate("/role-selection")}
            className="gradient-btn !py-2.5 !px-5 text-base"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-display gradient-text mb-4">
            EduSync AI
          </h1>
          <p className="text-xl sm:text-2xl text-primary font-medium mb-3">
            Your Intelligent Learning Companion
          </p>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Unified platform combining gamified attendance, adaptive learning, multilingual AI tutoring, and instant problem-solving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/role-selection")} className="gradient-btn text-lg">
              Get Started Free
            </button>
            <button className="outline-btn text-lg">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-center gradient-text mb-12">
            Core Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-center gradient-text mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="glass-card text-center">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{s.icon}</div>
                <div className="text-primary font-bold text-sm mb-2">STEP {s.num}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="glass-card text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display gradient-text mb-12">
            What People Say
          </h2>
          <div className="glass-card">
            <div className="text-5xl mb-4">{testimonials[testiIdx].avatar}</div>
            <p className="text-foreground text-lg italic mb-4">"{testimonials[testiIdx].text}"</p>
            <p className="text-primary font-semibold">{testimonials[testiIdx].name}</p>
            <p className="text-muted-foreground text-sm">{testimonials[testiIdx].role}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestiIdx(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === testiIdx ? "bg-primary scale-125" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center glass-card">
          <h2 className="text-3xl sm:text-4xl font-bold font-display gradient-text mb-3">
            Ready to Transform Learning?
          </h2>
          <p className="text-muted-foreground mb-6">Join EduSync AI Today</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="glass-input flex-1" />
            <button className="gradient-btn whitespace-nowrap">Start Learning</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="gradient-text font-display font-bold text-xl">EduSync AI</div>
          <div className="flex gap-6 text-muted-foreground text-sm">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Features</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
          <p className="text-muted-foreground text-sm">© 2026 EduSync AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
