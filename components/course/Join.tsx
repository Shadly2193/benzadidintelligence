'use client';
import { FormEvent, useState } from 'react';
import { useCourse } from '@/lib/course/content';
import { useDeadline } from '@/lib/course/useDeadline';

const MINI = [
  <span className="mini" key="1"><i /><i /><i /></span>,
  <span className="mini" key="2"><i className="bub">Hello, I want to join</i></span>,
  <span className="mini" key="3"><i className="key">🔑</i></span>,
];

export default function Join() {
  const { join, waLink } = useCourse();
  const [ok, setOk] = useState('');
  const [hasBmdc, setHasBmdc] = useState<'yes' | 'no' | ''>('');
  const { phase } = useDeadline(60000);
  const fl = join.fields;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const img = f.get('idimg');
    const lines = [
      'Hello, I want to join the Digital Residency Program.',
      `${fl.name}: ${f.get('name')}`,
      `${fl.fb}: ${f.get('fb')}`,
      `${fl.college}: ${f.get('college')}`,
      `${fl.session}: ${f.get('session')}`,
      hasBmdc === 'yes' ? `${fl.bmdc}: ${f.get('bmdc')}` : `Student, ${f.get('year')}`,
      img instanceof File && img.size > 0 ? 'I will send my ID image here.' : '',
      'I have read the details and the refund rules, and I agree.',
    ].filter(Boolean);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    setOk(join.thanks);
  };
  return (
    <section className="grid-bg" id="join">
      <div className="wrap">
        <p className="label rv">{join.label}</p>
        <h2 className="rv">{join.title}</h2>
        <div className="steps">
          {join.steps.map(([h, t], i) => (
            <div className={`card step rv d${i}`} key={h}>
              {MINI[i]}
              <div className="num">{i + 1}</div>
              <h3>{h}</h3>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <form className="card corner jform rv" onSubmit={onSubmit} autoComplete="off">
          <label>
            {fl.name}
            <input name="name" required maxLength={80} placeholder="Dr. / Name" />
          </label>
          <label>
            {fl.fb}
            <input name="fb" required maxLength={80} placeholder="Your Facebook profile name" />
          </label>
          <label>
            {fl.college}
            <input name="college" required maxLength={120} placeholder="e.g. Dhaka Medical College" />
          </label>
          <label>
            {fl.session}
            <input name="session" required maxLength={20} placeholder="e.g. 2019-20" />
          </label>
          <fieldset className="bmdc-q">
            <legend>{fl.hasBmdc}</legend>
            <label className="chk">
              <input type="radio" name="hasbmdc" value="yes" required checked={hasBmdc === 'yes'} onChange={() => setHasBmdc('yes')} /> Yes
            </label>
            <label className="chk">
              <input type="radio" name="hasbmdc" value="no" checked={hasBmdc === 'no'} onChange={() => setHasBmdc('no')} /> No, I am a student
            </label>
          </fieldset>
          {hasBmdc === 'yes' && (
            <label>
              {fl.bmdc}
              <input name="bmdc" required inputMode="numeric" maxLength={20} placeholder="Your BMDC registration number" />
            </label>
          )}
          {hasBmdc === 'no' && (
            <label>
              {fl.year}
              <select name="year" required defaultValue="">
                <option value="">Choose your year</option>
                {join.years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </label>
          )}
          <label>
            {fl.idImg}
            <input type="file" name="idimg" accept="image/jpeg,image/png,image/webp" />
          </label>
          <p className="sm">{join.idNote}</p>
          <label className="chk">
            <input type="checkbox" name="agree" required /> {join.agree}
          </label>
          {phase === 'closed' ? (
            <p className="ok">{join.closedNote}</p>
          ) : (
            <button className="btn btn-main" type="submit">
              {join.submit}
            </button>
          )}
          <p className="ok" role="status">{ok}</p>
        </form>
      </div>
    </section>
  );
}
