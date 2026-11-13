import Image from "next/image";
import type { Dictionary, Locale } from "@/i18n";
import { landingPath, localePath, otherLocale } from "@/i18n";
import { Footer } from "@/components/Footer";
import { CallBar } from "@/components/site/CallBar";
import { SiteNav, telHref } from "@/components/site/SiteNav";
import { ArrowIcon, FlagIcon, PhoneIcon } from "@/components/site/icons";
import heroImg from "../../../public/images/hero-solar-homes.jpg";
import cardPayments from "../../../public/images/card-powerbill.jpg";
import cardInstaller from "../../../public/images/card-installer.jpg";
import cardPaperwork from "../../../public/images/card-paperwork.jpg";
import cardSales from "../../../public/images/card-pushy-sales.jpg";
import { Quiz } from "./Quiz";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const cardImages = [cardPayments, cardInstaller, cardPaperwork, cardSales];

/** Questionnaire homepage (`/` and `/es`). The full landing page lives at /home. */
export function QuizPage({ locale, dict }: Props) {
  const s = dict.site;
  const toggleLocale = otherLocale(locale);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteNav
        overlay
        locale={locale}
        dict={dict}
        toggleHref={localePath(toggleLocale)}
        toggleLocale={toggleLocale}
        links={[
          { href: localePath(locale), label: s.nav.home, active: true },
          { href: "#how", label: s.nav.how },
          { href: "#problems", label: s.nav.who },
          { href: "#quiz", label: s.nav.check },
        ]}
      />

      <main>
        {/* Hero */}
        <section className="relative flex items-center justify-center overflow-hidden bg-[#1c2c40] text-center text-white md:min-h-svh">
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            placeholder="blur"
            className="object-cover object-[68%_100%] [filter:saturate(.85)] md:object-[center_62%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,39,.72)_0%,rgba(11,31,58,.52)_48%,rgba(7,20,39,.58)_82%,#f7f4ee_100%)] md:bg-[linear-gradient(180deg,rgba(7,20,39,.68)_0%,rgba(11,31,58,.48)_45%,rgba(7,20,39,.62)_80%,#f7f4ee_100%)]"
          />
          <div className="relative z-[2] max-w-[980px] px-5 pb-[190px] pt-28 md:px-6 md:pb-[120px] md:pt-[130px]">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-cream/90 md:mb-[22px] md:text-sm">
              {s.areas}
            </p>
            {locale === "es" ? (
              <h1 className="font-display text-[clamp(52px,8.6vw,124px)] font-semibold leading-[1.06] [text-shadow:0_2px_18px_rgba(0,0,0,.28)]">
                {(() => {
                  const l1 = s.hero.titleLine1;
                  const cut = l1.lastIndexOf(" ");
                  const a = s.hero.titleAccent;
                  const ac = a.indexOf(" ");
                  const grad = "text-gold-400 pb-[0.06em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]";
                  return (
                    <>
                      {l1.slice(0, cut)}
                      <br className="md:hidden" />
                      <span className="hidden md:inline"> </span>
                      {l1.slice(cut + 1)}
                      <br className="hidden md:inline" />
                      <span className="md:hidden"> </span>
                      <span className={grad}>{ac > 0 ? a.slice(0, ac) : a}</span>
                      <br className="md:hidden" />
                      <span className="hidden md:inline"> </span>
                      {ac > 0 && <span className={grad}>{a.slice(ac + 1)}</span>}
                    </>
                  );
                })()}
              </h1>
            ) : (
              <h1 className="font-display text-[clamp(52px,8.6vw,124px)] font-semibold leading-[1.06] [text-shadow:0_2px_18px_rgba(0,0,0,.28)]">
                {s.hero.titleLine1}
                <br />
                <span className="inline-block pb-[0.06em] text-gold-400">{s.hero.titleAccent}</span>
              </h1>
            )}
            <p className="mx-auto mb-7 mt-5 max-w-[620px] text-[17px] text-cream/90 md:mb-9 md:mt-[26px] md:text-[clamp(17px,1.6vw,21px)]">
              {s.hero.subtitle}
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3.5 px-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:px-0">
              <a href="#quiz" className="btn btn-primary">
                {s.hero.ctaCheck} <span aria-hidden="true">→</span>
              </a>
              <a href={telHref} className="btn btn-ghost backdrop-blur-sm">
                <PhoneIcon />
                {s.hero.ctaCall}
              </a>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <div className="bg-ink text-cream">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2.5 px-[18px] py-5 text-[12px] font-medium tracking-[0.06em] md:gap-x-10 md:gap-y-3 md:px-6 md:py-6 md:text-sm">
            {s.trust.map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-gold-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Problem cards */}
        <section id="problems" className="scroll-mt-24 pb-20 pt-20 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="kicker">{s.problems.kicker}</p>
            <h2 className="font-display mb-3.5 text-[clamp(36px,4.6vw,60px)] leading-[0.98]">
              {s.problems.titleStart} <span className="text-gold-600">{s.problems.titleAccent}</span>
            </h2>
            <p className="max-w-[620px] text-[19px] text-muted">{s.problems.subtitle}</p>
            <div className="mt-11 grid gap-[22px] sm:grid-cols-2 sm:gap-[26px] lg:grid-cols-4">
              {s.problems.cards.map((title, i) => (
                <a
                  key={title}
                  href="#quiz"
                  className="card-outline group flex flex-col overflow-hidden rounded-sm bg-white transition hover:border-ink/40"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-[rgba(11,31,58,0.12)] sm:aspect-[4/3]">
                    <Image
                      src={cardImages[i]}
                      alt={s.problems.cardAlts[i]}
                      fill
                      sizes="(min-width:1024px) 270px, (min-width:640px) 50vw, 100vw"
                      quality={70}
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 grid h-[42px] w-[42px] place-items-center rounded-sm border border-[rgba(11,31,58,0.2)] bg-white">
                      <FlagIcon />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-[22px] pt-5">
                    <h3 className="font-display flex-1 text-[23px] leading-[1.12]">{title}</h3>
                    <div className="mt-[18px] flex items-center justify-between text-[15px] font-medium text-gold-600">
                      {s.problems.go}
                      <span className="grid h-[42px] w-[42px] place-items-center rounded-sm border border-ink bg-ink text-cream">
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Questionnaire, right after the problem cards */}
        <section id="quiz" aria-label={dict.quiz.badge} className="scroll-mt-4 px-4 pb-28 md:px-6">
          <div className="mx-auto max-w-[760px]">
            <Quiz locale={locale} dict={dict} />
            <p className="mt-5 text-center text-[13px] text-muted">{s.quizReassure}</p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="relative scroll-mt-24 border-t border-[rgba(11,31,58,0.10)] bg-paper pb-28 pt-20 md:pt-24">
          <div className="mx-auto max-w-[1180px] px-6 text-center">
            <p className="kicker justify-center">{s.how.kicker}</p>
            <h2 className="font-display mb-3.5 text-[clamp(36px,4.6vw,60px)] leading-[0.98]">
              {s.how.titleStart} <span className="text-gold-600">{s.how.titleAccent}</span>
            </h2>
            <p className="mx-auto max-w-[620px] text-[19px] text-muted">{s.how.subtitle}</p>
            <ol className="relative mt-[50px] grid gap-[38px] md:grid-cols-3 md:gap-[30px]">
              <span
                aria-hidden="true"
                className="absolute left-[16%] right-[16%] top-11 hidden border-t border-gold-400/60 md:block"
              />
              {s.how.steps.map((step, i) => (
                <li key={step.title} className="relative z-[1] px-2.5">
                  <div className="font-display mx-auto mb-[22px] grid h-[88px] w-[88px] place-items-center rounded-sm border border-gold-400 text-[38px] text-ink">
                    {i + 1}
                  </div>
                  <h3 className="font-display mb-2.5 text-[27px] leading-[1.1]">{step.title}</h3>
                  <p className="mx-auto max-w-[300px] text-[17px] text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing band */}
        <section className="relative overflow-hidden bg-ink px-5 py-24 text-center text-cream md:px-6 md:py-[120px]">
          <Image
            src={heroImg}
            alt=""
            fill
            sizes="100vw"
            quality={50}
            className="object-cover object-[center_70%] opacity-[0.18] [filter:grayscale(.4)]"
          />
          <div className="relative z-[1]">
            <p className="kicker justify-center !text-[#f7a531]">{s.closing.kicker}</p>
            <h2 className="font-display mx-auto mb-[22px] max-w-[1000px] text-[clamp(42px,6.4vw,92px)] leading-[0.98]">
              {s.closing.titleStart} <span className="text-gold-400">{s.closing.titleAccent}</span>
            </h2>
            <p className="mb-9 text-[19px] opacity-85">{s.closing.body}</p>
            <div className="flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#quiz" className="btn btn-primary">
                {s.hero.ctaCheck} <span aria-hidden="true">→</span>
              </a>
              <a href={telHref} className="btn btn-ghost">
                <PhoneIcon />
                {s.hero.ctaCall}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} moreLink={{ href: landingPath(locale), label: s.learnMore }} />
      <CallBar dict={dict} checkHref="#quiz" />
    </div>
  );
}
