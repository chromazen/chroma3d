import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Boxes,
  Wrench,
  GraduationCap,
  Gift,
  Flame,
  ArrowRight,
  Check,
} from "lucide-react";

/**
 * Chroma3D — Products Page (Preview)
 * Theme: premium matte black + molten orange, cinematic motion.
 * Drop this component into your app and route to it.
 */

const CATEGORIES = [
  { key: "all", label: "All", icon: Boxes },
  { key: "spiritual", label: "Spiritual", icon: Sparkles },
  { key: "gifts", label: "Custom Gifts", icon: Gift },
  { key: "edu", label: "Educational", icon: GraduationCap },
  { key: "utility", label: "Utility", icon: Wrench },
  { key: "proto", label: "Prototyping", icon: Boxes },
];

const MATERIALS = ["PLA", "PLA Silk", "PETG", "ABS", "TPU", "PLA Carbon Fiber", "PA-CF(Nylon)", "PLA+", "ASA", "PC", "PA-GF", "Polymer Mixture", "PA"];
const FINISHES = ["Plain", "UV Resin"];


const PRODUCT_DATA = [
  {
    id: "lakshmi-idol",
    name: "Lakshmi Idol",
    category: "spiritual",
    tag: "Signature",
    desc: "High-detail decorative idol with clean edges and premium surface finish.",
    materials: ["PLA Silk", "PLA", "PLA+"],
    leadTime: "2–4 days",
    highlight: "Intricate detailing",
    image: "/lakshmi.png",
  },
  {
    id: "ram-darbar",
    name: "Ram Darbar Set",
    category: "spiritual",
    tag: "Limited",
    desc: "Showpiece set optimized for multi-part assembly and consistent symmetry.",
    materials: ["PLA", "PLA Silk"],
    leadTime: "4–7 days",
    highlight: "Premium assembly fit",
    image: "",
  },
  {
    id: "nameplate",
    name: "Custom Name Plate",
    category: "gifts",
    tag: "Personalised",
    desc: "Names, logos, and icons with crisp typography and clean layering.",
    materials: ["PLA", "PETG"],
    leadTime: "1–3 days",
    highlight: "Sharp lettering",
    image: "",
  },
  {
    id: "keychain",
    name: "Custom Keychains",
    category: "gifts",
    tag: "Bestseller",
    desc: "Durable, lightweight keychains with custom shapes and branding.",
    materials: ["PLA", "PETG", "TPU"],
    leadTime: "1–3 days",
    highlight: "Bulk-friendly",
    image: "",
  },
  {
    id: "gear-model",
    name: "Gear Mechanism Model",
    category: "edu",
    tag: "Functional",
    desc: "Working demonstration model to explain gear ratios and motion transfer.",
    materials: ["PLA", "PETG"],
    leadTime: "3–5 days",
    highlight: "Smooth motion",
    image: "",
  },
  {
    id: "anatomy-model",
    name: "Anatomy Teaching Model",
    category: "edu",
    tag: "Institution",
    desc: "Scaled educational models for classrooms and labs (customisable).",
    materials: ["PLA", "Resin (on request)"],
    leadTime: "5–10 days",
    highlight: "Accurate scaling",
    image: "",
  },
  {
    id: "cable-organizer",
    name: "Cable Organizer",
    category: "utility",
    tag: "Minimal",
    desc: "Clean desk accessory designed for durability and daily use.",
    materials: ["PETG", "PLA"],
    leadTime: "1–2 days",
    highlight: "Sturdy snap-fit",
    image: "",
  },
  {
    id: "camera-mount",
    name: "Mount / Bracket (Custom)",
    category: "utility",
    tag: "Engineering",
    desc: "Custom mounts, brackets, and fixtures—designed to your dimensions.",
    materials: ["PETG", "ABS"],
    leadTime: "2–5 days",
    highlight: "Dimension-driven",
    image: "",
  },
  {
    id: "enclosure",
    name: "Prototype Enclosure",
    category: "proto",
    tag: "Precision",
    desc: "Clean tolerances, screw bosses, vents, and labels—iteration-ready.",
    materials: ["PETG", "ABS"],
    leadTime: "3–6 days",
    highlight: "Tolerance tuned",
    image: "",
  },
  {
    id: "jig-fixture",
    name: "Jigs & Fixtures",
    category: "proto",
    tag: "Industrial",
    desc: "Production aids for alignment, drilling, assembly, and repeatability.",
    materials: ["PETG", "ABS"],
    leadTime: "4–8 days",
    highlight: "Repeatable accuracy",
    image: "",
  },
];

const easeCine = [0.22, 1, 0.36, 1];

function Badge({ children, tone = "orange" }) {
  const cls =
    tone === "orange"
      ? "bg-orange-500/15 text-orange-200 border-orange-500/30"
      : tone === "green"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/30"
      : "bg-white/10 text-white/80 border-white/15";
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition " +
        (active
          ? "bg-orange-500/15 border-orange-500/40 text-orange-100"
          : "border-white/10 text-white/70 hover:border-orange-500/30 hover:text-white")
      }
    >
      {children}
    </button>
  );
}

function GlowBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/18 blur-3xl" />
      <div className="absolute -bottom-56 right-[-120px] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute top-24 left-[-160px] h-[420px] w-[420px] rounded-full bg-white/6 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.8))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
    </div>
  );
}

