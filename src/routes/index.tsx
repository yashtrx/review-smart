import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [
      { title: "ReviewSmart - Order Your NFC Review card now" },
      {
        name: "description",
        content:
          "Order NFC review cards for your shop or business. One tap sends customers to your Google review page with no app, typing, or searching. Pay by UPI and order today.",
      },
      {
        name: "application-name",
        content: "ReviewSmart NFC Review Cards",
      },
      { property: "og:title", content: "ReviewSmart - Order Your NFC Review card now" },
      {
        property: "og:description",
        content:
          "One tap and your customer lands on your Google review page. No app, no typing. Order your NFC review card today.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "ReviewSmart NFC Review Card",
          alternateName: "ReviewSmart NFC Review Card",
          description:
            "NFC review cards for businesses that send customers directly to a Google review page with one tap.",
          image: "/logo.png",
          brand: {
            "@type": "Brand",
            name: "ReviewSmart",
          },
          category: "Business cards",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: "160",
            highPrice: "200",
            offerCount: "4",
            availability: "https://schema.org/InStock",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is an NFC Review Card?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A smart card for your counter. When a customer taps it with their phone, their phone opens your Google review page instantly.",
              },
            },
            {
              "@type": "Question",
              name: "Does my customer need to install anything?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Modern smartphones read NFC cards natively, so the tap opens your review link without an app.",
              },
            },
            {
              "@type": "Question",
              name: "How do I order and pay?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Choose your quantity, enter your delivery details, pay by UPI, and send the order on WhatsApp with your payment screenshot.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

/* ---------------- Order config ---------------- */

const PHONE_DISPLAY = "+91 90000 00000";
const PHONE_TEL = "+919000000000";
const WHATSAPP_NUMBER = "919000000000";
const UPI_ID = "suppabhi@jio";
const DELIVERY_FEE = 120;
const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

type Tier = { label: string; min: number; max: number; price: number };

const TIERS: Tier[] = [
  { label: "1 – 15", min: 1, max: 15, price: 200 },
  { label: "16 – 30", min: 16, max: 30, price: 185 },
  { label: "31 – 99", min: 31, max: 99, price: 175 },
  { label: "100+", min: 100, max: Infinity, price: 160 },
];

function tierFor(qty: number): Tier {
  return (
    TIERS.find((t) => qty >= t.min && qty <= t.max) ?? {
      label: "1 – 15",
      min: 1,
      max: 15,
      price: 200,
    }
  );
}

function inr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ---------------- Page ---------------- */

function Index() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("reviewsmart-theme");
    const shouldUseDarkMode =
      savedTheme === "dark" ||
      (savedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(shouldUseDarkMode);
    document.documentElement.classList.toggle("dark", shouldUseDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("reviewsmart-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-body text-foreground">
      <Header isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
      <main>
        <Hero />
        <StepsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */

function Header({
  isDarkMode,
  onDarkModeChange,
}: {
  isDarkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="ReviewSmart logo" className="h-11 w-11 shrink-0 object-contain" />
          <span className="font-brand text-lg font-bold tracking-tight">
            Review<span className="text-gradient-brand">Smart</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#order" className="transition-colors hover:text-foreground">Order</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-foreground">Call us</a>
        </nav>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="sr-only">Dark mode</span>
            <SunIcon className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={onDarkModeChange}
              aria-label="Toggle dark mode"
            />
            <MoonIcon className="h-4 w-4" />
          </label>
          <a
            href="#order"
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03]"
          >
            Order now
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft brand glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--primary-glow), transparent)" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pb-24 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-glow opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-glow" />
            </span>
            NFC Review Cards · Made for offline stores
          </span>

          <h1 className="mt-5 font-brand text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Order your
            <br />
            <span className="text-gradient-brand">NFC Review Card</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            One tap and your customer lands on your Google review page.{" "}
            <span className="font-semibold text-foreground">No app, no typing.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.03]"
            >
              <PhoneIcon className="h-4 w-4 text-primary" />
              Call Us
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-brand transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <dl className="mt-10 flex max-w-md items-center justify-between gap-4 border-t border-border pt-6 text-sm">
            <div>
              <dt className="font-semibold">Starting at</dt>
              <dd className="text-muted-foreground">              {inr(tierFor(100).price)} / card</dd>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <dt className="font-semibold">Delivery</dt>
              <dd className="text-muted-foreground">{inr(DELIVERY_FEE)} · across India</dd>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <dt className="font-semibold">Payment</dt>
              <dd className="text-muted-foreground">UPI</dd>
            </div>
          </dl>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="float-soft">
        <div className="nfc-card aspect-[8/5] w-full p-6 text-primary-foreground sm:p-8">
          <div className="flex items-start justify-between">
            <span className="font-brand text-base font-bold tracking-tight opacity-95">
              ReviewSmart
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
              NFC
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-70">Google review</p>
              <p className="mt-1 font-brand text-xl font-semibold leading-tight sm:text-2xl">
                Tap. Review.<br />Done.
              </p>
            </div>
            {/* contactless waves */}
            <div className="relative mb-1 flex h-14 w-14 items-center justify-center">
              <span className="tap-waves relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <TapIcon className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 opacity-90" />
            <p className="text-xs opacity-80">Your review link is inside the card</p>
          </div>
        </div>
      </div>

      {/* floating stat chips */}
      <div className="card-glass absolute -left-4 top-8 hidden rounded-2xl px-4 py-3 sm:block lg:-left-10">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Setup</p>
        <p className="font-brand text-sm font-bold">Zero app needed</p>
      </div>
      <div className="card-glass absolute -right-2 bottom-6 hidden rounded-2xl px-4 py-3 sm:block lg:-right-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Customer</p>
        <p className="font-brand text-sm font-bold">1 tap → review page</p>
      </div>
    </div>
  );
}

