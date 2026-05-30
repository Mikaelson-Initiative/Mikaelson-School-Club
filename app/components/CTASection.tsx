import Reveal from './Reveal';
import { IconArrow } from './Icons';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal>
          <div className="cta-band">
            <div className="cta-blob cta-blob-tr" />
            <div className="cta-blob cta-blob-bl" />
            <span className="label nodash" style={{ justifyContent: 'center', display: 'flex' }}>
              Ready when you are
            </span>
            <h2 className="display">Ready to start your growth journey?</h2>
            <p>
              The Mikaelson Initiative brings together students committed to growth, leadership,
              and creating meaningful impact in their schools and communities.
            </p>
            <div className="cta-actions">
              <Link href="/get-involved" className="btn btn-turquoise">
                Join the Club <IconArrow size={16} className="arr" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
