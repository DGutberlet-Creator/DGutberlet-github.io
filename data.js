// Data for the Panini World Cup 2026 sticker tracker
// Each team has a page number (as printed in the official album), a three‑letter code, a full name and a list
// of twenty stickers.  The stickers array contains objects with a unique number (e.g. "MEX 1") and a
// placeholder for the player name.  You can edit the player names directly in the file or through
// the UI if you wish to personalise your collection.

const teamsData = [
  {
    code: 'FWC',
    name: 'World Cup Special',
    page: 56,
    stickers: Array.from({ length: 20 }, (_, i) => {
      const n = i + 1;
      return { number: `FWC ${n}`, name: `Special ${n}` };
    }),
  },
  // Group A
  {
    code: 'MEX', name: 'Mexico', page: 8,
    stickers: Array.from({ length: 20 }, (_, i) => {
      const n = i + 1; return { number: `MEX ${n}`, name: '' };
    }),
  },
  { code: 'RSA', name: 'South Africa', page: 10,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `RSA ${i+1}`, name: '' }))
  },
  { code: 'KOR', name: 'Korea Republic', page: 12,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `KOR ${i+1}`, name: '' }))
  },
  { code: 'CZE', name: 'Czechia', page: 14,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `CZE ${i+1}`, name: '' }))
  },
  // Group B
  { code: 'CAN', name: 'Canada', page: 16,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `CAN ${i+1}`, name: '' }))
  },
  { code: 'BIH', name: 'Bosnia & Herzegovina', page: 18,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `BIH ${i+1}`, name: '' }))
  },
  { code: 'QAT', name: 'Qatar', page: 20,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `QAT ${i+1}`, name: '' }))
  },
  { code: 'SUI', name: 'Switzerland', page: 22,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `SUI ${i+1}`, name: '' }))
  },
  // Group C
  { code: 'BRA', name: 'Brazil', page: 24,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `BRA ${i+1}`, name: '' }))
  },
  { code: 'MAR', name: 'Morocco', page: 26,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `MAR ${i+1}`, name: '' }))
  },
  { code: 'HAI', name: 'Haiti', page: 28,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `HAI ${i+1}`, name: '' }))
  },
  { code: 'SCO', name: 'Scotland', page: 30,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `SCO ${i+1}`, name: '' }))
  },
  // Group D
  { code: 'USA', name: 'United States', page: 32,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `USA ${i+1}`, name: '' }))
  },
  { code: 'PAR', name: 'Paraguay', page: 34,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `PAR ${i+1}`, name: '' }))
  },
  { code: 'AUS', name: 'Australia', page: 36,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `AUS ${i+1}`, name: '' }))
  },
  { code: 'TUR', name: 'Türkiye', page: 38,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `TUR ${i+1}`, name: '' }))
  },
  // Group E
  { code: 'GER', name: 'Germany', page: 40,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `GER ${i+1}`, name: '' }))
  },
  { code: 'CUW', name: 'Curaçao', page: 42,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `CUW ${i+1}`, name: '' }))
  },
  { code: 'CIV', name: 'Côte d\'Ivoire', page: 44,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `CIV ${i+1}`, name: '' }))
  },
  { code: 'ECU', name: 'Ecuador', page: 46,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `ECU ${i+1}`, name: '' }))
  },
  // Group F
  { code: 'NED', name: 'Netherlands', page: 48,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `NED ${i+1}`, name: '' }))
  },
  { code: 'JPN', name: 'Japan', page: 50,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `JPN ${i+1}`, name: '' }))
  },
  { code: 'SWE', name: 'Sweden', page: 52,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `SWE ${i+1}`, name: '' }))
  },
  { code: 'TUN', name: 'Tunisia', page: 54,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `TUN ${i+1}`, name: '' }))
  },
  // Group G
  { code: 'BEL', name: 'Belgium', page: 58,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `BEL ${i+1}`, name: '' }))
  },
  { code: 'EGY', name: 'Egypt', page: 60,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `EGY ${i+1}`, name: '' }))
  },
  { code: 'IRN', name: 'IR Iran', page: 62,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `IRN ${i+1}`, name: '' }))
  },
  { code: 'NZL', name: 'New Zealand', page: 64,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `NZL ${i+1}`, name: '' }))
  },
  // Group H
  { code: 'ESP', name: 'Spain', page: 66,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `ESP ${i+1}`, name: '' }))
  },
  { code: 'CPV', name: 'Cabo Verde', page: 68,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `CPV ${i+1}`, name: '' }))
  },
  { code: 'KSA', name: 'Saudi Arabia', page: 70,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `KSA ${i+1}`, name: '' }))
  },
  { code: 'URU', name: 'Uruguay', page: 72,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `URU ${i+1}`, name: '' }))
  },
  // Group I
  { code: 'FRA', name: 'France', page: 74,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `FRA ${i+1}`, name: '' }))
  },
  { code: 'SEN', name: 'Senegal', page: 76,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `SEN ${i+1}`, name: '' }))
  },
  { code: 'IRQ', name: 'Iraq', page: 78,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `IRQ ${i+1}`, name: '' }))
  },
  { code: 'NOR', name: 'Norway', page: 80,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `NOR ${i+1}`, name: '' }))
  },
  // Group J
  { code: 'ARG', name: 'Argentina', page: 82,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `ARG ${i+1}`, name: '' }))
  },
  { code: 'ALG', name: 'Algeria', page: 84,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `ALG ${i+1}`, name: '' }))
  },
  { code: 'AUT', name: 'Austria', page: 86,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `AUT ${i+1}`, name: '' }))
  },
  { code: 'JOR', name: 'Jordan', page: 88,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `JOR ${i+1}`, name: '' }))
  },
  // Group K
  { code: 'POR', name: 'Portugal', page: 90,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `POR ${i+1}`, name: '' }))
  },
  { code: 'COD', name: 'Congo DR', page: 92,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `COD ${i+1}`, name: '' }))
  },
  { code: 'UZB', name: 'Uzbekistan', page: 94,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `UZB ${i+1}`, name: '' }))
  },
  { code: 'COL', name: 'Colombia', page: 96,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `COL ${i+1}`, name: '' }))
  },
  // Group L
  { code: 'ENG', name: 'England', page: 98,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `ENG ${i+1}`, name: '' }))
  },
  { code: 'CRO', name: 'Croatia', page: 100,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `CRO ${i+1}`, name: '' }))
  },
  { code: 'GHA', name: 'Ghana', page: 102,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `GHA ${i+1}`, name: '' }))
  },
  { code: 'PAN', name: 'Panama', page: 104,
    stickers: Array.from({ length: 20 }, (_, i) => ({ number: `PAN ${i+1}`, name: '' }))
  }
];

// Export for usage in other scripts.  In plain HTML scripts this will attach to the global window object.
if (typeof window !== 'undefined') {
  window.teamsData = teamsData;
}