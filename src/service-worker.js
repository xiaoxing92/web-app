/* eslint-disable no-undef */
import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";
if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: "web-app",
    suffix: "v1.0.0",
  });

  workbox.core.skipWaiting();

  workbox.core.clientsClaim();

  precacheAndRoute(self.__WB_MANIFEST);

  workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "css-cache",
    })
  );

  workbox.routing.registerRoute(
    /.*\.js/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "js-cache",
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );
}
