import { useEffect, useRef, useState } from 'react';
import { instagramProfile } from '../data/site';
import posts from '../data/instagram.json';
import { SectionHead, Arrow, BrandMark } from '../lib';
import { asset } from '../utils';

const firstLine = (caption) => caption.split('\n').find((l) => l.trim()) ?? 'Instagram post by BlueNova Tech';
// Each wall column starts at a different post so neighbours never match.
const column = (offset) => posts.map((_, i) => posts[(i + offset) % posts.length]);
const COLUMNS = [0, 3, 6, 9];

export default function Instagram() {
  const p = instagramProfile;
  const [open, setOpen] = useState(null);

  return (
    <section className="section ig-section" id="instagram">
      <div className="ig-aurora" aria-hidden="true" />
      <div className="wrap">
        <div className="ig-top">
          <SectionHead
            index="04"
            label="Instagram"
            title={
              <>
                Fresh off our <em>feed</em>.
              </>
            }
          >
            Our latest posts from @{p.handle}: campaigns, reels and the ideas we share with the brands we grow. Tap any
            post to see it in full.
          </SectionHead>

          <div className="ig-profile">
            <div className="ig-id">
              <span className="ig-ring">
                <span className="ig-avatar">
                  <BrandMark size={30} />
                </span>
              </span>
              <div>
                <b>{p.name}</b>
                <a href={p.url} target="_blank" rel="noreferrer" className="mono">
                  @{p.handle}
                </a>
              </div>
            </div>
            <dl className="ig-stats">
              <div>
                <dt className="mono">Posts</dt>
                <dd>{p.postsCount}</dd>
              </div>
              <div>
                <dt className="mono">Followers</dt>
                <dd>{p.followersCount}</dd>
              </div>
              <div>
                <dt className="mono">Following</dt>
                <dd>{p.followingCount}</dd>
              </div>
            </dl>
            <div className="ig-actions">
              <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-ig">
                <InstagramIcon /> Follow @{p.handle} <Arrow />
              </a>
              <a href={p.creatorHubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Creator Hub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ig-wall">
        {COLUMNS.map((offset, ci) => {
          const items = column(offset).slice(0, 5);
          return (
            <div key={offset} className={`ig-col ig-col-${ci}`} aria-hidden="true">
              <div className="ig-col-track">
                {[...items, ...items].map((post, i) => (
                  <button key={`${post.code}-${i}`} type="button" tabIndex={-1} className="ig-tile" onClick={() => setOpen(post)}>
                    <img src={asset(post.thumb)} alt="" width="480" height="640" loading="lazy" decoding="async" />
                    {post.type === 'Reel' && <ReelIcon />}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="ig-phone-stage">
          <div className="ig-phone">
            <span className="ig-notch" aria-hidden="true" />
            <div className="ig-screen">
              <div className="ig-app-bar">
                <b>{p.handle}</b>
                <InstagramIcon />
              </div>
              <div className="ig-app-head">
                <span className="ig-ring ig-ring-sm">
                  <span className="ig-avatar">
                    <BrandMark size={22} />
                  </span>
                </span>
                <span>
                  <b>{p.postsCount}</b>posts
                </span>
                <span>
                  <b>{p.followersCount}</b>followers
                </span>
                <span>
                  <b>{p.followingCount}</b>following
                </span>
              </div>
              <p className="ig-app-bio">
                <b>{p.name}</b>
                Digital marketing & web agency · Gujarat
              </p>
              <a href={p.url} target="_blank" rel="noreferrer" className="ig-app-follow">
                Follow
              </a>
              <div className="ig-app-tabs" aria-hidden="true">
                <i className="is-on" />
                <i />
                <i />
              </div>
              <ul className="ig-app-grid" aria-label={`Latest posts from @${p.handle}`}>
                {posts.map((post) => (
                  <li key={post.code}>
                    <button type="button" onClick={() => setOpen(post)}>
                      <img
                        src={asset(post.thumb)}
                        alt={firstLine(post.caption)}
                        width="480"
                        height="640"
                        loading="lazy"
                        decoding="async"
                      />
                      {post.type === 'Reel' && <ReelIcon />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Viewer
          post={open}
          onClose={() => setOpen(null)}
          onNav={(d) => setOpen((cur) => posts[(posts.indexOf(cur) + d + posts.length) % posts.length])}
        />
      )}
    </section>
  );
}

function Viewer({ post, onClose, onNav }) {
  const ref = useRef(null);
  const nav = useRef(onNav);
  useEffect(() => {
    nav.current = onNav;
  });

  useEffect(() => {
    ref.current.showModal();
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nav.current(1);
      if (e.key === 'ArrowLeft') nav.current(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <dialog
      ref={ref}
      className="ig-viewer"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
      aria-label="Instagram post"
    >
      <div className="ig-viewer-card" key={post.code}>
        <img src={asset(post.image)} alt={firstLine(post.caption)} width={post.width} height={post.height} />
        <div className="ig-viewer-side">
          <p className="mono">{post.type} · @bluenova_tech</p>
          <p className="ig-viewer-caption">{post.caption}</p>
          <a href={post.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-ig">
            <InstagramIcon /> View on Instagram <Arrow />
          </a>
        </div>
      </div>
      <button type="button" className="ig-viewer-btn ig-viewer-close" onClick={() => ref.current.close()} aria-label="Close">
        ×
      </button>
      <button type="button" className="ig-viewer-btn ig-viewer-prev" onClick={() => onNav(-1)} aria-label="Previous post">
        ‹
      </button>
      <button type="button" className="ig-viewer-btn ig-viewer-next" onClick={() => onNav(1)} aria-label="Next post">
        ›
      </button>
    </dialog>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ReelIcon() {
  return (
    <svg className="ig-reel" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M10 8.5v7l6-3.5z" fill="#fff" />
    </svg>
  );
}
