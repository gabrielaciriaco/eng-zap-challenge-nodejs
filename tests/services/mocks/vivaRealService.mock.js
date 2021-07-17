const vivaRealServiceMock = {
  imovelElegivelVenda: {
    pricingInfos: {
      price: 700000,
      businessType: "SALE",
    },
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  imovelInelegivelVenda: {
    pricingInfos: {
      price: 800000,
      businessType: "SALE",
    },
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  imovelElegivelAluguel: {
    pricingInfos: {
      price: 4000,
      monthlyCondoFee: 1000,
      businessType: "RENTAL",
    },
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  imovelElegivelAluguelDentroBoundingBox: {
    pricingInfos: {
      price: 5000,
      monthlyCondoFee: 1000,
      businessType: "RENTAL",
    },
    address: {
      geoLocation: {
        location: {
          lat: -23.546686,
          lon: -46.641146,
        },
      },
    },
  },
  imovelInelegivelAluguelPrecoMaior: {
    pricingInfos: {
      price: 5000,
      monthlyCondoFee: 1000,
      businessType: "RENTAL",
    },
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  imovelInelegivelAluguelPrecoMaiorDentroBoundingBox: {
    pricingInfos: {
      price: 9000,
      monthlyCondoFee: 1000,
      businessType: "RENTAL",
    },
    address: {
      geoLocation: {
        location: {
          lat: -23.546686,
          lon: -46.641146,
        },
      },
    },
  },
  imovelInelegivelAluguelMonthlyCondoFeeMaior: {
    pricingInfos: {
      price: 4000,
      monthlyCondoFee: 3000,
      businessType: "RENTAL",
    },
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  imovelInelegivelAluguel: {
    pricingInfos: {
      price: 5000,
      monthlyCondoFee: 3000,
      businessType: "RENTAL",
    },
    address: {
      geoLocation: {
        location: {
          lat: -23.546686,
          lon: -46.641146,
        },
      },
    },
  },
};

export const imoveisVivaRealServiceMock = {
  imoveis: [
    vivaRealServiceMock.imovelElegivelVenda,
    vivaRealServiceMock.imovelInelegivelVenda,
    vivaRealServiceMock.imovelElegivelAluguel,
    vivaRealServiceMock.imovelElegivelAluguelDentroBoundingBox,
    vivaRealServiceMock.imovelInelegivelAluguelPrecoMaior,
    vivaRealServiceMock.imovelInelegivelAluguelPrecoMaiorDentroBoundingBox,
    vivaRealServiceMock.imovelInelegivelAluguelMonthlyCondoFeeMaior,
    vivaRealServiceMock.imovelInelegivelAluguel,
  ],
  retornoEsperado: {
    pageNumber: 1,
    pageSize: 3,
    totalCount: 3,
    listings: [
      vivaRealServiceMock.imovelElegivelVenda,
      vivaRealServiceMock.imovelElegivelAluguel,
      vivaRealServiceMock.imovelElegivelAluguelDentroBoundingBox,
    ],
  },
};

export default vivaRealServiceMock;