function ProductCard({ p, onOpen }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(p)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: easeCine }}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(249,115,22,0.22),transparent_70%)]" />
      </div>

      <div className="relative h-44 overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-white/10 to-white/0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <Badge>{p.tag}</Badge>
        </div>
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-lg font-semibold tracking-tight truncate">{p.name}</div>
            <div className="text-xs text-white/60 truncate">{p.highlight}</div>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white/80 transition group-hover:border-orange-500/30 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-relaxed text-white/70 line-clamp-2">{p.desc}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone="neutral">Lead time: {p.leadTime}</Badge>
          <Badge tone="orange">Materials: {p.materials.slice(0, 2).join(", ")}</Badge>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent" />
    </motion.button>
  );
}

function Modal({ open, onClose, product }) {
  if (!open || !product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ y: 26, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 26, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: easeCine }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
        >
          <div className="absolute inset-0 opacity-70">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/16 blur-3xl" />
          </div>

          <div className="relative grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-3">
                <Badge>{product.tag}</Badge>
                <button
                  onClick={onClose}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white hover:border-orange-500/30"
                >
                  Close
                </button>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight">{product.name}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{product.desc}</p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Lead time</div>
                  <div className="mt-1 text-sm text-white/90">{product.leadTime}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Recommended materials</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.materials.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/75"
                      >
                        <Check className="h-3 w-3" /> {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Finishes</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.finishes.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs text-orange-100"
                      >
                        <Flame className="h-3 w-3" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0" />
              {product.image ? (
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full min-h-[280px] w-full bg-[radial-gradient(90%_70%_at_50%_20%,rgba(255,255,255,0.10),transparent_60%)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="rounded-3xl border border-white/10 bg-black/55 p-5">
                  <div className="text-sm font-medium">Request a Quote</div>
                  <p className="mt-1 text-xs text-white/65">
                    This preview uses a dummy action. Connect this button to your WhatsApp / form.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black hover:bg-orange-400">
                      Get Quote <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm text-white/85 hover:border-orange-500/25">
                      Customise
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/70">
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
                      <div className="text-white/55">File formats</div>
                      <div className="mt-1">STL, STEP, OBJ</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
                      <div className="text-white/55">Turnaround</div>
                      <div className="mt-1">Fast iterations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProductsPagePreview() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [mat, setMat] = useState("Any");
  const [finish, setFinish] = useState("Any");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PRODUCT_DATA.filter((p) => {
      const catOk = cat === "all" ? true : p.category === cat;
      const qOk = !query
        ? true
        : [p.name, p.desc, p.tag, p.highlight].join(" ").toLowerCase().includes(query);
      const matOk = mat === "Any" ? true : p.materials.includes(mat);
      const finishOk = finish === "Any" ? true : p.finishes.includes(finish);
      return catOk && qOk && matOk && finishOk;
    });
  }, [cat, q, mat, finish]);

  function onOpen(p) {
    setSelected(p);
    setOpen(true);
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <GlowBg />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCine }}
          className="grid gap-8 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs text-orange-100">
              <Flame className="h-4 w-4" />
              Molten Precision • Product Catalogue
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Products built with <span className="text-orange-400">precision</span>
              <span className="text-white/60">.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Explore our products that sell quality, tailored to exceed expectations. Each item is a testament to our commitment to precision, durability, and aesthetic excellence.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black hover:bg-orange-400">
                Get in touch with us <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-6 py-3 text-sm text-white/85 hover:border-orange-500/25">
                Request Custom Build
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Capability Snapshot</div>
                <Badge tone="green">Studio-grade</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="text-xs text-white/55">Materials</div>
                  <div className="mt-1 font-medium">30+ materials</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="text-xs text-white/55">Finishes</div>
                  <div className="mt-1 font-medium">Plain • UV Resin Coat</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="text-xs text-white/55">Categories</div>
                  <div className="mt-1 font-medium">Decor • Prototypes</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="text-xs text-white/55">Workflow</div>
                  <div className="mt-1 font-medium">Iterate fast</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <Pill key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
                    <Icon className="h-4 w-4 opacity-80" />
                    {c.label}
                  </Pill>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, tags, use-cases…"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-500/35"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={mat}
                  onChange={(e) => setMat(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 outline-none focus:border-orange-500/35"
                >
                  <option className="bg-black" value="Any">Any material</option>
                  {MATERIALS.map((m) => (
                    <option className="bg-black" key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 outline-none focus:border-orange-500/35"
                >
                  <option className="bg-black" value="Any">Any finish</option>
                  {FINISHES.map((f) => (
                    <option className="bg-black" key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-white/60">
          <div className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Showing <span className="text-white/85">{filtered.length}</span> items
          </div>
          <div className="hidden md:block">Click a product card to open details.</div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <div className="relative p-7 md:p-10">
            <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-orange-500/14 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Want something that doesn’t exist yet?
                </h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Stop trying to force-fit random STL files. Tell us your dimensions, constraints, and purpose.
                  We’ll build it properly.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/65">
                  <Badge tone="neutral">Rapid iterations</Badge>
                  <Badge tone="neutral">Engineering-first</Badge>
                  <Badge tone="neutral">Clean finishing</Badge>
                </div>
              </div>
              <div className="md:col-span-4 md:text-right">
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black hover:bg-orange-400 md:w-auto">
                  Start a Custom Project <ArrowRight className="h-4 w-4" />
                </button>
                <div className="mt-3 text-xs text-white/55">Connect this CTA to your form / WhatsApp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} product={selected} />
    </div>
  );
}