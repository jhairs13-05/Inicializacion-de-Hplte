// Agregados calculados a partir de 2023_01_producao_Terra.csv
// petroleo: bbl/dia | gas: Mm³/dia (gás total) | agua: bbl/dia (sumas de caudales diarios)
const DATOS = {
  "total": 5471,
  "pozos": 5308,
  "campos": 221,
  "operadores": 39,
  "cuencas": 12,
  "estados": 9,
  "estado": {
    "Rio Grande do Norte": {
      "registros": 3278,
      "petroleo": 28932.51,
      "gas": 821.92,
      "agua": 967227.5,
      "lat": -5.8,
      "lng": -36.6
    },
    "Bahia": {
      "registros": 890,
      "petroleo": 11898.33,
      "gas": 2341.41,
      "agua": 170626.07,
      "lat": -12.3,
      "lng": -38.6
    },
    "Sergipe": {
      "registros": 490,
      "petroleo": 3516.56,
      "gas": 37.68,
      "agua": 78861.83,
      "lat": -10.6,
      "lng": -37.3
    },
    "Espírito Santo": {
      "registros": 299,
      "petroleo": 6575.02,
      "gas": 48.53,
      "agua": 43147.01,
      "lat": -19.4,
      "lng": -40.3
    },
    "Ceará": {
      "registros": 202,
      "petroleo": 631.27,
      "gas": 0.81,
      "agua": 9971.18,
      "lat": -4.9,
      "lng": -38.6
    },
    "Alagoas": {
      "registros": 190,
      "petroleo": 2217.65,
      "gas": 650.32,
      "agua": 6884.06,
      "lat": -9.6,
      "lng": -36.4
    },
    "Amazonas": {
      "registros": 71,
      "petroleo": 13248.72,
      "gas": 13484.14,
      "agua": 21865.48,
      "lat": -4.9,
      "lng": -65.3
    },
    "Maranhão": {
      "registros": 49,
      "petroleo": 115.81,
      "gas": 2712.71,
      "agua": 0.92,
      "lat": -4.4,
      "lng": -44.6
    },
    "Paraná": {
      "registros": 2,
      "petroleo": 0.0,
      "gas": 27.7,
      "agua": 0.0,
      "lat": -24.7,
      "lng": -51.5
    }
  },
  "cuenca": {
    "Potiguar": {
      "registros": 3480,
      "petroleo": 29563.78,
      "gas": 822.72,
      "agua": 977198.67
    },
    "Recôncavo": {
      "registros": 871,
      "petroleo": 11892.53,
      "gas": 2225.13,
      "agua": 170618.25
    },
    "Sergipe": {
      "registros": 490,
      "petroleo": 3516.56,
      "gas": 37.68,
      "agua": 78861.83
    },
    "Espírito Santo": {
      "registros": 299,
      "petroleo": 6575.02,
      "gas": 48.53,
      "agua": 43147.01
    },
    "Alagoas": {
      "registros": 190,
      "petroleo": 2217.65,
      "gas": 650.32,
      "agua": 6884.06
    },
    "Solimões": {
      "registros": 67,
      "petroleo": 11930.17,
      "gas": 12790.58,
      "agua": 21865.48
    },
    "Parnaíba": {
      "registros": 46,
      "petroleo": 24.47,
      "gas": 2712.13,
      "agua": 0.0
    },
    "Tucano Sul": {
      "registros": 17,
      "petroleo": 5.8,
      "gas": 116.28,
      "agua": 7.82
    },
    "Amazonas": {
      "registros": 4,
      "petroleo": 1318.56,
      "gas": 693.55,
      "agua": 0.0
    },
    "Barreirinhas": {
      "registros": 3,
      "petroleo": 91.34,
      "gas": 0.58,
      "agua": 0.92
    },
    "Camamu": {
      "registros": 2,
      "petroleo": 0.0,
      "gas": 0.0,
      "agua": 0.0
    },
    "Paraná": {
      "registros": 2,
      "petroleo": 0.0,
      "gas": 27.7,
      "agua": 0.0
    }
  },
  "operador": {
    "Petrobras": {
      "registros": 3106,
      "petroleo": 34966.41,
      "gas": 12915.4,
      "agua": 950090.19
    },
    "Carmo": {
      "registros": 480,
      "petroleo": 3271.77,
      "gas": 34.4,
      "agua": 78768.34
    },
    "Potiguar E&P S.A.": {
      "registros": 388,
      "petroleo": 9712.87,
      "gas": 695.41,
      "agua": 31838.69
    },
    "PetroRecôncavo": {
      "registros": 231,
      "petroleo": 2507.2,
      "gas": 98.11,
      "agua": 76101.03
    },
    "3R Fazenda Belém": {
      "registros": 202,
      "petroleo": 631.27,
      "gas": 0.81,
      "agua": 9971.18
    },
    "Origem Alagoas": {
      "registros": 158,
      "petroleo": 2021.6,
      "gas": 647.36,
      "agua": 6305.8
    },
    "SPE Miranga": {
      "registros": 146,
      "petroleo": 1831.21,
      "gas": 865.9,
      "agua": 28136.04
    },
    "Seacrest SPE Cricaré": {
      "registros": 141,
      "petroleo": 1792.67,
      "gas": 25.46,
      "agua": 8477.36
    },
    "3R Candeias  S.A.": {
      "registros": 134,
      "petroleo": 1743.34,
      "gas": 410.88,
      "agua": 9044.93
    },
    "3R Macau": {
      "registros": 100,
      "petroleo": 1271.82,
      "gas": 78.17,
      "agua": 33304.53
    }
  }
};
