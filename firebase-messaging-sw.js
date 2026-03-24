importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDqC0bDjdK2EkAJCIidEYrU0",
  authDomain: "barbearia-juninho-e-mirinho.firebaseapp.com",
  projectId: "barbearia-juninho-e-mirinho",
  storageBucket: "barbearia-juninho-e-mirinho.appspot.com",
  messagingSenderId: "942836608130",
  appId: "1:942836608130:web:1e6bca4780f314b88d189b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || '🚗 Tô Indo';
  const body = payload.notification?.body || 'Nova corrida disponível!';

  self.registration.showNotification(title, {
    body: body,
    icon: 'https://jjunimsalao-jpg.github.io/Juninho/icon-192.png',
    badge: 'https://jjunimsalao-jpg.github.io/Juninho/icon-192.png',
    vibrate: [300, 100, 300, 100, 300],
    tag: 'nova-corrida',
    renotify: true,
    data: payload.data,
    actions: [
      { action: 'aceitar', title: '✓ Aceitar' },
      { action: 'recusar', title: '✕ Recusar' }
    ]
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'aceitar' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        for (const client of clientList) {
          if (client.url.includes('toindo') && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow('https://jjunimsalao-jpg.github.io/Juninho/toindo-1.html');
      })
    );
  }
});
