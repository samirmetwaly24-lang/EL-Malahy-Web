import { Ticket, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";
import elMalahyLogo from "@assets/image_1771636686477.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 rounded-t-[3rem] mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group cursor-pointer">
              <img 
                src={elMalahyLogo} 
                alt="ElMalahy - The Land of Amusement" 
                className="h-14 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Creating magical memories for families and thrill-seekers since 1995. Come experience the joy!
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/attractions" className="hover:text-secondary transition-colors">Rides & Games</Link></li>
              <li><Link href="/packages" className="hover:text-secondary transition-colors">Ticket Packages</Link></li>
              <li><Link href="/events" className="hover:text-secondary transition-colors">Upcoming Events</Link></li>
              <li><Link href="/booking" className="hover:text-secondary transition-colors">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-secondary">Park Info</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Open Daily: 10AM - 10PM</li>
              <li>123 Amusement Way</li>
              <li>Orlando, FL 32801</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-secondary">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} ElMalahy Amusement Park. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
