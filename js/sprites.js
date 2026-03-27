/**
 * Pixel art sprite definitions for "머니디깅클럽 시뮬레이터"
 * Character sprites: Park, Shin, Kim, Bit
 * Each ~16px wide x 22px tall
 */

// Color palettes for each character
const PALETTES = {
  park: {
    '_': null,           // transparent
    'S': '#FFD5B8',       // skin tone
    'H': '#4A3728',       // brown hair (dark)
    'h': '#6B5240',       // brown hair highlight
    'G': '#E8F0FF',       // glass lenses (light blue)
    'g': '#A8C8FF',       // glass frame
    'T': '#4A4A4A',       // gray suit
    't': '#6B6B6B',       // suit highlight
    'W': '#FFFFFF',       // white shirt
    'B': '#2B5BA8',       // blue tie
    'b': '#1E4080',       // tie dark
    'e': '#000000',       // eye
  },
  shin: {
    '_': null,
    'S': '#F5C8B8',       // warm skin
    'D': '#2D1810',       // dark hair
    'd': '#4A2818',       // hair highlight
    'P': '#E87BA8',       // pink/coral blouse
    'p': '#D85B88',       // blouse dark
    'G': '#FFD700',       // gold earring
    'W': '#FFFFFF',       // white (collar)
    'e': '#000000',       // eye
  },
  kim: {
    '_': null,
    'S': '#F0C8B0',       // skin tone
    'D': '#2D2015',       // dark hair
    'd': '#4A3828',       // hair highlight
    'F': '#D4A574',       // amber frame glasses
    'f': '#A8844A',       // frame dark
    'G': '#FFE8A8',       // amber lens
    'O': '#C85A28',       // orange/brown jacket
    'o': '#A84A18',       // jacket dark
    'W': '#FFFFFF',       // white shirt
    'Y': '#D4B840',       // gold tie
    'y': '#A88A20',       // tie dark
    'e': '#000000',       // eye
  },
  bit: {
    '_': null,
    'S': '#F5D8C8',       // skin tone
    'P': '#7B3FA8',       // purple cap/hoodie
    'p': '#5A2B80',       // purple dark
    'H': '#3A3A3A',       // dark headphones
    'Y': '#FFD700',       // yellow logo
    'y': '#E8C000',       // yellow dark
    'e': '#000000',       // eye
  },
};

