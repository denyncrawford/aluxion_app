import axios from "axios";
const host = import.meta.env.API_URL || "http://localhost:3000";

export const fetchStop = async (stopId: string) => {
  const { data: { data } } = await axios(
    `${host}/api/transport/busemtmad/stops/${stopId}/detail/`,
  );
  return data;
};
