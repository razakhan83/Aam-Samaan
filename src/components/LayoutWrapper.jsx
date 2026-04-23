import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, CreditCard, MapPin, Truck } from 'lucide-react';

import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import Navbar from '@/components/Navbar';
import StoreDeferredChrome from '@/components/StoreDeferredChrome';
import StoreLogo from '@/components/StoreLogo';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { normalizeSocialUrl } from '@/lib/social';
import { createWhatsAppUrl } from '@/lib/whatsapp';

function NavbarFallback() {
  return <div className="sticky top-0 z-40 h-[100px] bg-card" aria-hidden="true" />;
}

const PAYMENT_METHODS = [
  {
    label: 'Easypaisa',
    src: '/easypaisa-new-logo-0B6AAF8329-seeklogo.com-removebg-preview.png.webp',
    width: 150,
    height: 48,
    className: 'max-h-12',
  },
  {
    label: 'JazzCash',
    src: '/JazzCash.webp',
    width: 150,
    height: 48,
    className: 'max-h-9',
  },
  {
    label: 'Cash on Delivery',
    src: '/Cash_On_Delivery__Cash__Delivery_PNG_Image_For_Free_Download-removebg-preview-1.png.webp',
    width: 150,
    height: 48,
    className: 'max-h-14',
  },
];

export default function LayoutWrapper({ children, categories, settings }) {
  const whatsappLink = createWhatsAppUrl(settings.whatsappNumber);
  const facebookUrl = normalizeSocialUrl(settings.facebookPageUrl);
  const instagramUrl = normalizeSocialUrl(settings.instagramUrl);
  const socialLinks = [
    { href: facebookUrl, label: 'Facebook', icon: FacebookIcon },
    { href: instagramUrl, label: 'Instagram', icon: InstagramIcon },
    { href: whatsappLink, label: 'WhatsApp', icon: WhatsAppIcon },
  ];

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        <Suspense fallback={<NavbarFallback />}>
          <Navbar
            categories={categories}
            storeName={settings.storeName}
            navbarLogoUrl={settings.navbarLogoUrl}
            lightLogoUrl={settings.lightLogoUrl}
            darkLogoUrl={settings.darkLogoUrl}
            logoScalePercent={settings.logoScalePercent}
            announcementBarEnabled={settings.announcementBarEnabled}
            announcementBarText={settings.announcementBarText}
            announcementBarMessages={settings.announcementBarMessages}
          />
        </Suspense>

        <main className="flex-grow">{children}</main>

        <footer className="mt-auto border-t border-border bg-white pb-[calc(env(safe-area-inset-bottom)+var(--mobile-bottom-nav-offset))] pt-10 text-foreground md:pb-7 md:pt-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr] lg:gap-10">
              <div className="sm:col-span-2 lg:col-span-1">
                <StoreLogo
                  storeName={settings.storeName}
                  logoUrl={settings.footerLogoUrl}
                  lightLogoUrl={settings.lightLogoUrl}
                  darkLogoUrl={settings.darkLogoUrl}
                  logoScalePercent={settings.logoScalePercent}
                  variant="light-surface"
                  compact
                  className="mb-4"
                />
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                  A premium destination for kitchenware, home decor, and lifestyle pieces chosen for everyday elegance.
                </p>
                <div className="mt-5 flex gap-3">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href || undefined}
                      target={href ? '_blank' : undefined}
                      rel={href ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      aria-disabled={!href}
                      className={`inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background transition-[transform,border-color,background-color,color,opacity] duration-300 ${
                        href ? 'hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground' : 'cursor-not-allowed opacity-45'
                      }`}
                    >
                      <Icon className={label === 'WhatsApp' ? 'size-5' : 'size-4'} />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Quick Links</h3>
                <ul className="flex flex-col gap-3 text-sm text-muted-foreground md:text-base">
                  {[
                    { href: '/about-us', label: 'About Us' },
                    { href: '/refund-policy', label: 'Refund Policy' },
                    { href: '/privacy-policy', label: 'Privacy Policy' },
                    { href: '/shipping-policy', label: 'Shipping Policy' },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                        <ChevronRight className="size-4" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Contact</h3>
                <ul className="flex flex-col gap-4 text-sm text-muted-foreground md:text-base">
                  <li className="flex items-start gap-3">
                    <WhatsAppIcon className="mt-1 size-4 shrink-0" />
                    <div>
                      <span className="block font-semibold text-foreground">WhatsApp</span>
                      <a href={whatsappLink || '#'} className="transition-colors hover:text-primary">
                        {settings.whatsappNumber}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4" />
                    <div>
                      <span className="block font-semibold text-foreground">Location</span>
                      <span>Karachi, Pakistan</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck className="mt-0.5 size-4" />
                    <div>
                      <span className="block font-semibold text-foreground">Delivery</span>
                      <span>Nationwide shipping and order support via WhatsApp</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <Image
                      key={method.label}
                      src={method.src}
                      alt={method.label}
                      width={method.width}
                      height={method.height}
                      sizes="(max-width: 640px) 30vw, 118px"
                      className={`${method.className} w-auto object-contain`}
                    />
                  ))}
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Pay with Easypaisa, JazzCash, or cash on delivery across Pakistan.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:text-left md:flex-row">
              <p>&copy; {settings.storeName || 'China Unique Store'}. All rights reserved.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-foreground">
                  <CreditCard className="size-4" />
                  Secure payment options
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <StoreDeferredChrome whatsappNumber={settings.whatsappNumber} storeName={settings.storeName} />
    </>
  );
}