// Sprite frame data: 22 rows x 16 columns each
const SPRITES = {
  // Park - scholarly MC with glasses
  park: {
    idle: [
      // Frame 1 (neutral)
      [
        '________________',
        '__hhhhhhhhhh____',
        '_hH_HhHhHh_Hh___',
        '_hHG_GG_GhHhH___',
        '_hHGG_GGGhH_H___',
        '_hHG_GGGGH_HhH__',
        '_hHh_GGG_h_HhH__',
        '__hhhhhhhhhH____',
        '________WW_W____',
        '________WW_W____',
        '____TTWTTWW_W___',
        '___TTWTTTWW_W___',
        '___TTWTTTWbeW___',
        '___TTWTTTW_W____',
        '___TTWTTTB_B____',
        '____TTWTBBB_____',
        '____TT_bB_b_____',
        '_____TT__T______',
        '_____TT_bTb_____',
        '_____TT__TT_____',
        '________________',
        '________________',
      ],
      // Frame 2 (breathing - slight up)
      [
        '________________',
        '__hhhhhhhhhh____',
        '_hH_HhHhHh_Hh___',
        '_hHG_GG_GhHhH___',
        '_hHGG_GGGhH_H___',
        '_hHG_GGGGH_HhH__',
        '_hHh_GGG_h_HhH__',
        '__hhhhhhhhhH____',
        '________WW_W____',
        '________WW_W____',
        '____TTWTTWW_W___',
        '___TTWTTTWW_W___',
        '___TTWTTTWbeW___',
        '___TTWTTTW_W____',
        '___TTWTTTB_B____',
        '____TTWTBBB_____',
        '____TT_bB_b_____',
        '_____TT__T______',
        '_____TT__T______',
        '_____TT_bTb_____',
        '________________',
        '________________',
      ],
    ],
    talk: [
      // Frame 1 (mouth open)
      [
        '________________',
        '__hhhhhhhhhh____',
        '_hH_HhHhHh_Hh___',
        '_hHG_GG_GhHhH___',
        '_hHGG_GGGhH_H___',
        '_hHG_GGGGH_HhH__',
        '_hHh_GGG_h_HhH__',
        '__hhhhhhhhhH____',
        '________WW_W____',
        '________WWeW____',
        '____TTWTTWW_W___',
        '___TTWTTTWW_W___',
        '___TTWTTTWeWW___',
        '___TTWTTTW_W____',
        '___TTWTTTB_B____',
        '____TTWTBBB_____',
        '____TT_bB_b_____',
        '_____TT__T______',
        '_____TT_bTb_____',
        '_____TT__TT_____',
        '________________',
        '________________',
      ],
      // Frame 2 (mouth closed)
      [
        '________________',
        '__hhhhhhhhhh____',
        '_hH_HhHhHh_Hh___',
        '_hHG_GG_GhHhH___',
        '_hHGG_GGGhH_H___',
        '_hHG_GGGGH_HhH__',
        '_hHh_GGG_h_HhH__',
        '__hhhhhhhhhH____',
        '________WW_W____',
        '________WW_W____',
        '____TTWTTWW_W___',
        '___TTWTTTWW_W___',
        '___TTWTTTWbeW___',
        '___TTWTTTW_W____',
        '___TTWTTTB_B____',
        '____TTWTBBB_____',
        '____TT_bB_b_____',
        '_____TT__T______',
        '_____TT_bTb_____',
        '_____TT__TT_____',
        '________________',
        '________________',
      ],
    ],
    react: [
      // Excited expression
      [
        '________________',
        '__hhhhhhhhhh____',
        '_hH_HhHhHh_Hh___',
        '_hHG_GG_GhHhH___',
        '_hHGG_GGGhH_H___',
        '_hHG_GGGGH_HhH__',
        '_hHh_GGG_h_HhH__',
        '__hhhhhhhhhH____',
        '________WW_W____',
        '________WWeW____',
        '____TTWTTWW_W___',
        '___TTWTTTWW_W___',
        '___TTWTTTWeWW___',
        '___TTWTTTW_W____',
        '___TTWTTTB_B____',
        '____TTWTBBB_____',
        '____TT_bB_b_____',
        '_____TT__T______',
        '_____TT_bTb_____',
        '_____TT__TT_____',
        '________________',
        '________________',
      ],
    ],
  },

  // Shin - bright professional female MC
  shin: {
    idle: [
      // Frame 1
      [
        '_DDDDDDDDDDDDD__',
        'DDdd_D__D_dd_DD_',
        'DD__DD__DD__DDD_',
        'DDd__D_D_D__dD__',
        'DDdd_DD_DD__DD__',
        'DDDDDDDDDDDdDD__',
        '_DDDD_DDDD_DDD__',
        '___PPP__PPP_____',
        '__PPPPP_PPPP____',
        '__PPPPPPPPPP____',
        '__PPPP_PPPPP____',
        '___PPP__PPP_____',
        '__PPPPPPPPPP____',
        '__PPPPPPPPPP____',
        '__PPPPPGPPPP____',
        '___PPPPPPPP_____',
        '____PP___PP_____',
        '_____PP_PP______',
        '_____PP_PP______',
        '______PPP_______',
        '________________',
        '________________',
      ],
      // Frame 2 (breathing - slight up)
      [
        '_DDDDDDDDDDDDD__',
        'DDdd_D__D_dd_DD_',
        'DD__DD__DD__DDD_',
        'DDd__D_D_D__dD__',
        'DDdd_DD_DD__DD__',
        'DDDDDDDDDDDdDD__',
        '_DDDD_DDDD_DDD__',
        '___PPP__PPP_____',
        '__PPPPP_PPPP____',
        '__PPPPPPPPPP____',
        '__PPPP_PPPPP____',
        '___PPP__PPP_____',
        '__PPPPPPPPPP____',
        '__PPPPPPPPPP____',
        '__PPPPPGPPPP____',
        '___PPPPPPPP_____',
        '____PP___PP_____',
        '_____PP_PP______',
        '_____PP_PP______',
        '______PPP_______',
        '________________',
        '________________',
      ],
    ],
    talk: [
      // Frame 1 (open mouth)
      [
        '_DDDDDDDDDDDDD__',
        'DDdd_D__D_dd_DD_',
        'DD__DD__DD__DDD_',
        'DDd__D_D_D__dD__',
        'DDdd_DD_DD__DD__',
        'DDDDDDDDDDDdDD__',
        '_DDDD_DDDD_DDD__',
        '___PPP__PPP_____',
        '__PPPPP_PPPP____',
        '__PPPPePPPPP____',
        '__PPPPePPPPP____',
        '___PPPPPPPP_____',
        '__PPPPPPPPPP____',
        '__PPPPPPPPPP____',
        '__PPPPPGPPPP____',
        '___PPPPPPPP_____',
        '____PP___PP_____',
        '_____PP_PP______',
        '_____PP_PP______',
        '______PPP_______',
        '________________',
        '________________',
      ],
      // Frame 2 (closed)
      [
        '_DDDDDDDDDDDDD__',
        'DDdd_D__D_dd_DD_',
        'DD__DD__DD__DDD_',
        'DDd__D_D_D__dD__',
        'DDdd_DD_DD__DD__',
        'DDDDDDDDDDDdDD__',
        '_DDDD_DDDD_DDD__',
        '___PPP__PPP_____',
        '__PPPPP_PPPP____',
        '__PPPPPPPPPP____',
        '__PPPP_PPPPP____',
        '___PPP__PPP_____',
        '__PPPPPPPPPP____',
        '__PPPPPPPPPP____',
        '__PPPPPGPPPP____',
        '___PPPPPPPP_____',
        '____PP___PP_____',
        '_____PP_PP______',
        '_____PP_PP______',
        '______PPP_______',
        '________________',
        '________________',
      ],
    ],
    react: [
      // Surprised/excited
      [
        '_DDDDDDDDDDDDD__',
        'DDdd_D__D_dd_DD_',
        'DD__DD__DD__DDD_',
        'DDd__D_D_D__dD__',
        'DDdd_DD_DD__DD__',
        'DDDDDDDDDDDdDD__',
        '_DDDD_DDDD_DDD__',
        '___PPP__PPP_____',
        '__PPPPP_PPPP____',
        '__PPPPePPPPP____',
        '__PPPPePPPPP____',
        '___PPPPPPPP_____',
        '__PPPPPPPPPP____',
        '__PPPPPPPPPP____',
        '__PPPPPGPPPP____',
        '___PPPPPPPP_____',
        '____PP___PP_____',
        '_____PP_PP______',
        '_____PP_PP______',
        '______PPP_______',
        '________________',
        '________________',
      ],
    ],
  },

  // Kim - AI expert with distinctive glasses
  kim: {
    idle: [
      // Frame 1
      [
        '________________',
        '__DDDDDDDDDD____',
        '_DD_D__D_D_DD___',
        '_DDD_DDDD_dDDD__',
        '_DFGGFDDFGGFd___',
        '_DFGGGGDGGGFd___',
        '_DFGGGGGGGGFd___',
        '_DDd_GGG_d_DD___',
        '__DDDDDDDDDDD___',
        '________OO_O____',
        '________OO_O____',
        '____OOWOO_O_O___',
        '___OOWOOOoO_O___',
        '___OoWOOOOoOO___',
        '___OOWOOOO_O____',
        '___OoWOOOoY_Y___',
        '____OoWoYYY_____',
        '____OO_yY_y_____',
        '_____OO__O______',
        '_____OO_yOy_____',
        '________________',
        '________________',
      ],
      // Frame 2 (breathing)
      [
        '________________',
        '__DDDDDDDDDD____',
        '_DD_D__D_D_DD___',
        '_DDD_DDDD_dDDD__',
        '_DFGGFDDFGGFd___',
        '_DFGGGGDGGGFd___',
        '_DFGGGGGGGGFd___',
        '_DDd_GGG_d_DD___',
        '__DDDDDDDDDDD___',
        '________OO_O____',
        '________OO_O____',
        '____OOWOO_O_O___',
        '___OOWOOOoO_O___',
        '___OoWOOOOoOO___',
        '___OOWOOOO_O____',
        '___OoWOOOoY_Y___',
        '____OoWoYYY_____',
        '____OO_yY_y_____',
        '_____OO__O______',
        '_____OO__O______',
        '________________',
        '________________',
      ],
    ],
    talk: [
      // Frame 1 (open)
      [
        '________________',
        '__DDDDDDDDDD____',
        '_DD_D__D_D_DD___',
        '_DDD_DDDD_dDDD__',
        '_DFGGFDDFGGFd___',
        '_DFGGGGDGGGFd___',
        '_DFGGGGGGGGFd___',
        '_DDd_GGG_d_DD___',
        '__DDDDDDDDDDD___',
        '________OO_O____',
        '________OOeO____',
        '____OOWOO_O_O___',
        '___OOWOOOoO_O___',
        '___OoWOOOOoOO___',
        '___OOWOOOO_O____',
        '___OoWOOOoY_Y___',
        '____OoWoYYY_____',
        '____OO_yY_y_____',
        '_____OO__O______',
        '_____OO_yOy_____',
        '________________',
        '________________',
      ],
      // Frame 2 (closed)
      [
        '________________',
        '__DDDDDDDDDD____',
        '_DD_D__D_D_DD___',
        '_DDD_DDDD_dDDD__',
        '_DFGGFDDFGGFd___',
        '_DFGGGGDGGGFd___',
        '_DFGGGGGGGGFd___',
        '_DDd_GGG_d_DD___',
        '__DDDDDDDDDDD___',
        '________OO_O____',
        '________OO_O____',
        '____OOWOO_O_O___',
        '___OOWOOOoO_O___',
        '___OoWOOOOoOO___',
        '___OOWOOOO_O____',
        '___OoWOOOoY_Y___',
        '____OoWoYYY_____',
        '____OO_yY_y_____',
        '_____OO__O______',
        '_____OO_yOy_____',
        '________________',
        '________________',
      ],
    ],
    react: [
      // Enthusiastic
      [
        '________________',
        '__DDDDDDDDDD____',
        '_DD_D__D_D_DD___',
        '_DDD_DDDD_dDDD__',
        '_DFGGFDDFGGFd___',
        '_DFGGGGDGGGFd___',
        '_DFGGGGGGGGFd___',
        '_DDd_GGG_d_DD___',
        '__DDDDDDDDDDD___',
        '________OO_O____',
        '________OOeO____',
        '____OOWOO_O_O___',
        '___OOWOOOoO_O___',
        '___OoWOOOOoOO___',
        '___OOWOOOO_O____',
        '___OoWOOOoY_Y___',
        '____OoWoYYY_____',
        '____OO_yY_y_____',
        '_____OO__O______',
        '_____OO_yOy_____',
        '________________',
        '________________',
      ],
    ],
  },

  // Bit - casual YouTuber with cap and hoodie
  bit: {
    idle: [
      // Frame 1
      [
        '________________',
        '____PPPPPPPP____',
        '___PPPPPPPPPP___',
        '___PP_P__P_PP___',
        '___PPp_PP_pPP___',
        '____PPPPPPPP____',
        '_HHHPPPPPPHHH__',
        '_HHHPPPPPPpHH__',
        '_HHHPPPPPPHHH__',
        '____SSSSSSSS____',
        '____SSYSYSSS____',
        '___PSSSPSSPSP___',
        '___PSSSPSSPSP___',
        '____SSySySSS____',
        '____SSSSSSSS____',
        '____SSSSSSSS____',
        '_____SS_SS______',
        '_____SS_SS______',
        '_____SS_SS______',
        '______SSS_______',
        '________________',
        '________________',
      ],
      // Frame 2 (breathing)
      [
        '________________',
        '____PPPPPPPP____',
        '___PPPPPPPPPP___',
        '___PP_P__P_PP___',
        '___PPp_PP_pPP___',
        '____PPPPPPPP____',
        '_HHHPPPPPPHHH__',
        '_HHHPPPPPPpHH__',
        '_HHHPPPPPPHHH__',
        '____SSSSSSSS____',
        '____SSYSYSSS____',
        '___PSSSPSSPSP___',
        '___PSSSPSSPSP___',
        '____SSySySSS____',
        '____SSSSSSSS____',
        '____SSSSSSSS____',
        '_____SS_SS______',
        '_____SS_SS______',
        '_____SS_SS______',
        '______SSS_______',
        '________________',
        '________________',
      ],
    ],
    talk: [
      // Frame 1 (open mouth)
      [
        '________________',
        '____PPPPPPPP____',
        '___PPPPPPPPPP___',
        '___PP_P__P_PP___',
        '___PPp_PP_pPP___',
        '____PPPPPPPP____',
        '_HHHPPPPPPHHH__',
        '_HHHPPPPPPpHH__',
        '_HHHPPPPPPHHH__',
        '____SSSSSSSS____',
        '____SSeSeSsS____',
        '___PSSSPSSPSP___',
        '___PSSSPSSPSP___',
        '____SSsSsSSS____',
        '____SSSSSSSS____',
        '____SSSSSSSS____',
        '_____SS_SS______',
        '_____SS_SS______',
        '_____SS_SS______',
        '______SSS_______',
        '________________',
        '________________',
      ],
      // Frame 2 (closed)
      [
        '________________',
        '____PPPPPPPP____',
        '___PPPPPPPPPP___',
        '___PP_P__P_PP___',
        '___PPp_PP_pPP___',
        '____PPPPPPPP____',
        '_HHHPPPPPPHHH__',
        '_HHHPPPPPPpHH__',
        '_HHHPPPPPPHHH__',
        '____SSSSSSSS____',
        '____SSYSYSSS____',
        '___PSSSPSSPSP___',
        '___PSSSPSSPSP___',
        '____SSySySSS____',
        '____SSSSSSSS____',
        '____SSSSSSSS____',
        '_____SS_SS______',
        '_____SS_SS______',
        '_____SS_SS______',
        '______SSS_______',
        '________________',
        '________________',
      ],
    ],
    react: [
      // Cool/excited
      [
        '________________',
        '____PPPPPPPP____',
        '___PPPPPPPPPP___',
        '___PP_P__P_PP___',
        '___PPp_PP_pPP___',
        '____PPPPPPPP____',
        '_HHHPPPPPPHHH__',
        '_HHHPPPPPPpHH__',
        '_HHHPPPPPPHHH__',
        '____SSSSSSSS____',
        '____SSeSeSsS____',
        '___PSSSPSSPSP___',
        '___PSSSPSSPSP___',
        '____SSsSsSSS____',
        '____SSSSSSSS____',
        '____SSSSSSSS____',
        '_____SS_SS______',
        '_____SS_SS______',
        '_____SS_SS______',
        '______SSS_______',
        '________________',
        '________________',
      ],
    ],
  },
};

