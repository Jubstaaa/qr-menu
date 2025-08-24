import { Button, Link } from "@heroui/react";
import {
  FaQrcode,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Ürün",
      links: [
        { name: "Özellikler", href: "#features" },
        { name: "Fiyatlandırma", href: "#pricing" },
        { name: "Entegrasyonlar", href: "#integrations" },
        { name: "API", href: "#api" },
      ],
    },
    {
      title: "Şirket",
      links: [
        { name: "Hakkımızda", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Kariyer", href: "#careers" },
        { name: "Basın", href: "#press" },
      ],
    },
    {
      title: "Destek",
      links: [
        { name: "Yardım Merkezi", href: "#help" },
        { name: "Dokümantasyon", href: "#docs" },
        { name: "Topluluk", href: "#community" },
        { name: "İletişim", href: "#contact" },
      ],
    },
    {
      title: "Yasal",
      links: [
        { name: "Gizlilik", href: "#privacy" },
        { name: "Kullanım Şartları", href: "#terms" },
        { name: "KVKK", href: "#kvkk" },
        { name: "Çerezler", href: "#cookies" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    { name: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FaQrcode className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">QR Menu</h3>
                  <p className="text-sm text-gray-400">Dijital Menü Sistemi</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Restoranınızın menüsünü dijitalleştirin ve müşteri deneyimini
                artırın.
              </p>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-sm font-semibold text-white">
                  {section.title}
                </h4>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 text-sm block transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-700" />

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 QR Menu. Tüm hakları saklıdır.
            </p>

            <div className="flex items-center gap-4">
              {/* Social Links */}
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Button
                    isIconOnly
                    variant="light"
                    color="default"
                    size="sm"
                    aria-label={social.name}
                  >
                    <social.icon />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
