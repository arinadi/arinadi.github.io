const cacheName = "rhinoresolve-v1"
const preCache = [
  "/",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
  "vendor/bootstrap/css/bootstrap.min.css",
  "assets/css/fontawesome.css",
  "assets/css/templatemo-space-dynamic.min.css",
  "assets/css/animated.min.css",
  "assets/css/owl.min.css",
  "vendor/jquery/jquery.min.js",
  "vendor/bootstrap/js/bootstrap.bundle.min.js",
  "assets/js/owl-carousel.js",
  "assets/js/animation.js",
  "assets/js/imagesloaded.js",
  "assets/js/templatemo-custom.js",
  "assets/images/logo.png",
  "assets/images/biglogo.png",
  "assets/images/about-left-image.png",
  "assets/images/service-icon-01.png",
  "assets/images/service-icon-02.png",
  "assets/images/service-icon-03.png",
  "assets/images/service-icon-04.png",
  "assets/images/services-left-image.png",
  "assets/images/work/grahatour.png",
  "assets/images/work/velosita.png",
  "assets/images/work/gameloft.png",
  "assets/images/blog-dec.png",
  "assets/images/big-blog-thumb.jpg",
  "assets/images/blog-thumb-01.jpg",
  "assets/images/blog-thumb-01.jpg",
  "assets/images/blog-thumb-01.jpg",
  "assets/images/contact-decoration.png"
]

self.addEventListener("install", (e) => {
  console.log("service worker installed")

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      cache.addAll(preCache)
    })(),
  )
})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      // Mengabaikan permintaan dari ekstensi Chrome
      if (e.request.url.startsWith('chrome-extension://')) {
        return fetch(e.request);
      }

      const cache = await caches.open(cacheName)
      const resCache = await cache.match(e.request)

      if (resCache) return resCache

      try {
        const res = await fetch(e.request)

        // Menghindari masalah dengan modifikasi body di dalam cache.
        // Kloning respons sebelum menyimpan di cache.
        const resClone = res.clone()
        cache.put(e.request, resClone)

        return res
      } catch (error) {
        console.log(error)
        // Jika terjadi kesalahan, tetap kembalikan respons dari cache jika tersedia.
        return resCache || new Response(null, { status: 404, statusText: 'Not Found' })
      }
    })(),
  )
})
