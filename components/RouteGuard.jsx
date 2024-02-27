import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/register", "/login", "/", "/_error"];

export default function RouterGuard({ children }) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [authorized, setAuthorized] = useState(false);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  async function updateAtoms() {
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    authCheck(router.pathname);
    router.events.on("routeChangeComplete", authCheck);
    updateAtoms();
    console.log(searchHistory, 1);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return <>{authorized && children}</>;
}
