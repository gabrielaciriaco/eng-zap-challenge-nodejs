const utilsMock = {
  mensagem: "Erro",
  resposta: "Erro - 2021-01-19T10:20:29Z",
  imovelDentroBoundingBox: {
    address: {
      geoLocation: {
        location: {
          lat: -23.546686,
          lon: -46.641146,
        },
      },
    },
  },
  imovelForaBoundingBox: {
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  imovelNaoElegivel: {
    usableAreas: 0,
    address: {
      geoLocation: {
        location: {
          lat: 0,
          lon: 0,
        },
      },
    },
  },
  imovelElegivel: {
    usableAreas: 79,
    address: {
      geoLocation: {
        location: {
          lat: -25.546686,
          lon: -48.641146,
        },
      },
    },
  },
  array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};
export default utilsMock;
