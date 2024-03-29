const CACHE = 'cache-and-update-v1';

const gitURL = [
'/pwa',
'/pwa/index.html',
'/pwa/Manifest.json',
'/pwa/Script.js',
'/pwa/Style.css',
'/pwa/favicon.ico'
];

const localURL = [
'/',
'/index.html',
'/Manifest.json',
'/Script.js',
'/Style.css',
'/favicon.ico'
];

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll(gitURL);
        })
    );
});

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', function(event) {
    // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
    event.respondWith(fromCache(event.request));
    // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
};
