<template>
  <div>
    <h1>Interaktive Karte von Oberfranken</h1>
    <div id="map" style="height: 100vh;"></div>
  </div>
</template>

<script>
// Importiere Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'InteractiveMap',
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      // Initialisiere die Karte mit den Koordinaten von Oberfranken
      const map = L.map('map', {
        center: [49.75, 11.5],  // Geografische Mitte von Oberfranken
        zoom: 10,  // Zoom-Level für Oberfranken
      });

      // Füge OpenStreetMap als Standard-Kachel-Layer hinzu
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Füge Marker für Oberfranken hinzu
      const markerData = [
        { lat: 49.9597, lng: 11.5762, name: 'Bayreuth', info: 'Hauptstadt der Oberfranken' },
        { lat: 50.1041, lng: 11.5769, name: 'Kulmbach', info: 'Stadt mit Brautradition' },
      ];

      // Marker für jedes Objekt in markerData
      markerData.forEach((place) => {
        const marker = L.marker([place.lat, place.lng]).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.info}`);
      });
    },
  },
};
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}

h1 {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-family: 'Arial', sans-serif;
  color: #333;
}
</style>
