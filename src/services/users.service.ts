import axios from "axios";

export const getUsers = async (size: number) => {
  const { data: { results: users } } = await axios.get(
    `https://randomuser.me/api/?results=${size}&nat=es`,
  );
  return users.map((user: any) => ({
    id: user.login.uuid,
    first: user.name.first,
    last: user.name.last,
    picture: user.picture.large,
    toHome: user.location.street,
    toAluxion: user.location.city,
    position: user.login.username,
  }));
};
