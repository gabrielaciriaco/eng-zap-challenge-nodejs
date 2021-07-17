const zapServiceMock = {
  imovelElegivelAluguel: {
    usableAreas: 4000,
    pricingInfos: {
      price: 5000,
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
    usableAreas: 3000,
    pricingInfos: {
      price: 2000,
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
  imovelElegivelVenda: {
    usableAreas: 4000,
    pricingInfos: {
      price: 700000,
      monthlyCondoFee: 1000,
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
  imovelElegivelVendaDentroBoundingBox: {
    usableAreas: 4000,
    pricingInfos: {
      price: 540000,
      monthlyCondoFee: 1000,
      businessType: "SALE",
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
  imovelInelegivelVendaPrecoMenor: {
    usableAreas: 4000,
    pricingInfos: {
      price: 540000,
      monthlyCondoFee: 1000,
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
  imovelInelegivelVendaPrecoMenorDentroBoundingBox: {
    usableAreas: 4000,
    pricingInfos: {
      price: 500000,
      monthlyCondoFee: 1000,
      businessType: "SALE",
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
  imovelInelegivelVendaUsableAreasMenor: {
    usableAreas: 3000,
    pricingInfos: {
      price: 4000,
      monthlyCondoFee: 3000,
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
    usableAreas: 3000,
    pricingInfos: {
      price: 500000,
      monthlyCondoFee: 3000,
      businessType: "SALE",
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

export const imoveisZapServiceMock = {
  imoveis: [
    zapServiceMock.imovelElegivelAluguel,
    zapServiceMock.imovelInelegivelAluguel,
    zapServiceMock.imovelElegivelVenda,
    zapServiceMock.imovelElegivelVendaDentroBoundingBox,
    zapServiceMock.imovelInelegivelVendaPrecoMenor,
    zapServiceMock.imovelInelegivelVendaPrecoMenorDentroBoundingBox,
    zapServiceMock.imovelInelegivelVendaUsableAreasMenor,
    zapServiceMock.imovelInelegivelVenda,
  ],
  retornoEsperado: {
    pageNumber: 1,
    pageSize: 3,
    totalCount: 3,
    listings: [
      zapServiceMock.imovelElegivelAluguel,
      zapServiceMock.imovelElegivelVenda,
      zapServiceMock.imovelElegivelVendaDentroBoundingBox,
    ],
  },
};

export default zapServiceMock;
