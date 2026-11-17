'use client';
import { useEffect, useRef } from 'react';
import type { Map as LMap, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './collegeMap.css';

export interface MapPin {
  key: string;
  ll: [number, number];
  n: number;
  popup: string; // plain text lines, joined with \n
}

const BD: [number, number][] = [[20.5, 88.0], [26.7, 92.8]];
const TILES = 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_';
const PIN =
  '<svg viewBox="0 0 24 32" aria-hidden="true"><path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill="#FF6A00"/><circle cx="12" cy="12" r="4.5" fill="#0a0603"/></svg>';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Bangladesh-only dark map with glowing college pins. Leaflet loads in the browser only. */
export default function CollegeMap({ pins, focus }: { pins: MapPin[]; focus?: string | null }) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const lib = useRef<typeof import('leaflet') | null>(null);
  const pinsRef = useRef(pins);
  pinsRef.current = pins;

  const draw = () => {
    const L = lib.current;
    if (!L || !layer.current) return;
    layer.current.clearLayers();
    for (const p of pinsRef.current) {
      const icon = L.divIcon({
        className: '',
        html: `<div class="cmap-pin">${PIN}${p.n > 1 ? `<i>${p.n}</i>` : ''}</div>`,
        iconSize: [22, 30],
        iconAnchor: [11, 30],
        popupAnchor: [0, -28],
      });
      L.marker(p.ll, { icon, title: p.popup.split('\n')[0] })
        .bindPopup(p.popup.split('\n').map(esc).join('<br>'), { className: 'cmap-pop' })
        .addTo(layer.current);
    }
  };

  useEffect(() => {
    let dead = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (dead || !box.current || map.current) return;
      lib.current = L;
      const m = L.map(box.current, {
        zoomSnap: 0.25,
        maxBounds: L.latLngBounds(BD).pad(0.15),
        maxBoundsViscosity: 1,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      map.current = m;
      m.fitBounds(BD, { padding: [14, 14] });
      L.tileLayer(TILES + 'Base/MapServer/tile/{z}/{y}/{x}', { attribution: '© Esri', maxZoom: 16, className: 'cmap-base' }).addTo(m);
      for (const [name, z] of [['lbl', '450'], ['msk', '460']] as const) {
        m.createPane(name);
        m.getPane(name)!.style.zIndex = z;
        m.getPane(name)!.style.pointerEvents = 'none';
      }
      L.tileLayer(TILES + 'Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, pane: 'lbl' }).addTo(m);
      layer.current = L.layerGroup().addTo(m);
      draw();
      m.on('click', () => m.scrollWheelZoom.enable());

      const geo = await fetch('/geo/bangladesh.json').then((r) => r.json()).catch(() => null);
      if (dead || !geo) return;
      const holes: [number, number][][] = [];
      for (const f of geo.features) {
        const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
        for (const poly of polys) holes.push(poly[0].map(([x, y]: number[]) => [y, x]));
      }
      L.polygon([[[-90, -180], [-90, 180], [90, 180], [90, -180]], ...holes], {
        stroke: false, fillColor: '#0a0603', fillOpacity: 1, interactive: false, pane: 'msk',
      }).addTo(m);
      L.geoJSON(geo, { style: { color: '#FF6A00', weight: 1.5, fill: false }, interactive: false, pane: 'msk' }).addTo(m);
      const fit = () => m.setMinZoom(m.getBoundsZoom(BD, false, L.point(28, 28)));
      fit();
      m.on('resize', fit);
    })();
    return () => {
      dead = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(draw, [pins]);

  useEffect(() => {
    const p = pins.find((x) => x.key === focus);
    if (p && map.current) map.current.flyTo(p.ll, 11);
  }, [focus, pins]);

  return <div ref={box} className="cmap" />;
}
