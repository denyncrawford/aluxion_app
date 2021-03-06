import axios from "axios";

console.log(import.meta.env.VITE_API_URL);


const host = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchStopData = async (stopId: string): Promise<unknown> => {
  const { data: full, data: { data } } = await axios(
    `${host}/api/v1/transport/busemtmad/stops/${stopId}/detail/`,
  );
  if (full.code == '80') return fetchStopData(stopId);
  return data.length ? data[0].stops[0] : [];
};

export const fetchStopArrivals = async (stopId: string): Promise<unknown> => {
  const { data: full, data: { data } } = await axios({
    method: "post",
    url: `${host}/api/v2/transport/busemtmad/stops/${stopId}/arrives/`,
    data: {
      "Text_StopRequired_YN": "Y",
      "Text_EstimationsRequired_YN": "Y",
    }
  }
  );
  if (data && full.code == '80') return fetchStopArrivals(stopId);
  return data;
}