// Studio furniture sprites
const FURNITURE = {
  // Round table (top-down view, ~30px diameter)
  table: {
    palette: {
      '_': null,
      'T': '#8B4513',       // wood brown
      't': '#654321',       // dark wood
      'E': '#A0522D',       // edge
    },
    rows: [
      '______TTTTTTt____',
      '____TtttttttttT__',
      '___TttttttttttT__',
      '__TttttttttttttT_',
      '__Tttt_ttttt_ttT_',
      '_TttttttttttttttT',
      '_Tttt_ttttt_tttT_',
      '_Tttttttttttttt_T',
      '_Tttt_ttttt_tttT_',
      '_TttttttttttttttT',
      '_TttttttttttttttT',
      '_Tttt_ttttt_tttT_',
      '__Tttttttttttttt_',
      '__TttttttttttttT_',
      '___TttttttttttT__',
      '____TtttttttttT__',
      '______TTTTTTt____',
    ],
  },

  // Microphone stand (small, ~8x12px)
  microphone: {
    palette: {
      '_': null,
      'M': '#505050',       // metal gray
      'm': '#303030',       // metal dark
      'B': '#2A2A2A',       // black
      'G': '#FFD700',       // gold accent
    },
    rows: [
      '___MM___',
      '__mMMm__',
      '__mMMm__',
      '_mmMMmm_',
      '_MGGGM_',
      '__MBM__',
      '__MBM__',
      '__MBM__',
      '___m___',
    ],
  },

  // ON AIR sign (red rectangle with glow)
  onAirSign: {
    palette: {
      '_': null,
      'R': '#FF2020',       // bright red
      'r': '#CC1010',       // red dark
      'B': '#000000',       // black text
      'G': '#FF6060',       // glow
    },
    rows: [
      '_RRRRRRRRR_',
      'RGGGGGGGGrR',
      'RGR_R_RGGrR',
      'RGRRRRGGGR',
      'RGR_RRGGGR',
      'RGGGGGGGGrR',
      '_RRRRRRRRR_',
    ],
  },
};

