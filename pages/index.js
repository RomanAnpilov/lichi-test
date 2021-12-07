import axios from "axios";
import Image from "next/image";
import React from "react";

import cookieCutter from "cookie-cutter";
import Cookies from "cookies";

import dress from "../public/dress.webp";

const BASE_URL = "http://localhost:3000";

const Index = ({ responses, cookies }) => {
  const additem = () => {
    console.log(cookieCutter.get("myCookieName"));
    const response = axios({
      method: "post",
      url: "/api/add",
      withCredentials: true,
      headers: {
        "set-cookie": cookieCutter.get("setCookies"),
      },
    });
    console.log(response);
    setItems(++items);
  };

  const removeitem = () => {
    if (items === 0) {
      alert("В корзине уже нет позиций(")
      return
    }

    if (items === 1) {
      removeAll();
    } else {
      const response = axios({
        method: "post",
        url: "/api/remove",
        withCredentials: true,
        params: { all: "False" },
        headers: {
          "set-cookie": cookieCutter.get("setCookies"),
        },
      });
    }
    setItems(--items);
  };

  const removeAll =  () => {
    const response =  axios({
      method: "post",
      url: "/api/remove",
      withCredentials: true,
      params: { all: "true" },
      headers: {
        "set-cookie": cookieCutter.get("setCookies"),
      },
    });

    setItems(0);
  };

  React.useEffect(() => {
    cookieCutter.set("setCookies", cookies);
  }, []);

  const [items, setItems] = React.useState(responses.iCount);

  return (
    <div className="container">
      <header>
        <h1>Корзина</h1>
      </header>
      <Image src={dress} />
      <div className="choice">
        <button onClick={removeitem}>-</button>
        <h3>{items}</h3>
        <button onClick={additem}>+</button>
      </div>
      <button onClick={removeAll}>Очистить все</button>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);

  const getSetCookie = cookies.get("setCookie");

  const response = await axios({
    method: "post",
    url: `${BASE_URL}/api/list`,
    params: { lang: 1, shop: 1, id: 88250 },
    withCredentials: true,
    headers: {
      "set-cookie": getSetCookie ? getSetCookie : "",
    },
  });

  const setCookie = await response.data.headers["set-cookie"];

  if (setCookie) {
    cookies.set("setCookie", setCookie[0].slice(0, 32));
  }

  return {
    props: {
      responses: response.data.data["api_data"],
      cookies: setCookie ? setCookie : getSetCookie,
    },
  };
};

export default Index;
