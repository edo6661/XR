import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#03060c] border-t border-border pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex flex-col leading-none mb-6 w-fit">
            <span className="font-heading text-2xl font-bold tracking-[0.25em] text-foreground">XR</span>
            <span className="font-heading text-[0.6rem] font-light tracking-[0.4em] text-accent uppercase">Summits</span>
          </Link>
          <p className="text-sm text-foreground-muted max-w-xs leading-relaxed">
            Asia's definitive platform connecting innovators and shaping the future of immersive technology.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm tracking-widest text-foreground uppercase mb-6">Location</h4>
          <address className="not-italic text-sm text-foreground-muted leading-relaxed">
            Sunway Innovation Hub,<br />
            Bandar Sunway, 47500<br />
            Petaling Jaya, Selangor,<br />
            Malaysia
          </address>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm tracking-widest text-foreground uppercase mb-6">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-foreground-muted">
            <li><a href="mailto:hello@xrsummits.com" className="hover:text-accent transition-colors">hello@xrsummits.com</a></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Form</Link></li>
            <li><Link to="/sponsorship" className="hover:text-accent transition-colors">Sponsorship</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-[0.7rem] text-foreground-muted tracking-wide">
        <p>&copy; {new Date().getFullYear()} XR Summits. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;