/* ---------------- Steps / order flow ---------------- */

type Cart = { qty: number; unitPrice: number } | null;

function StepsSection() {
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<Cart>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "", notes: "" });
  const [paid, setPaid] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const tier = tierFor(qty);
  const cardsTotal = cart ? cart.qty * cart.unitPrice : 0;
  const grandTotal = cardsTotal + (cart ? DELIVERY_FEE : 0);

  const detailsComplete =
    form.name.trim().length > 1 &&
    /^[0-9]{10}$/.test(form.phone.replace(/\D/g, "").slice(-10)) &&
    form.address.trim().length > 5 &&
    form.city.trim().length > 1 &&
    /^\d{6}$/.test(form.pincode.trim());

  const orderMessage = useMemo(() => {
    if (!cart) return "";
    const lines = [
      `Hey, I am ${form.name}. I am interested in buying NFC review cards`,
      "",
      form.address,
      form.city,
      form.pincode,
    ];
    if (form.notes.trim()) lines.push(`Note: ${form.notes}`);
    lines.push(
      "",
      `I have successfully paid the ${inr(grandTotal)} screenshot is attached please review it and process my order`,
    );
    return lines.join("\n");
  }, [cart, form, grandTotal]);

  const waOrderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const copyOrderMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (error) {
      console.error("Unable to copy order message", error);
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));


  return (
    <section id="order" className="relative scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">Step by step</p>
        <h2 className="mt-3 text-center font-brand text-3xl font-bold tracking-tight sm:text-4xl">
          Step by step <span className="text-gradient-brand">process</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
          Five simple steps from picking your cards to receiving them at your doorstep.
        </p>

        <div className="mt-12 space-y-6">
          {/* Step 1 */}
          {activeStep === 1 && <StepPanel status={{ n: "01", title: "Choose your quantity", done: false }}>
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center justify-between bg-muted px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span>Cards</span>
                <span>Price per card</span>
              </div>
              {TIERS.map((t) => {
                const active = tier.label === t.label;
                return (
                  <div
                    key={t.label}
                    className={`flex items-center justify-between border-t border-border px-5 py-3.5 transition-colors ${
                      active ? "bg-accent" : "bg-card"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${active ? "text-primary" : ""}`}>{t.label}</span>
                    <span className={`font-brand text-base font-bold ${active ? "text-primary" : ""}`}>
                      {inr(t.price)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1.5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center font-brand text-lg font-bold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(999, q + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="font-brand text-2xl font-bold">{inr(qty * tier.price + DELIVERY_FEE)}</p>
                <p className="text-xs text-muted-foreground">
                  {qty} × {inr(tier.price)} + {inr(DELIVERY_FEE)} delivery
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCart({ qty, unitPrice: tier.price });
                setActiveStep(2);
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-4 font-brand text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brand transition-transform hover:scale-[1.02]"
            >
              <CartIcon className="h-4 w-4" />
              Add to cart
            </button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Need more than 100 cards?{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want a bulk order of NFC review cards (100+).")}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                WhatsApp us for a bulk order
              </a>
              .
            </p>
          </StepPanel>}

          {/* Step 2 */}
          {activeStep === 2 && <StepPanel status={{ n: "02", title: "Your cart", done: false }}>
            {cart ? (
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-brand text-lg font-bold">
                      {cart.qty} card{cart.qty > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {inr(cart.unitPrice)} per card · tier {tierFor(cart.qty).label}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setQty(cart.qty);
                        setCart(null);
                        setActiveStep(1);
                      }}
                      className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Edit quantity
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCart(null);
                        setActiveStep(1);
                      }}
                      className="rounded-full border border-destructive/30 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-4 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Cards subtotal</span>
                    <span>{inr(cardsTotal)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>{inr(DELIVERY_FEE)}</span>
                  </div>
                  <div className="mt-3 flex justify-between font-brand text-lg font-bold">
                    <span>Total</span>
                    <span>{inr(grandTotal)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-gradient-brand py-4 font-brand text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brand transition-transform hover:scale-[1.02]"
                >
                  Confirm quantity
                </button>
              </div>
            ) : (
              <EmptyHint line1="Your cart is empty." line2="Pick a quantity above and tap “Add to cart”." />
            )}
          </StepPanel>}

          {/* Step 3 */}
          {activeStep === 3 && <StepPanel status={{ n: "03", title: "Delivery details", done: false }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" value={form.name} onChange={set("name")} placeholder="Full name" />
              <Field label="Phone / WhatsApp" value={form.phone} onChange={set("phone")} placeholder="10-digit number" inputMode="numeric" />
              <div className="sm:col-span-2">
                <Field label="Full address" value={form.address} onChange={set("address")} placeholder="House / shop no., street, landmark" multiline />
              </div>
              <Field label="City" value={form.city} onChange={set("city")} placeholder="City" />
              <Field label="Pincode" value={form.pincode} onChange={set("pincode")} placeholder="6-digit pincode" inputMode="numeric" />
              <div className="sm:col-span-2">
                <Field label="Notes" optional value={form.notes} onChange={set("notes")} placeholder="Anything we should know?" multiline />
              </div>
            </div>
            {cart && !detailsComplete && (
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                Fill your name, phone, address, city and pincode to continue.
              </p>
            )}
            <button
              type="button"
              disabled={!detailsComplete}
              onClick={() => setActiveStep(4)}
              className={`mt-5 flex w-full items-center justify-center rounded-full py-4 font-brand text-sm font-bold uppercase tracking-wider transition-transform ${
                detailsComplete
                  ? "bg-gradient-brand text-primary-foreground shadow-brand hover:scale-[1.02]"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              }`}
            >
              Confirm details
            </button>
          </StepPanel>}

          {/* Step 4 */}
          {activeStep === 4 && <StepPanel status={{ n: "04", title: "Pay by UPI", done: false }}>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <img
                src="/qr.png"
                alt={`UPI QR code for ${UPI_ID}`}
                className="w-56 shrink-0 rounded-2xl border border-border bg-white p-2 shadow-sm sm:w-64"
              />
              <div className="w-full text-center sm:text-left">
                <p className="font-brand text-3xl font-bold">{inr(grandTotal)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Total to pay (delivery included)
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <span className="font-brand text-sm font-semibold">{UPI_ID}</span>
                  <button
                    type="button"
                    onClick={copyUpi}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
                  >
                    {copiedUpi ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Scan with any UPI app and pay the total shown above. Keep the payment
                  screenshot ready — you'll send it with your order in the next step.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPaid(true);
                    setActiveStep(5);
                  }}
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-gradient-brand py-3.5 font-brand text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brand transition-transform hover:scale-[1.02]"
                >
                  I've paid by UPI
                </button>
              </div>
            </div>
          </StepPanel>}

          {/* Step 5 */}
          {activeStep === 5 && <StepPanel status={{ n: "05", title: "Send your order", done: true }}>
            <div className="rounded-2xl border border-border bg-muted/50 p-5">
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{orderMessage}</p>
              <button
                type="button"
                onClick={copyOrderMessage}
                className="mt-4 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
              >
                {copiedMessage ? "Copied ✓" : "Copy text"}
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Write this message or copy paste it and attach your payment screenshot with it.
            </p>
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-4 font-brand text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brand transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send your order on WhatsApp
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-4 font-brand text-sm font-bold uppercase tracking-wider transition-colors hover:bg-muted"
            >
              <PhoneIcon className="h-4 w-4 text-primary" />
              Or call us to order
            </a>
            <ol className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {[
                "Tap WhatsApp — your order details are already filled in for you.",
                "Send the message and attach your UPI payment screenshot.",
                "We confirm your order and ship your cards to your doorstep.",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary font-brand text-[10px] font-bold text-secondary-foreground">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </StepPanel>}
        </div>
      </div>
    </section>
  );
}

function StepPanel({
  status,
  children,
}: {
  status: { n: string; title: string; done: boolean };
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-brand text-sm font-bold ${
            status.done ? "bg-gradient-brand text-primary-foreground shadow-brand" : "bg-secondary text-secondary-foreground"
          }`}
        >
          {status.done ? "✓" : status.n}
        </span>
        <h3 className="font-brand text-xl font-bold tracking-tight sm:text-2xl">
          {status.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-gradient-brand">{status.title.split(" ").slice(-1)}</span>
        </h3>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function EmptyHint({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{line1}</p>
      <p className="mt-1">{line2}</p>
    </div>
  );
}

function Field({
  label,
  optional,
  value,
  onChange,
  placeholder,
  multiline,
  inputMode,
}: {
  label: string;
  optional?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  multiline?: boolean;
  inputMode?: "numeric";
}) {
  const cls =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
        {optional && <span className="ml-1 normal-case tracking-normal opacity-70">(optional)</span>}
      </span>
      {multiline ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={2} className={cls} />
      ) : (
        <input value={value} onChange={onChange} placeholder={placeholder} inputMode={inputMode} className={cls} />
      )}
    </label>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  {
    q: "What is an NFC Review Card?",
    a: "A smart card for your counter. When a happy customer taps it with their phone, their phone opens your Google review page instantly — no app, no typing, no searching.",
  },
  {
    q: "Does my customer need to install anything?",
    a: "No. Every modern smartphone reads NFC cards natively — the tap simply opens your review link, exactly like scanning a QR code but faster.",
  },
  {
    q: "How do I order and pay?",
    a: "Pick your quantity above, fill your delivery details, pay by UPI to our QR, then send the order on WhatsApp with your payment screenshot. We confirm and ship.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary/50 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="text-center font-brand text-3xl font-bold tracking-tight sm:text-4xl">
          FAQ
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Soon we will add more answers here — for now, here are the essentials. Anything
          else? Just call or WhatsApp us.
        </p>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-brand text-base font-semibold sm:text-lg">{f.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <img src={LOGO_SRC} alt="ReviewSmart logo" className="h-14 w-14 object-contain" />
        <p className="font-brand text-lg font-bold">
          Review<span className="text-gradient-brand">Smart</span>
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          NFC Review Cards for offline stores. One tap and your customer lands on your
          Google review page.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            <PhoneIcon className="h-4 w-4 text-primary" />
            Call Us
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          UPI accepted · {UPI_ID} · © {new Date().getFullYear()} ReviewSmart
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Icons ---------------- */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.108Z" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function TapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 11.5V4.5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M12 10.5v-2a1.5 1.5 0 0 1 3 0v3" />
      <path d="M15 11.5a1.5 1.5 0 0 1 3 0v1.5a7 7 0 0 1-7 7h-.5a6.5 6.5 0 0 1-6.5-6.5v-3a1.5 1.5 0 0 1 3 0" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
