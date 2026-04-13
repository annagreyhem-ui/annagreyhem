import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Flipbook demo / starter
 *
 * Replace the `book` object with your own content.
 * Each entry in `pages` is one inner page.
 * The component always shows double-page spreads after the cover.
 */
const book = {
  title: "Mein Buch",
  subtitle: "Web-Flipbook Demo",
  author: "Dein Name",
  coverTitle: "Mein Buch",
  coverSubtitle: "Eine klickbare Buchansicht für das Web",
  spineLabel: "MEIN BUCH",
  backText:
    "Hier kann ein Klappentext, Impressum oder eine kurze Beschreibung stehen.",
  pages: [
    {
      title: "Vorwort",
      body:
        "Das ist eine Beispielseite. Ich habe dir eine Website-Vorlage gebaut, die wie ein Buch aussieht und sich per Klick in Doppelseiten durchblättern lässt.",
    },
    {
      title: "Kapitel 1",
      body:
        "Ersetze diese Inhalte später durch den Text aus deiner Word-Datei oder durch exportierte Seitenbilder.",
    },
    {
      title: "Kapitel 2",
      body:
        "Das Layout zeigt immer zwei Innenseiten gleichzeitig – links und rechts, wie bei einem echten aufgeschlagenen Buch.",
    },
    {
      title: "Kapitel 3",
      body:
        "Das Cover wird separat dargestellt. Am Ende gibt es außerdem eine Rückseite. Der Mittelsteg simuliert einen Buchrücken.",
    },
    {
      title: "Bilder statt Text",
      body:
        "Falls du lieber exakte Word-Seiten behalten willst, kannst du jede Seite als Bild oder PDF-Seite exportieren und hier einbauen.",
    },
    {
      title: "Fertig für die Website",
      body:
        "Diese Vorlage ist ideal als Startpunkt. Sobald du mir die Datei gibst, kann sie mit deinen echten Inhalten befüllt werden.",
    },
  ],
};

function pageNumberLabel(index) {
  return String(index + 1).padStart(2, "0");
}

function chunkIntoSpreads(pages) {
  const spreads = [];
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push([pages[i] ?? null, pages[i + 1] ?? null]);
  }
  return spreads;
}

function PaperPage({ page, side, index }) {
  return (
    <div
      className={`relative flex h-[58vh] min-h-[420px] w-full flex-col overflow-hidden bg-[#fffdf8] p-8 md:p-10 ${
        side === "left" ? "rounded-l-2xl" : "rounded-r-2xl"
      }`}
      style={{
        boxShadow:
          side === "left"
            ? "inset -18px 0 30px rgba(0,0,0,0.06)"
            : "inset 18px 0 30px rgba(0,0,0,0.06)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{
        backgroundImage:
          "linear-gradient(rgba(120,120,120,0.06) 1px, transparent 1px)",
        backgroundSize: "100% 1.9rem",
      }} />

      {page ? (
        <>
          <div className="relative z-10 mb-6 border-b border-stone-200 pb-4">
            <div className="text-xs uppercase tracking-[0.25em] text-stone-500">
              {side === "left" ? "Linke Seite" : "Rechte Seite"}
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-stone-800 md:text-3xl">
              {page.title}
            </h2>
          </div>
          <div className="relative z-10 flex-1 text-[15px] leading-8 text-stone-700 md:text-base">
            {page.body}
          </div>
          <div className="relative z-10 mt-6 text-sm text-stone-500">
            Seite {pageNumberLabel(index)}
          </div>
        </>
      ) : (
        <div className="relative z-10 flex h-full items-center justify-center text-stone-300">
          Leerseite
        </div>
      )}
    </div>
  );
}

