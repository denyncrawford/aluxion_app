export interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Arrive {
  line: string;
  stop: string;
  isHead: string;
  destination: string;
  deviation: number;
  bus: number;
  geometry: Geometry;
  estimateArrive: number;
  DistanceBus: number;
  positionTypeBus: string;
}

export interface Stop {
  lines?: [Record<string, string | number>];
  stopId: string;
  stopName: string;
  geometry: Geometry;
  Direction: string;
}

export interface Arrivals {
  Arrive: Arrive[];
  StopInfo: Stop[];
}

export interface ArrivalMerge { 
  line: number;
  Arrivals: Arrive[];
};

export interface FormattedArrival {
  bus: number;
  position: {
    lat: number;
    lng: number;
  },
  destination: string;
  line: string;
}
