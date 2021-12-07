import axios from "axios";

export default async (req, res) => {
  const setCookie = req.headers["set-cookie"][0];


  var config = {
    method: "post",
    url: "https://lichi.com/api/cart/list?lang=1&shop=1",
    withCredentials: true,
    headers: {
      "Cookie": setCookie ? setCookie : "",
    },
  };


  let result = {};
  await axios(config).then((response) => (result.data = response.data, result.headers = response.headers));
  res.status(200).json(result);
};
