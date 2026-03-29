import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Github,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const WORKS = [
  {
    id: 1,
    title: "PPG Authentication",
    category: "Cybersecurity",
    excerpt:
      "An attempt at building an authentication system using photoplethysmography of the human pulse — exploring biometric data as a security layer.",
    date: "Oct 2025",
    image: "/assets/generated/work-ppg-auth.dim_600x400.jpg",
  },
  {
    id: 2,
    title: "Carbon Footprint Monitor",
    category: "Blockchain",
    excerpt:
      "A real-time carbon footprint monitor leveraging blockchain technology and cryptography to ensure tamper-proof environmental tracking.",
    date: "Feb 2026",
    image: "/assets/generated/work-carbon-blockchain.dim_600x400.jpg",
  },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      for (const o of observers) o?.disconnect();
    };
  }, [ids]);
  return active;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const active = useScrollSpy(["home", "works", "about", "contact"]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! I'll get back to you soon.");
    setFormState({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "works" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />

      {/* Utility Banner */}
      <div className="w-full bg-velvet border-b border-border py-1.5 text-center">
        <p className="text-xs text-foreground/80 tracking-widest uppercase">
          Portfolio · 2nd Semester · Winter 2026
        </p>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4 max-w-6xl">
          {/* Logo */}
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            S<span style={{ color: "oklch(72% 0.14 80)" }}>.</span>S
          </span>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            data-ocid="nav.panel"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.${link.id}.link`}
                onClick={() => scrollTo(link.id)}
                className={`text-sm tracking-wide transition-colors ${
                  active === link.id
                    ? "text-gold font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              data-ocid="header.contact.button"
              onClick={() => scrollTo("contact")}
              className="hidden md:inline-flex bg-gold text-primary-foreground hover:opacity-90 rounded-sm text-sm px-5 py-2 font-semibold"
            >
              Get in Touch
            </Button>
            <button
              type="button"
              className="md:hidden text-foreground p-1"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="nav.mobile.toggle"
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border bg-card z-50"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors py-1"
                    data-ocid={`nav.mobile.${link.id}.link`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, oklch(25% 0.12 15 / 0.35) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="section-label mb-4">Portfolio</p>
              <h1
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 gold-glow"
                style={{ color: "oklch(95% 0.01 80)" }}
              >
                Sanjay
                <br />
                <span style={{ color: "oklch(72% 0.14 80)" }}>
                  Shanmugasundaram
                </span>
              </h1>
              <p
                className="font-serif text-lg mb-6 tracking-wide"
                style={{ color: "oklch(72% 0.14 80)" }}
              >
                Future Data Scientist. Exploring Data Since 2025.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
                A First year B. Tech Student pursuing a bachelor's degree in
                Artificial Intelligence and Data Engineering at Vellore
                Institute of Technology, with a passion for data management and
                security.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  data-ocid="hero.works.button"
                  onClick={() => scrollTo("works")}
                  className="bg-gold text-primary-foreground hover:opacity-90 rounded-sm px-6 py-2.5 font-semibold flex items-center gap-2"
                >
                  View My Projects <ArrowRight size={16} />
                </Button>
                <Button
                  data-ocid="hero.about.button"
                  variant="outline"
                  onClick={() => scrollTo("about")}
                  className="rounded-sm border-border text-foreground hover:border-gold hover:text-gold transition-colors px-6 py-2.5"
                >
                  About Me
                </Button>
              </div>
            </motion.div>

            {/* Right — Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center md:justify-end"
            >
              <div
                className="relative"
                style={{ boxShadow: "8px 8px 0 oklch(72% 0.14 80 / 0.4)" }}
              >
                <img
                  src="/assets/uploads/whatsapp_image_2026-03-29_at_19.12.01-019d39d6-08a2-7109-90fe-6fa3b681e5fb-1.jpeg"
                  alt="Sanjay Shanmugasundaram"
                  className="w-72 md:w-80 object-cover border border-border"
                  style={{ aspectRatio: "4/5" }}
                />
                <div
                  className="absolute bottom-4 left-4 right-4 p-3"
                  style={{ background: "oklch(10% 0.02 15 / 0.9)" }}
                >
                  <p className="font-serif text-sm text-foreground">
                    Sanjay Shanmugasundaram
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(72% 0.14 80)" }}
                  >
                    B.Tech AI &amp; Data Engineering · VIT
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-16"
          >
            <button
              type="button"
              onClick={() => scrollTo("works")}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <ChevronDown size={16} className="animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line w-full" />

      {/* ── PROJECTS ── */}
      <section id="works" className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Portfolio</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Projects
            </h2>
            <div className="gold-line w-24 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6" data-ocid="works.list">
            {WORKS.map((work, i) => (
              <motion.div
                key={work.id}
                data-ocid={`works.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-card border border-border card-hover overflow-hidden"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ height: 200 }}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(14% 0.03 15) 0%, transparent 50%)",
                    }}
                  />
                  <span
                    className="absolute top-3 left-3 text-xs px-2 py-0.5 font-semibold tracking-wide"
                    style={{
                      background: "oklch(72% 0.14 80)",
                      color: "oklch(10% 0.02 15)",
                    }}
                  >
                    {work.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">
                    {work.date}
                  </p>
                  <h3 className="font-serif text-base font-semibold text-foreground leading-snug mb-3">
                    {work.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {work.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line w-full" />

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-28 velvet-pattern relative">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div
                style={{
                  boxShadow: "-6px 6px 0 oklch(25% 0.12 15)",
                  border: "1px solid oklch(25% 0.12 15)",
                }}
              >
                <img
                  src="/assets/uploads/whatsapp_image_2026-03-29_at_19.12.01-019d39d6-08a2-7109-90fe-6fa3b681e5fb-1.jpeg"
                  alt="About Sanjay"
                  className="w-64 md:w-72 object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </motion.div>

            {/* Text Right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="section-label mb-3">DATA EXPLORER</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Me
              </h2>
              <div className="gold-line w-16 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-5">
                Data fascinated me for a long time. Growing up in an age of
                software and AI revolution, I found my opportunity to explore my
                interests in tech, data, and cybersecurity. Pursuing my
                interests and navigating a rough job market while acquiring new
                skills to back them.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm exploring and experiencing new things since I started
                college. My interests include music, books, and cinema.
                Currently learning C, C++, and data structures — hoping to
                become a data scientist or a game developer one day.
              </p>
              <div className="flex items-center gap-3 flex-wrap mb-8">
                {["C", "C++", "Python", "Git", "Data Structures"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 border tracking-wide"
                      style={{
                        borderColor: "oklch(72% 0.14 80 / 0.4)",
                        color: "oklch(72% 0.14 80)",
                      }}
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Languages", items: ["C", "C++", "Python"] },
                  { label: "Tools", items: ["Git"] },
                  { label: "Tech", items: ["Data Structures"] },
                ].map((col) => (
                  <div
                    key={col.label}
                    className="p-3 border"
                    style={{
                      borderColor: "oklch(25% 0.12 15)",
                      background: "oklch(12% 0.02 15 / 0.6)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: "oklch(72% 0.14 80)" }}
                    >
                      {col.label}
                    </p>
                    <ul className="space-y-1">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line w-full" />

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Say Hello</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Get in Touch
            </h2>
            <div className="gold-line w-24 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Social Links Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-serif text-xl font-semibold text-foreground mb-2">
                Sanjay Shanmugasundaram
              </p>
              <p className="text-muted-foreground text-sm mb-8">
                Available for collaborative projects and learning.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:sanjay.s2025d@vitstudent.ac.in"
                  className="flex items-center gap-4 group"
                  data-ocid="contact.email.link"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: "oklch(25% 0.12 15)" }}
                  >
                    <Mail size={16} style={{ color: "oklch(72% 0.14 80)" }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                      Email
                    </p>
                    <p className="text-foreground text-sm group-hover:text-gold transition-colors">
                      sanjay.s2025d@vitstudent.ac.in
                    </p>
                  </div>
                </a>
                <a
                  href="https://github.com/SJay-47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  data-ocid="contact.github.link"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: "oklch(25% 0.12 15)" }}
                  >
                    <Github size={16} style={{ color: "oklch(72% 0.14 80)" }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                      GitHub
                    </p>
                    <p className="text-foreground text-sm group-hover:text-gold transition-colors">
                      SJay-47
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: "oklch(25% 0.12 15)" }}
                  >
                    <BookOpen
                      size={16}
                      style={{ color: "oklch(72% 0.14 80)" }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                      Status
                    </p>
                    <p className="text-foreground text-sm">
                      Available for collaborative projects and learning
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="contact.form"
              >
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    data-ocid="contact.name.input"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    placeholder="Your name"
                    className="bg-card border-border rounded-sm focus-visible:ring-1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-ocid="contact.email.input"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    placeholder="your@email.com"
                    className="bg-card border-border rounded-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="contact.message.textarea"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className="bg-card border-border rounded-sm resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit.button"
                  disabled={submitting}
                  className="w-full bg-gold text-primary-foreground hover:opacity-90 rounded-sm font-semibold tracking-wide py-2.5"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-xs text-muted-foreground hover:text-foreground tracking-wide transition-colors"
                data-ocid={`footer.${link.id}.link`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <p className="text-xs text-muted-foreground text-center">
            © 2026 Sanjay Shanmugasundaram.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:sanjay.s2025d@vitstudent.ac.in"
              className="text-muted-foreground hover:text-gold transition-colors"
              data-ocid="footer.email.link"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/SJay-47"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
              data-ocid="footer.github.link"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