function Cover() {
  return (
    <div className="relative mx-auto h-[62vh] min-h-[460px] w-full max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900 shadow-2xl">
      <div className="absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-black/35 to-white/5" />
      <div className="absolute left-10 top-0 h-full w-10 bg-gradient-to-r from-black/35 via-white/10 to-transparent" />
      <div className="absolute inset-y-0 left-16 w-px bg-white/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%)]" />
      <div className="relative flex h-full flex-col justify-between p-10 md:p-14">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-stone-100">
            <BookOpen className="h-4 w-4" />
            Flipbook
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {book.coverTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-200 md:text-lg">
            {book.coverSubtitle}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-stone-300">Autor</div>
            <div className="mt-2 text-xl text-white">{book.author}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-right backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.25em] text-stone-300">Buchrücken</div>
            <div className="mt-1 text-sm font-medium text-white">{book.spineLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackCover() {
  return (
    <div className="relative mx-auto h-[62vh] min-h-[460px] w-full max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl">
      <div className="absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-black/10 to-transparent" />
      <div className="absolute inset-y-0 right-16 w-px bg-stone-400/30" />
      <div className="relative flex h-full flex-col justify-between p-10 md:p-14">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-stone-500">Rückseite</div>
          <h2 className="mt-4 text-3xl font-semibold text-stone-800 md:text-4xl">Klappentext</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 md:text-lg">
            {book.backText}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-stone-300 pt-5 text-sm text-stone-500">
          <span>{book.title}</span>
          <span>{book.author}</span>
        </div>
      </div>
    </div>
  );
}

function Spread({ leftPage, rightPage, spreadIndex }) {
  const leftIndex = spreadIndex * 2;
  const rightIndex = spreadIndex * 2 + 1;

  return (
    <div className="mx-auto flex w-full max-w-6xl items-stretch justify-center rounded-[28px] bg-stone-300/30 p-3 shadow-2xl md:p-4">
      <div className="grid w-full grid-cols-[1fr_16px_1fr] overflow-hidden rounded-[24px] bg-stone-100">
        <PaperPage page={leftPage} side="left" index={leftIndex} />
        <div className="relative bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/10" />
          <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12),transparent_60%)] opacity-80" />
        </div>
        <PaperPage page={rightPage} side="right" index={rightIndex} />
      </div>
    </div>
  );
}

export default function FlipbookWebsite() {
  const spreads = useMemo(() => chunkIntoSpreads(book.pages), []);
  const totalViews = spreads.length + 2; // cover + spreads + back cover
  const [view, setView] = useState(0);

  const canGoBack = view > 0;
  const canGoForward = view < totalViews - 1;

  const currentLabel =
    view === 0
      ? "Cover"
      : view === totalViews - 1
      ? "Rückseite"
      : `Doppelseite ${view} von ${totalViews - 2}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_30%),linear-gradient(180deg,#d6d3d1_0%,#a8a29e_100%)] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-stone-700">
              Interaktives Buch
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900 md:text-5xl">
              {book.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-700 md:text-lg">
              Buchoptik für Webseiten mit Cover, Doppelseiten, Buchrücken-Anmutung und Klick-Navigation.
            </p>
          </div>

          <Card className="rounded-3xl border-stone-300/70 bg-white/70 backdrop-blur-sm">
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => setView((v) => Math.max(0, v - 1))}
                disabled={!canGoBack}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Zurück
              </Button>
              <div className="min-w-[170px] text-center text-sm font-medium text-stone-700">
                {currentLabel}
              </div>
              <Button
                className="rounded-2xl"
                onClick={() => setView((v) => Math.min(totalViews - 1, v + 1))}
                disabled={!canGoForward}
              >
                Weiter
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4 px-1">
          <div className="text-sm text-stone-800">
            Ansicht: <span className="font-semibold">{currentLabel}</span>
          </div>
          <button
            onClick={() => setView(0)}
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-400/50 bg-white/60 px-4 py-2 text-sm text-stone-700 shadow-sm transition hover:bg-white"
          >
            <Download className="h-4 w-4" />
            Zum Cover
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/15 p-3 backdrop-blur-md md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, rotateY: view % 2 === 0 ? -12 : 12, scale: 0.985 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: view % 2 === 0 ? 12 : -12, scale: 0.985 }}
              transition={{ duration: 0.32 }}
              className="[perspective:1400px]"
            >
              {view === 0 ? (
                <Cover />
              ) : view === totalViews - 1 ? (
                <BackCover />
              ) : (
                <Spread
                  leftPage={spreads[view - 1][0]}
                  rightPage={spreads[view - 1][1]}
                  spreadIndex={view - 1}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Card className="rounded-3xl bg-white/70">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-stone-900">So nutzt du es</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                Ersetze das Objekt <code>book</code> oben im Code durch deine echten Inhalte.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl bg-white/70">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-stone-900">Mit Word-Datei</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                Entweder Text aus Word übernehmen oder jede Seite als Bild/PDF exportieren und seitenweise einbauen.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl bg-white/70">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-stone-900">Nächster Schritt</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                Wenn du mir deine Datei gibst, lässt sich diese Vorlage direkt mit deinem echten Buchinhalt befüllen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
