import axios from "axios";

export default async (req, res) => {
  const setCookie = req.headers["set-cookie"][0];

  var config = {
    method: "post",
    url: "https://lichi.com/api/cart/add",
    params: { lang: 1, shop: 1, id: 88249 },
    withCredentials: true,
    headers: {
      Cookie: setCookie ? setCookie : "",
    },
  };

  await axios(config)
};
