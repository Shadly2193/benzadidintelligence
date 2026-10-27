'use client';
import { cx, useFlags, useTyped } from '@/lib/course/useScroll';

const Win = ({ title, children, cap }: { title: string; children: React.ReactNode; cap: string }) => (
  <>
    <div className="win">
      <div className="bar">
        <b />
        <b />
        <b />
        <em>{title}</em>
      </div>
      {children}
    </div>
    <p className="cap2">{cap}</p>
  </>
);

/* Each panel finishes its animation in about 2.5 seconds. */

export function WebsitePanel() {
  const t = useTyped('Build a website for a dental surgeon. Dark theme, orange buttons, an appointment button.', 10);
  const f = useFlags([950, 1200, 1450, 1700, 1950]);
  const done = f.every(Boolean);
  const status = !f[0] ? '' : done ? 'Done. Now you improve it.' : 'Building...';
  return (
    <Win title="YOUR WEBSITE, BUILT BY TALKING TO AI" cap="You describe it. AI builds it. You check it and improve it.">
      <div className="code">
        <div className="chat">
          <div className="bubble">
            <span>{t}</span>
            <span className="cur" />
          </div>
          <div className="status">{status}</div>
        </div>
        <div className="site">
          <div className={cx('blk s-nav', f[0] && 'show')}>
            <b />
            <span>Home · About · Services · Contact</span>
          </div>
          <div className={cx('blk s-hero', f[1] && 'show')}>
            <h4>Dr. Your Name</h4>
            <p>Dental surgeon. Book your visit.</p>
            <span>Book appointment</span>
          </div>
          <div className={cx('blk s-cards', f[2] && 'show')}>
            <div />
            <div />
            <div />
          </div>
          <div className={cx('blk s-cta', f[3] && 'show')}>Contact and clinic map</div>
          <div className={cx('blk s-live', f[4] && 'show')}>
            <i />
            yourname.com is live
          </div>
        </div>
      </div>
    </Win>
  );
}

export function EditPanel() {
  // 0-2 commands, 3-6 clip groups, 7 caption, 8 playhead start
  const f = useFlags([100, 450, 800, 150, 450, 750, 1050, 800, 650]);
  const c = (k: number) => (f[3 + k] ? 'show' : '');
  return (
    <Win title="YOUR VIDEO, EDITED BY COMMAND" cap="Edit like a professional. You only say what you want.">
      <div className="prev">
        <div className="face" />
        <div className={cx('capt', f[7] && 'show')}>
          Your <b>caption</b> appears here
        </div>
      </div>
      <div className="tl">
        <div className="playhead" style={{ opacity: f[8] ? 1 : 0, left: f[8] ? 'calc(100% - 16px)' : '14px' }} />
        <div className="trk v">
          <i className={c(0)} style={{ left: 0, width: '18%' }} />
          <i className={c(0)} style={{ left: '20%', width: '30%' }} />
          <i className={c(0)} style={{ left: '52%', width: '46%' }} />
        </div>
        <div className="trk cut">
          <i className={c(1)} style={{ left: '19%' }} />
          <i className={c(1)} style={{ left: '51%' }} />
        </div>
        <div className="trk t">
          <i className={c(2)} style={{ left: '4%', width: '90%' }} />
        </div>
        <div className="trk a">
          <i className={c(3)} style={{ left: 0, width: '98%' }} />
        </div>
      </div>
      <div className="cmds">
        {['"Cut the silences"', '"Add captions"', '"Add music, keep my voice clear"'].map((s, i) => (
          <span key={s} className={f[i] ? 'show' : ''}>
            {s}
          </span>
        ))}
      </div>
    </Win>
  );
}

