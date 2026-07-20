import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Package className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              Rydex <span className="text-accent">Swift</span>
            </span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            India's trusted vehicle management and courier delivery platform.
            Fast, reliable, and affordable transportation and parcel solutions
            across the country.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-70">
            {[
              { label: "Home", path: "/" },
              { label: "Track Parcel", path: "/track" },
              { label: "Calculate Cost", path: "/calculate" },
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Vehicle Management</li>
            <li>Same Day Delivery</li>
            <li>Overnight Delivery</li>
            <li>Standard Delivery</li>
            <li>International Shipping</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-display font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              Kolkata, West Bengal, India
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              support@rydexswift.in
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Rydex Swift. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;