import { locale } from "$lib/translations/i18n.js";
import { browser } from "$app/environment";
import { getCookie } from "$lib/functions/getCookie";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
   if (browser) {
      let lang = localStorage.getItem("lang");
      const token = getCookie("esiToken");
      locale.set(lang || "EN");
      if (token && token != "undefined") {
         throw redirect(307, "/overview/general");
      } else if (
         !token &&
         url.pathname != "/auth/login" &&
         url.pathname != "/auth/reset-password"
      ) {
         throw redirect(307, "/auth/login");
      }
   }
}
