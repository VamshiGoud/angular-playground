// tier-based-discount.interface.ts

export interface TierBasedDiscount {
  is_tier_based_discount: boolean;
  tier_uom: string;
  price_tiers: PriceTier[];
  comments: string;
}

export interface PriceTier {
  tier_label: string;
  tier_low: number;
  tier_high: number;
  discount_type: 'Value' | 'Percent';
  discount_val: number | null;
  discount_pct: number | null;
}

