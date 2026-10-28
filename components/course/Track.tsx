'use client';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Ev = 'view' | 'cta_join' | 'cta_whatsapp' | 'form_start' | 'form_submit';

/**
 * Funnel counts for the admin dashboard. No names, no IPs: only a random id kept in this browser,
 * and each event counted once per browser tab session.
 */
export default function Track() {
  useEffect(() => {
    if (new URLSearchParams(location.search).has('preview')) return;
    let visitor = '';
    try {
      visitor = localStorage.getItem('dr-visitor') ?? '';
      if (!visitor) localStorage.setItem('dr-visitor', (visitor = crypto.randomUUID()));
    } catch {}
    const sent = new Set<string>();
    try {
      JSON.parse(sessionStorage.getItem('dr-sent') ?? '[]').forEach((e: string) => sent.add(e));
    } catch {}

    const send = (event: Ev, el?: Element | null) => {
      if (sent.has(event)) return;
      sent.add(event);
      try {
        sessionStorage.setItem('dr-sent', JSON.stringify([...sent]));
      } catch {}
      const section = el?.closest('section, header')?.id ?? null;
      createClient()
        .from('course_events')
        .insert({ event, section, visitor: visitor || null })
        .then(() => {});
    };

    send('view');
    const root = document.querySelector('.dr-page');
    if (!root) return;
    const onClick = (e: Event) => {
      const a = (e.target as Element).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (href === '#price' || href === '#join') send('cta_join', a);
      else if (href.includes('wa.me')) send('cta_whatsapp', a);
    };
    const onFocus = (e: Event) => {
      if ((e.target as Element).closest('.jform')) send('form_start', e.target as Element);
    };
    const onSubmit = (e: Event) => {
      if ((e.target as Element).classList.contains('jform')) send('form_submit', e.target as Element);
    };
    root.addEventListener('click', onClick);
    root.addEventListener('focusin', onFocus);
    root.addEventListener('submit', onSubmit);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('focusin', onFocus);
      root.removeEventListener('submit', onSubmit);
    };
  }, []);
  return null;
}
