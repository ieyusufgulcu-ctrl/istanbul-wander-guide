import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
type Align = "left" | "right";

interface PriceBlockProps {
  /** Numeric amount in TRY (or other). */
  amount: number;
  /** Original price for strike-through display (rare). */
  originalAmount?: number;
  /** ISO 4217 currency code. Defaults to TRY (₺). */
  currency?: "TRY" | "EUR" | "USD";
  /** Per-unit suffix, e.g. "kişi başı". */
  perLabel?: string;
  /** "Başlangıç fiyatı" prefix (e.g. on cards). */
  fromLabel?: boolean;
  /** Free experience — overrides amount. */
  free?: boolean;
  size?: Size;
  align?: Align;
  className?: string;
}

const CURRENCY_SYMBOL: Record<NonNullable<PriceBlockProps["currency"]>, string> = {
  TRY: "₺",
  EUR: "€",
  USD: "$",
};

const SIZES: Record<Size, { amount: string; secondary: string; symbol: string }> = {
  sm: { amount: "text-[14px]", secondary: "text-[11px]", symbol: "text-[12px]" },
  md: { amount: "text-[18px]", secondary: "text-[12px]", symbol: "text-[14px]" },
  lg: { amount: "text-[24px]", secondary: "text-[12.5px]", symbol: "text-[18px]" },
};

function formatAmount(n: number) {
  // Turkish locale: 1.250 (no decimals for whole numbers, comma for decimals)
  return n % 1 === 0
    ? n.toLocaleString("tr-TR")
    : n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * PriceBlock — anchors trust on cards, sticky CTAs, and checkout.
 * Turkish-first: symbol after amount ("450 ₺"), thin-space-like rhythm,
 * optional "kişi başı" / "başlangıç" framing.
 */
export function PriceBlock({
  amount,
  originalAmount,
  currency = "TRY",
  perLabel,
  fromLabel = false,
  free = false,
  size = "md",
  align = "left",
  className,
}: PriceBlockProps) {
  const sz = SIZES[size];
  const symbol = CURRENCY_SYMBOL[currency];

  return (
    <div
      className={cn(
        "flex flex-col leading-tight",
        align === "right" ? "items-end text-right" : "items-start text-left",
        className,
      )}
    >
      {fromLabel && !free && (
        <span className={cn("text-muted-foreground", sz.secondary)}>Başlangıç</span>
      )}

      <div className="flex items-baseline gap-1.5">
        {free ? (
          <span className={cn("font-serif text-foreground tracking-tight", sz.amount)}>
            Ücretsiz
          </span>
        ) : (
          <>
            <span className={cn("font-serif text-foreground tracking-tight font-semibold", sz.amount)}>
              {formatAmount(amount)}
            </span>
            <span className={cn("text-foreground/80 font-semibold", sz.symbol)}>{symbol}</span>
            {typeof originalAmount === "number" && originalAmount > amount && (
              <span
                className={cn(
                  "text-muted-foreground line-through font-medium",
                  sz.secondary,
                )}
              >
                {formatAmount(originalAmount)} {symbol}
              </span>
            )}
          </>
        )}
      </div>

      {perLabel && !free && (
        <span className={cn("text-muted-foreground mt-0.5", sz.secondary)}>{perLabel}</span>
      )}
    </div>
  );
}

export default PriceBlock;