export function ResearchPanel() {
  const t = useTyped('Find recent studies on my topic. Compare them. Write a short review with references.', 10);
  const f = useFlags([900, 1150, 1400, 1650, 1000, 1250, 1500, 1750, 2000]);
  return (
    <Win title="YOUR RESEARCH, DONE BY COMMAND" cap="Clinical, public health or your own field. Ask in plain words, then check the work.">
      <div className="code">
        <div className="chat">
          <div className="bubble">
            <span>{t}</span>
            <span className="cur" />
          </div>
          <ul className="stp3">
            {['Search papers', 'Read and compare', 'Make a summary table', 'Write the draft and references'].map((s, i) => (
              <li key={s} className={f[i] ? 'on' : ''}>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="site">
          <div className={cx('blk rtab', f[4] && 'show')}>
            <span>Study</span>
            <span>Method</span>
            <span>Finding</span>
          </div>
          {[5, 6, 7].map((k) => (
            <div key={k} className={cx('blk rrow', f[k] && 'show')}>
              <i />
              <i />
              <i />
            </div>
          ))}
          <div className={cx('blk rdoc', f[8] && 'show')}>
            <b>Draft review</b>
            <i />
            <i />
            <i style={{ width: '70%' }} />
            <em>References ✓</em>
          </div>
        </div>
      </div>
    </Win>
  );
}

export function BrandPanel() {
  const f = useFlags([100, 350, 600, 850, 1100, 1350, 1600, 1900]);
  const s = (k: number) => (f[k] ? 'show' : '');
  return (
    <Win title="YOUR BRAND, TAKING SHAPE" cap="One clear story. One look. Everywhere people find you.">
      <div className="brand">
        <div className={cx('bcover blk', s(0))} />
        <div className="bhead">
          <div className={cx('bav blk', s(1))} />
          <div>
            <h4 className={cx('blk', s(2))}>Dr. Your Name</h4>
            <p className={cx('blk', s(2))}>Dental Surgeon · Your city</p>
          </div>
          <div className={cx('bsw blk', s(3))}>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className={cx('bbad blk', s(4))}>
          <span>Facebook page ✓</span>
          <span>Website ✓</span>
          <span>Videos ✓</span>
          <span>Google profile ✓</span>
        </div>
        <div className="btiles">
          <i className={cx('blk', s(5))} />
          <i className={cx('blk', s(5))} />
          <i className={cx('blk', s(6))} />
        </div>
        <div className={cx('bfol blk', s(7))}>
          <span className="av">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>{' '}
          Your audience grows
        </div>
      </div>
    </Win>
  );
}

const NODES: [string, number, number, number][] = [
  ['Website', 350, 200, 28],
  ['Facebook', 70, 50, 28],
  ['YouTube', 350, 50, 28],
  ['Google', 70, 200, 28],
  ['WhatsApp', 210, 30, 24],
  ['Patients', 210, 222, 26],
];

export function MarketingPanel() {
  const f = useFlags([120, 420, 720, 1020, 1320, 1620]);
  return (
    <Win title="SOCIAL MEDIA + WEBSITE + GOOGLE, WORKING TOGETHER" cap="Understand how every part connects, then plan your own path.">
      <svg className="mk" viewBox="0 0 420 250">
        <g className="mlines">
          {NODES.map(([, x, y], k) => (
            <line key={k} className={f[k] ? 'on' : ''} x1="210" y1="125" x2={x} y2={y} />
          ))}
        </g>
        <g className="mn on">
          <circle cx="210" cy="125" r="34" />
          <text x="210" y="130" textAnchor="middle">YOU</text>
        </g>
        {NODES.map(([name, x, y, r], k) => (
          <g key={name} className={cx('mn', f[k] && 'on')}>
            <circle cx={x} cy={y} r={r} />
            <text x={x} y={y + 4} textAnchor="middle">{name}</text>
          </g>
        ))}
      </svg>
    </Win>
  );
}

/** DEMO DATA ONLY. Shows a patient list filling, grouping, and a reminder being drafted. */
const PATIENTS: [string, string, 1 | 2][] = [
  ['Patient A', 'Last visit: Jan', 1],
  ['Patient B', 'Last visit: Mar', 2],
  ['Patient C', 'Last visit: Dec', 1],
  ['Patient D', 'Last visit: Apr', 2],
  ['Patient E', 'Last visit: Nov', 1],
  ['Patient F', 'Last visit: May', 2],
];

export function PracticePanel() {
  const f = useFlags([100, 350, 600, 850, 1100, 1350, 1600, 2000]);
  const grouped = f[6];
  return (
    <Win title="AI IN YOUR PRACTICE · DEMO DATA ONLY" cap="AI sorts the list and drafts the message. You check it and decide.">
      <div className="rtbl">
        <div className="crow head">
          <span>PATIENT</span>
          <span>VISIT</span>
          <span>GROUP</span>
        </div>
        {PATIENTS.map(([n, v, g], i) => (
          <div key={n} className={cx('crow', `g${g}`, f[i] && 'show', grouped && 'grouped')}>
            <span>{n}</span>
            <span>{v}</span>
            <span className="tag">{grouped ? (g === 1 ? 'CHECK-UP DUE' : 'ROUTINE') : '...'}</span>
          </div>
        ))}
      </div>
      <div className={cx('msgcard', f[7] && 'show')}>
        <small>DRAFT REMINDER · YOU REVIEW BEFORE SENDING</small>
        Dear patient, it is time for your check-up. Please book your visit.
      </div>
      <span className="demoflag">Demo data only. No real patient information.</span>
    </Win>
  );
}
