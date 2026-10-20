import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { photo, COLLECTION, MORE, TABLE_FEATURED, TABLE_MORE } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fábio Passos – Cutelaria em Aço Damasco | Canoas, RS" },
      {
        name: "description",
        content:
          "Peças únicas em aço damasco com detalhes em ouro, forjadas à mão em Canoas para colecionadores e mestres da cozinha.",
      },
      { property: "og:title", content: "Fábio Passos – A arte de forjar o aço damasco" },
      {
        property: "og:description",
        content: "Facas artesanais em aço damasco forjadas à mão em Canoas, RS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Início", "#inicio"],
  ["Biografia", "#biografia"],
  ["Coleção", "#colecao"],
  ["Na Mesa", "#na-mesa"],
  ["Reconhecimento", "#reconhecimento"],
  ["Contato", "#contato"],
] as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const delay = (i: number) => ({ transitionDelay: `${i * 120}ms` });

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
      {children}
    </p>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Photo = ({ n, className = "", alt = "Faca de Fábio Passos" }: { n: number; className?: string; alt?: string }) => (
    <button
      type="button"
      onClick={() => setLightbox(n)}
      className={`photo-hover block h-full w-full cursor-zoom-in ${className}`}
      aria-label="Ampliar foto"
    >
      <img src={photo(n)} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </button>
  );

  return (
    <div className="overflow-x-hidden">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-foreground/15 bg-background/25 px-5 py-3 shadow-2xl shadow-background/50 backdrop-blur-xl backdrop-saturate-150 md:px-7">
          <a href="#inicio" className="leading-tight">
            <span className="block font-display text-lg tracking-[0.2em] text-gold">FÁBIO PASSOS</span>
            <span className="block text-[0.55rem] tracking-[0.3em] text-muted-foreground">CUTELARIA · AÇO DAMASCO</span>
          </a>
          <ul className="hidden gap-7 lg:flex">
            {NAV.map(([l, h], i) => (
              <li key={h}>
                <a href={h} className={`nav-link text-[0.68rem] uppercase tracking-[0.2em] hover:text-gold ${i === 0 ? "text-gold" : "text-foreground"}`}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contato" className="btn-lift hidden rounded-full border border-foreground/40 px-5 py-2 text-[0.68rem] uppercase tracking-[0.2em] md:inline-block">
            Entrar em contato
          </a>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="text-gold" /> : <Menu className="text-gold" />}
          </button>
        </nav>
        {open && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border bg-background/95 p-6 backdrop-blur-md lg:hidden">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 text-sm uppercase tracking-[0.2em] hover:text-gold">
                {l}
              </a>
            ))}
            <a href="#contato" onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-gold-gradient py-3 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground">
              Entrar em contato
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:pt-40 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="hero-in" style={{ animationDelay: "200ms" }}>
            <Eyebrow>Cuteleiro · Canoas, RS</Eyebrow>
          </div>
          <h1 className="hero-in mt-6 text-5xl font-semibold leading-[1.05] text-ivory md:text-7xl" style={{ animationDelay: "500ms" }}>
            A arte de forjar o <span className="text-gold-gradient">aço damasco</span>
          </h1>
          <div className="hero-in mt-8 h-px w-40 bg-gradient-to-r from-gold/70 to-transparent" style={{ animationDelay: "900ms" }} />
          <p className="hero-in mt-8 max-w-lg font-serif text-xl leading-relaxed text-muted-foreground md:text-2xl" style={{ animationDelay: "900ms" }}>
            Peças únicas em aço damasco com detalhes em ouro, forjadas à mão em Canoas para colecionadores e mestres da cozinha.
          </p>
          <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "1300ms" }}>
            <a href="#colecao" className="btn-lift rounded-full bg-gold-gradient px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground">
              Ver coleção
            </a>
            <a href="#biografia" className="btn-lift rounded-full border border-foreground/40 px-6 py-3 text-xs uppercase tracking-[0.18em]">
              Conhecer a história
            </a>
          </div>
          <div className="hero-in mt-12 grid grid-cols-3 gap-4 border-t pt-6 sm:max-w-lg" style={{ animationDelay: "1300ms" }}>
            {[["2012", "Primeiras facas"], ["2020", "Livro Legado de Aço"], ["EUA · Europa", "Peças enviadas"]].map(([a, b]) => (
              <div key={a}>
                <p className="font-display text-lg text-gold md:text-2xl">{a}</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="curtain rounded-3xl border bg-card-gradient p-3">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <Photo n={2} alt="Rifa Especial Nº 500" />
            </div>
            <div className="flex items-baseline gap-3 px-3 py-4">
              <span className="font-display text-gold">01</span>
              <div>
                <p className="text-sm">Rifa Especial Nº 500</p>
                <p className="text-xs text-muted-foreground">Fotografia: Felipe Silva</p>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-[55%] hidden -translate-x-1/3 items-center gap-2 rounded-full border bg-background/90 px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] backdrop-blur md:flex">
            <span className="h-2 w-2 rounded-full bg-ember" /> Camadas de aço sobre aço
          </div>
        </div>
        <div className="ember-line absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent" />
      </section>

      {/* BIOGRAFIA */}
      <section id="biografia" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <figure className="reveal rounded-3xl border bg-card-gradient p-3">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <Photo n={42} alt="Fábio Passos com Rodrigo Sfredo" />
            </div>
            <figcaption className="flex items-center gap-3 px-3 py-4 text-sm">
              <span className="font-display text-gold">42</span> Com Rodrigo Sfredo, na conclusão do curso
            </figcaption>
          </figure>
          <div className="reveal" style={delay(1)}>
            <Eyebrow>Biografia</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-ivory md:text-5xl">Do fogo, do martelo e da bigorna</h2>
            <div className="mt-6 h-px w-24 bg-gold/50" />
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
              <p>Funileiro desde os 16 anos, Fábio Passos mantinha uma oficina de chapeação em Canoas, no Rio Grande do Sul, quando a cutelaria entrou em sua vida, quase por acaso.</p>
              <p>Em 2012, depois de comprar uma faca na Expointer, achou que poderia fazer algo parecido. Foi atrás do aço, começou a experimentar e, do nada, criou quatro facas. Duas foram vendidas a vizinhos do bairro.</p>
              <p>Vieram os cursos de aperfeiçoamento, o contato com cuteleiros de todo o estado e as primeiras encomendas de colecionadores. A oficina automotiva deu lugar à oficina de facas.</p>
              <p>Hoje, ele forja o aço com fogo e martelo, dobrando camadas de aço sobre camadas de aço até o acabamento ficar perfeito. Os cabos são feitos de madeiras e materiais nobres, e as lâminas recebem ornamentos e detalhes em ouro.</p>
            </div>
            <p className="mt-6 font-serif text-xl italic text-gold">O talento de transformar ideias em realidade.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["16 anos", "Funileiro desde cedo", "Começa na funilaria e na chapeação, ofício que o levaria à oficina própria."],
            ["2012", "As primeiras facas", "Depois da Expointer, forja as quatro primeiras facas e vende duas aos vizinhos."],
            ["2020", "Legado de Aço", "Suas lâminas entram na obra que reúne grandes nomes da cutelaria brasileira."],
            ["2025", "Havan Novo Hamburgo", "Uma faca encomendada pelo prefeito Gustavo Finck é entregue a Luciano Hang."],
          ].map(([y, t, d], i) => (
            <div key={y} className="reveal rounded-2xl border bg-card-gradient p-6" style={delay(i)}>
              <p className="flex items-center gap-2 font-display text-2xl text-gold"><span className="text-xs">◆</span>{y}</p>
              <div className="my-4 h-px bg-border" />
              <h3 className="text-sm font-semibold text-ivory">{t}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <blockquote className="reveal mt-16 rounded-3xl border bg-card-gradient px-6 py-14 text-center">
          <span className="font-serif text-5xl text-gold">“</span>
          <p className="mt-2 font-serif text-3xl italic text-ivory md:text-4xl">O que a torna uma arte, é ser exclusiva.</p>
          <div className="mx-auto my-6 h-px w-20 bg-gold/40" />
          <footer className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">Fábio Passos · em entrevista ao ABC+</footer>
        </blockquote>
      </section>

      {/* COLEÇÃO */}
      <section id="colecao" className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal">
          <Eyebrow>Coleção</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-ivory md:text-5xl">Peças de coleção</h2>
          <p className="mt-4 max-w-xl font-serif text-lg text-muted-foreground md:text-xl">
            Cada lâmina é única: camadas de aço dobradas e forjadas até formar padrões irrepetíveis, com cabos em materiais nobres e detalhes em ouro.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {COLLECTION.map((n, i) => (
            <div key={n} className={`reveal rounded-2xl border bg-card-gradient p-2 ${i % 3 === 1 ? "md:mt-8" : ""}`} style={delay(i)}>
              <div className="aspect-[3/4] overflow-hidden rounded-xl">
                <Photo n={n} />
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-20 flex items-center gap-6">
          <h3 className="whitespace-nowrap text-xl tracking-[0.15em] text-gold">MAIS PEÇAS</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>
      </section>
      <div className="marquee -mt-12 overflow-hidden pb-6">
        <div className="marquee-track flex w-max gap-4">
          {[...MORE, ...MORE].map((n, i) => (
            <div key={i} className="w-40 shrink-0 rounded-2xl border bg-card-gradient p-2 md:w-52">
              <div className="aspect-[3/4] overflow-hidden rounded-xl">
                <Photo n={n} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="px-6 pb-16 text-center text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
        Fotografia das peças: Felipe Silva · Francisco Hammer · André Maino · King Knives
      </p>

      {/* NA MESA */}
      <section id="na-mesa" className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal">
          <Eyebrow>Na mesa</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-ivory md:text-5xl">A faca que vai à mesa</h2>
          <p className="mt-4 max-w-xl font-serif text-lg text-muted-foreground md:text-xl">
            As facas de Fábio Passos acompanham a alta culinária e o churrasco em cozinhas, churrasqueiras e mesas de todo o país.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-[repeat(2,15rem)]">
          {TABLE_FEATURED.map((n, i) => (
            <div key={n} className={`reveal rounded-2xl border bg-card-gradient p-2 ${i === 0 ? "col-span-2 md:row-span-2" : ""}`} style={delay(i)}>
              <div className={`overflow-hidden rounded-xl ${i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-square md:aspect-auto md:h-full"}`}>
                <Photo n={n} alt="Faca de Fábio Passos à mesa" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 columns-2 gap-4 md:columns-4">
          {TABLE_MORE.map((n, i) => (
            <div key={n} className="reveal mb-4 break-inside-avoid rounded-2xl border bg-card-gradient p-2" style={delay(i % 4)}>
              <div className="overflow-hidden rounded-xl">
                <Photo n={n} alt="Faca de Fábio Passos à mesa" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECONHECIMENTO */}
      <section id="reconhecimento" className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal">
          <Eyebrow>Reconhecimento</Eyebrow>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-ivory md:text-5xl">Uma faca que chegou à Havan</h2>
        </div>
        <div className="reveal mt-12 grid items-center gap-8 rounded-3xl border bg-card-gradient p-4 md:grid-cols-2 md:p-6">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl">
            <Photo n={43} alt="Entrega da faca a Luciano Hang" />
          </div>
          <div className="space-y-4 px-2 pb-4 text-sm leading-relaxed text-muted-foreground md:pb-0">
            <p>Em 22 de novembro de 2025, na inauguração da Havan em Novo Hamburgo, o empresário Luciano Hang recebeu uma faca de lâmina ornamentada, com seu nome escrito em pingos de ouro.</p>
            <p>A peça foi encomendada a Fábio pelo prefeito Gustavo Finck, que quis a garantia de que o cuteleiro a entregaria pessoalmente.</p>
            <a href="https://www.abcmais.com" target="_blank" rel="noreferrer" className="btn-lift mt-2 inline-block rounded-full border border-foreground/40 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] text-foreground">
              Ler a matéria no ABC+
            </a>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            [44, "Legado de Aço", "Em 2020, suas lâminas foram publicadas na obra organizada por Michel Gruenberg, que reúne grandes nomes da cutelaria brasileira. Desde então, a clientela cresceu.", "text-ivory"],
            [40, "Brasil, EUA e Europa", "Suas peças seguem para colecionadores no Brasil, nos Estados Unidos e na Europa.", "text-gold"],
          ].map(([n, t, d, c], i) => (
            <div key={t as string} className="reveal rounded-3xl border bg-card-gradient p-4 md:p-6" style={delay(i)}>
              <div className="aspect-square overflow-hidden rounded-2xl">
                <Photo n={n as number} alt={t as string} />
              </div>
              <h3 className={`mt-5 text-lg ${c}`}>{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Contato</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-ivory md:text-5xl">Fale com o cuteleiro</h2>
          <div className="mt-6 h-px w-24 bg-gold/50" />
          <p className="mt-6 text-sm text-muted-foreground">As peças são feitas sob encomenda. Cada trabalho leva de dias a semanas, conforme a complexidade.</p>
          <p className="mt-5 text-sm text-muted-foreground">Acompanhe cada novo trabalho no Instagram:</p>
          <a href="https://instagram.com/fabio_passos_cutelaria" target="_blank" rel="noreferrer" className="mt-3 block font-display text-lg text-gold">
            @FABIO_PASSOS_CUTELARIA
          </a>
          <p className="mt-4 font-serif text-xl italic text-gold">Oficina em Canoas, Rio Grande do Sul.</p>
        </div>
        <form
          className="reveal space-y-4 rounded-3xl border bg-card-gradient p-6 md:p-8"
          style={delay(1)}
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const body = `Nome: ${f.get("nome")}\nE-mail: ${f.get("email")}\n\n${f.get("msg")}`;
            window.location.href = `mailto:?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(body)}`;
          }}
        >
          <h3 className="text-lg text-gold">Envie uma mensagem</h3>
          <input name="nome" required placeholder="Seu nome" className="w-full rounded-xl border bg-input/20 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold" />
          <input name="email" type="email" required placeholder="Seu e-mail" className="w-full rounded-xl border bg-input/20 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold" />
          <textarea name="msg" required rows={4} placeholder="Conte sobre a peça que você imagina" className="w-full rounded-xl border bg-input/20 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold" />
          <button className="btn-lift rounded-full bg-gold-gradient px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground">
            Enviar mensagem
          </button>
        </form>
      </section>

      <footer className="border-t px-6 py-12 text-center">
        <p className="font-display text-2xl tracking-[0.2em] text-gold">FÁBIO PASSOS</p>
        <p className="mt-3 text-xs text-muted-foreground">Cutelaria · aço damasco · Canoas, RS</p>
        <p className="mt-3 text-[0.65rem] text-muted-foreground">Fotografia: Felipe Silva, Francisco Hammer, André Maino, King Knives e @guidetischlerjunior</p>
        <p className="mt-3 text-[0.65rem] text-muted-foreground">© 2026 Fábio Passos</p>
      </footer>

      {lightbox !== null && (
        <div className="lightbox-bg fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4" onClick={() => setLightbox(null)}>
          <button className="absolute right-5 top-5 text-gold" aria-label="Fechar"><X /></button>
          <img src={photo(lightbox)} alt="Foto ampliada" className="lightbox-img max-h-[90vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </div>
  );
}