/**
 * Get sprite data for a character
 * @param {string} charId - 'park', 'shin', 'kim', or 'bit'
 * @param {string} state - 'idle', 'talk', or 'react'
 * @param {number} frame - frame index (0, 1, ...)
 * @returns {{palette: object, rows: string[]}} Sprite frame data
 */
export function getSprite(charId, state, frame = 0) {
  if (!SPRITES[charId]) {
    throw new Error(`Unknown character: ${charId}`);
  }
  if (!SPRITES[charId][state]) {
    throw new Error(`Unknown state: ${state}`);
  }

  const spriteData = SPRITES[charId][state];
  const frameIndex = frame % spriteData.length;
  const rows = spriteData[frameIndex];

  return {
    palette: PALETTES[charId],
    rows: rows,
  };
}

/**
 * Get furniture sprite
 * @param {string} furnitureId - 'table', 'microphone', or 'onAirSign'
 * @returns {{palette: object, rows: string[]}} Furniture sprite data
 */
export function getFurniture(furnitureId) {
  if (!FURNITURE[furnitureId]) {
    throw new Error(`Unknown furniture: ${furnitureId}`);
  }
  return FURNITURE[furnitureId];
}

/**
 * All valid character IDs
 */
export const CHARACTER_IDS = ['park', 'shin', 'kim', 'bit'];

/**
 * Character info for display
 */
export const CHARACTER_INFO = {
  park: { name: '박정호', title: 'MC' },
  shin: { name: '신혜원', title: 'MC' },
  kim: { name: '김덕진', title: 'AI전문가' },
  bit: { name: '비트PD', title: 'YouTuber' },
};
