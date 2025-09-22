import React, { useState } from "react";

// --- Design tokens ---
const brand = {
  wine: "#8B1A1A",
  bg: "#0d0d0d",
  panel: "#151515",
  subtle: "#1e1e1e",
  softText: "#cfcfcf",
  hardText: "#f4f4f4",
  border: "#2a2a2a",
  positive: "#17a34a",
  caution: "#eab308",
  negative: "#ef4444",
};

function Badge({ score, label }: { score: number; label: string }) {
  // Clamp
  const s = Math.max(0, Math.min(100, score));
  const gradient = {
    background: `conic-gradient(${brand.wine} ${s * 3.6}deg, ${brand.subtle} 0deg)`,
  } as React.CSSProperties;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 rounded-full" style={gradient}>
        <div className="absolute inset-1 rounded-full flex items-center justify-center bg-black text-[11px] font-semibold text-white">
          {s}
        </div>
      </div>
      <div className="text-xs text-gray-300">
        <div className="font-semibold text-white leading-none">Trust</div>
        <div className="opacity-70 leading-none mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function KPI({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div className="bg-[color:var(--panel)] border border-[color:var(--border)] rounded-2xl px-4 py-3">
      <div className="text-[11px] tracking-wide uppercase text-gray-400">{title}</div>
      <div className="text-xl font-semibold text-white mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}

function Table({ columns, rows }: { columns: string[]; rows: any[] }) {
  return (
    <div className="overflow-hidden border border-[color:var(--border)] rounded-2xl">
      <table className="w-full text-sm">
        <thead className="bg-[color:var(--subtle)] text-gray-300">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="text-left font-medium px-4 py-3 border-b border-[color:var(--border)]">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[color:var(--panel)]">
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-[color:var(--border)] hover:bg-[color:var(--subtle)]/60">
              {Object.values(r).map((cell: any, j) => (
                <td key={j} className="px-4 py-3 align-top text-gray-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-black/70 border border-[color:var(--border)] rounded-2xl p-4 overflow-x-auto text-xs text-gray-200 whitespace-pre-wrap">
      {children}
    </pre>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-white text-lg font-semibold tracking-wide">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function InnovationPulse() {
  const articles = [
    {
      title: "Solid-state battery R&D milestone in Body-in-White plant",
      trust: 86,
      label: "Alta confiabilidad",
      evidence: 12,
      dwell: "1m 42s",
      ctr: "15.4%",
      trend: "+3.1%",
    },
    {
      title: "Lightweight alloys reduce chassis mass by 7% across platform",
      trust: 78,
      label: "Consistente",
      evidence: 9,
      dwell: "1m 10s",
      ctr: "9.2%",
      trend: "+1.8%",
    },
    {
      title: "Hydrogen cell trials begin in Navarra facility",
      trust: 65,
      label: "Requiere revisión",
      evidence: 6,
      dwell: "52s",
      ctr: "6.7%",
      trend: "-0.9%",
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 xl:col-span-8 space-y-4">
        {articles.map((a, i) => (
          <div key={i} className="bg-[color:var(--panel)] border border-[color:var(--border)] rounded-2xl p-4 flex gap-4">
            <div className="flex-1">
              <div className="text-white font-medium text-base">{a.title}</div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-300">
                <Badge score={a.trust} label={a.label} />
                <div className="opacity-70">Evidencias: <span className="text-white">{a.evidence}</span></div>
                <div className="opacity-70">CTR: <span className="text-white">{a.ctr}</span></div>
                <div className="opacity-70">Dwell: <span className="text-white">{a.dwell}</span></div>
                <div className="opacity-70">Tendencia: <span className="text-white">{a.trend}</span></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-[color:var(--wine)] text-white text-xs font-semibold">Leer con trazabilidad</button>
                <button className="px-3 py-1.5 rounded-xl bg-[color:var(--subtle)] text-white/90 text-xs">Guardar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-12 xl:col-span-4 space-y-4">
        <Section title="KPIs del último envío" subtitle="Métricas capturadas automáticamente (aperturas, clics, tiempo de lectura).">
          <div className="grid grid-cols-2 gap-3">
            <KPI title="Open Rate" value="48.2%" />
            <KPI title="CTR" value="11.3%" />
            <KPI title="Dwell medio" value="1m 12s" />
            <KPI title="Rebote" value="7.8%" />
          </div>
        </Section>
        <Section title="Recomendación para el próximo boletín" subtitle="Priorización automática combinando Trust Score + Engagement (doble scoring).">
          <ol className="list-decimal pl-5 text-gray-200 space-y-2">
            <li>Solid-state battery R&D milestone</li>
            <li>Lightweight alloys reduce chassis mass</li>
            <li>Hydrogen cell trials in Navarra facility</li>
          </ol>
        </Section>
      </div>
    </div>
  );
}

function Trazabilidad() {
  const rows = [
    {
      Titular: (
        <div>
          <div className="text-white">Solid-state battery R&D milestone in Body-in-White plant</div>
          <div className="text-[11px] text-gray-400 mt-1">Fuente principal: Nature Energy · 2025-08-12</div>
        </div>
      ),
      Trust: <Badge score={86} label="Alta confiabilidad" />,
      Evidencias: <span className="text-white">12</span>,
      Etiquetas: (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">battery-tech</span>
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">materials</span>
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">R&D</span>
        </div>
      ),
      Estado: <span className="text-white">Verificado</span>,
    },
    {
      Titular: (
        <div>
          <div className="text-white">Lightweight alloys reduce chassis mass by 7%</div>
          <div className="text-[11px] text-gray-400 mt-1">Fuente principal: SAE International · 2025-08-09</div>
        </div>
      ),
      Trust: <Badge score={78} label="Consistente" />,
      Evidencias: <span className="text-white">9</span>,
      Etiquetas: (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">lightweighting</span>
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">alloys</span>
        </div>
      ),
      Estado: <span className="text-white">Verificado</span>,
    },
    {
      Titular: (
        <div>
          <div className="text-white">Hydrogen cell trials in Navarra facility</div>
          <div className="text-[11px] text-gray-400 mt-1">Fuente principal: Tech.eu · 2025-08-03</div>
        </div>
      ),
      Trust: <Badge score={65} label="Requiere revisión" />,
      Evidencias: <span className="text-white">6</span>,
      Etiquetas: (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">hydrogen</span>
          <span className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200">pilot</span>
        </div>
      ),
      Estado: <span className="text-white">En revisión</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <Section title="Explorador de contenidos verificados" subtitle="Lista auditable por fechas, tema, fuente y estado de verificación.">
        <Table columns={["Titular", "Trust", "Evidencias", "Etiquetas", "Estado"]} rows={rows} />
      </Section>

      <Section title="Evidencia y trazabilidad" subtitle="Resumen explicativo de por qué el contenido ha obtenido ese Trust Score.">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 bg-[color:var(--panel)] border border-[color:var(--border)] rounded-2xl p-4">
            <div className="text-white font-medium">Audit trail</div>
            <ol className="mt-3 text-sm text-gray-200 space-y-2">
              <li>• Extracción de entidades y claims (BERT/RoBERTa)</li>
              <li>• Búsqueda semántica en bases verificadas (journals, repositorios públicos)</li>
              <li>• Evaluación de sesgo/actualidad de la fuente</li>
              <li>• Cálculo de confianza y explicación en lenguaje natural</li>
            </ol>
          </div>
          <div className="col-span-12 lg:col-span-5 bg-[color:var(--panel)] border border-[color:var(--border)] rounded-2xl p-4">
            <div className="text-white font-medium">Mapa de evidencias</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Nature Energy","UPF Review","SAE","Reuters","DOE","Scopus"].map((t,i) => (
                <span key={i} className="px-2 py-1 rounded-lg bg-[color:var(--subtle)] text-gray-200 text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Scoring() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 xl:col-span-7 space-y-6">
        <Section title="Trust Score (API Narratio)" subtitle="Se calcula automáticamente en cinco etapas y devuelve un score con explicación y trazabilidad.">
          <div className="grid grid-cols-2 gap-4">
            <KPI title="Precisión interna" value=">85%" hint="Benchmarks con FEVER/LIAR" />
            <KPI title="Umbral mínimo" value=">=60" hint="Para entrar en el boletín" />
          </div>
          <Code>{`{
  "id": "cnt_93481",
  "trustScore": 86,
  "verdict": "alta confiabilidad",
  "evidenceCount": 12,
  "explanation": "Coincidencias fuertes en Nature Energy, Reuters y Scopus.",
  "sources": ["nature.com", "reuters.com", "scopus.com"],
  "timestamp": "2025-09-20T10:31:22Z"
}`}</Code>
        </Section>
        <Section title="Engagement Score (Innovation Pulse)" subtitle="Se obtiene automáticamente del comportamiento del lector: aperturas, clics, tiempo de lectura y tendencia.">
          <Table
            columns={["Contenido", "CTR", "Dwell", "Tendencia", "Score"]}
            rows={[
              {
                Contenido: <span className="text-white">Solid-state battery R&D milestone</span>,
                CTR: <span className="text-white">15.4%</span>,
                Dwell: <span className="text-white">1m 42s</span>,
                Tendencia: <span className="text-white">+3.1%</span>,
                Score: <span className="text-white">81</span>,
              },
              {
                Contenido: <span className="text-white">Lightweight alloys reduce chassis mass</span>,
                CTR: <span className="text-white">9.2%</span>,
                Dwell: <span className="text-white">1m 10s</span>,
                Tendencia: <span className="text-white">+1.8%</span>,
                Score: <span className="text-white">72</span>,
              },
            ]}
          />
        </Section>
      </div>
      <div className="col-span-12 xl:col-span-5 space-y-6">
        <Section title="Ranking adaptativo" subtitle="Reordenación de temas priorizando interés real, manteniendo siempre un mínimo de confiabilidad.">
          <div className="bg-[color:var(--panel)] border border-[color:var(--border)] rounded-2xl p-4 space-y-3">
            <div className="text-sm text-gray-200">Fórmula sugerida</div>
            <Code>{`rankScore = 0.6 * engagementScore + 0.4 * trustScore
// Con hard-gates: trustScore >= 60`}</Code>
            <div className="text-sm text-gray-300">Resultado para el próximo envío:</div>
            <ol className="list-decimal pl-5 text-gray-200 space-y-1">
              <li>Solid-state battery (rank 84.6)</li>
              <li>Lightweight alloys (rank 75.2)</li>
              <li>Hydrogen cell trials (rank 63.0)</li>
            </ol>
          </div>
        </Section>
        <Section title="Controles" subtitle="Ajustes opcionales por parte del equipo de comunicación (pesos y exclusiones).">
          <div className="grid grid-cols-2 gap-3">
            <KPI title="Peso Engagement" value="60%" />
            <KPI title="Peso Trust" value="40%" />
            <KPI title="Mínimo Trust" value="60" />
            <KPI title="Excluir temas" value="2" hint="Hydrogen (baja prioridad), ESG genérico" />
          </div>
        </Section>
      </div>
    </div>
  );
}

function APIView() {
  return (
    <div className="space-y-6">
      <Section title="Integración por API" subtitle="Endpoints principales para verificación y reporting. Plug & play en CMS/newsletters.">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-white font-medium">POST /v1/verify</div>
            <Code>{`curl -X POST https://api.narratio.ai/v1/verify \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "<html or markdown>",
    "metadata": {"source":"Gestamp-innovation-pulse","lang":"es"}
  }'`}</Code>
            <div className="text-white font-medium mt-4">Respuesta</div>
            <Code>{`{
  "id": "cnt_93481",
  "trustScore": 86,
  "verdict": "alta confiabilidad",
  "evidence": [{"title":"Nature Energy...","url":"https://..."}],
  "badges": {"html":"<trust-badge score=86></trust-badge>"}
}`}</Code>
          </div>
          <div className="space-y-3">
            <div className="text-white font-medium">POST /v1/report</div>
            <Code>{`curl -X POST https://api.narratio.ai/v1/report \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "period": {"from":"2025-09-01","to":"2025-09-15"},
    "metrics": ["trustScore","evidenceCount","openRate","ctr","dwell"]
  }'`}</Code>
            <div className="text-white font-medium mt-4">Widget embebible</div>
            <Code>{`<script src="https://cdn.narratio.ai/badge.js"></script>
<div class="narratio-badge" data-score="86" data-explanation="12 evidencias"> </div>`}</Code>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<"pulse" | "traz" | "score" | "api">("pulse");

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--panel", brand.panel);
    root.style.setProperty("--subtle", brand.subtle);
    root.style.setProperty("--border", brand.border);
    root.style.setProperty("--wine", brand.wine);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: brand.bg }}>
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[color:var(--border)] bg-black/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full" style={{ background: brand.wine }} />
            <div className="text-white font-semibold tracking-wide">Narratio</div>
            <span className="text-gray-500 text-sm ml-3">Gestamp Demo</span>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={() => setTab("pulse")} className={`px-3 py-1.5 rounded-xl ${tab === "pulse" ? "bg-[color:var(--wine)] text-white" : "text-gray-300 hover:text-white"}`}>Innovation Pulse</button>
            <button onClick={() => setTab("traz")} className={`px-3 py-1.5 rounded-xl ${tab === "traz" ? "bg-[color:var(--wine)] text-white" : "text-gray-300 hover:text-white"}`}>Trazabilidad</button>
            <button onClick={() => setTab("score")} className={`px-3 py-1.5 rounded-xl ${tab === "score" ? "bg-[color:var(--wine)] text-white" : "text-gray-300 hover:text-white"}`}>Evaluation & Scoring</button>
            <button onClick={() => setTab("api")} className={`px-3 py-1.5 rounded-xl ${tab === "api" ? "bg-[color:var(--wine)] text-white" : "text-gray-300 hover:text-white"}`}>API</button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Intro */}
        <div className="bg-[color:var(--panel)] border border-[color:var(--border)] rounded-2xl p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-white text-xl font-semibold tracking-wide">Storytelling verificado para Innovation Pulse</h1>
              <p className="text-gray-400 mt-1 max-w-3xl">Doble scoring integrado: Trust Score (API Narratio) + Engagement Score (comportamiento real en boletines). Diseño editorial-tech, claro y auditable.</p>
            </div>
            <div className="flex items-center gap-3">
              <KPI title="Últimos 15 días" value="214 fuentes" />
              <KPI title="Noticias analizadas" value="128" />
            </div>
          </div>
        </div>

        {tab === "pulse" && <InnovationPulse />}
        {tab === "traz" && <Trazabilidad />}
        {tab === "score" && <Scoring />}
        {tab === "api" && <APIView />}

        <footer className="text-[11px] text-gray-500 pt-2 pb-8">© 2025 Narratio — UI demo. Paleta: vino #8B1A1A, neutros cálidos. Tipografía sans, interlineado generoso.</footer>
      </main>
    </div>
  );
}
