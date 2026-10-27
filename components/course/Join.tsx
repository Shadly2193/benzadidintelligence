'use client';
import { FormEvent, useState } from 'react';
import { join, waLink } from '@/lib/course/site';

const MINI = [
  <span className="mini" key="1"><i /><i /><i /></span>,
  <span className="mini" key="2"><i className="bub">Hello, I want to join</i></span>,
  <span className="mini" key="3"><i className="key">🔑</i></span>,
];

export default function Join() {
  const [ok, setOk] = useState('');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg =
      'Hello, I want to join the Digital Residency Program.\nName: ' + f.get('name') +
      '\nFacebook: ' + (f.get('fb') || '-') +
      '\nI am a: ' + f.get('stage') +
      '\nBMDC / college: ' + f.get('bmdc') +
      '\nI have read the details and the refund rules, and I agree.';
    window.open(waLink(msg), '_blank', 'noopener');
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
            Full name
            <input name="name" required placeholder="Dr. / Name" />
          </label>
          <label>
            Facebook name
            <input name="fb" placeholder="Your Facebook profile name" />
          </label>
          <label>
            I am a
            <select name="stage" required defaultValue="">
              <option value="">Choose your stage</option>
              {join.stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            BMDC number, or college name and year
            <input name="bmdc" required placeholder="BMDC number, or college and year" />
          </label>
          <label>
            BMDC card or student ID image
            <input type="file" name="idimg" accept="image/*" />
          </label>
          <p className="sm">{join.idNote}</p>
          <p className="devnote">{join.devNote}</p>
          <label className="chk">
            <input type="checkbox" name="agree" required /> {join.agree}
          </label>
          <button className="btn btn-main" type="submit">
            {join.submit}
          </button>
          <p className="ok" role="status">{ok}</p>
        </form>
      </div>
    </section>
  );
}
