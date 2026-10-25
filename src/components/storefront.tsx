"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent, type TouchEvent } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { CartDrawer, type CartViewItem } from "@/components/cart-drawer";
import { Icon, type IconName } from "@/components/icon";
import { formatNaira, type StoreProduct } from "@/lib/products";

type DetailTab = "Details" | "Materials" | "Specifications" | "Shipping & Returns";
type CartLine = { slug: string; quantity: number };

const detailTabs: DetailTab[] = ["Details", "Materials", "Specifications", "Shipping & Returns"];
const cartStorageKey = "haa-textile-cart";
const wishlistStorageKey = "haa-textile-wishlist";

export function Storefront({
  products,
  checkoutReady,
}: {
  products: StoreProduct[];
  checkoutReady: boolean;
}) {
  const featured = products.find((product) => product.slug === "premium-ankara-fabric") ?? products[0];
  const [activeSlug, setActiveSlug] = useState(featured?.slug ?? "");
  const product = products.find((item) => item.slug === activeSlug) ?? featured;
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailTab>("Details");
  const [selectedColor, setSelectedColor] = useState(0);
  const [length, setLength] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchSwiped = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gallery = product?.gallery?.length ? product.gallery : product ? [product.image] : [];
  const currentImage = gallery[Math.min(galleryIndex, Math.max(gallery.length - 1, 0))] ?? product?.image ?? "";
  const cartItems: CartViewItem[] = useMemo(
    () => cart.flatMap((line) => {
      const match = products.find((item) => item.slug === line.slug);
      return match ? [{ product: match, quantity: line.quantity }] : [];
    }),
    [cart, products],
  );
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const categories = Array.from(new Set(products.map((item) => item.category)));
  const searchResults = searchQuery.trim()
    ? products.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(searchQuery.trim().toLowerCase())).slice(0, 5)
    : products.slice(0, 4);
  const productSpecifications = Object.entries(product?.specifications ?? {});
  const selectedColorName = product?.colors[selectedColor]?.name ?? "Selected pattern";

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(cartStorageKey);
      const savedWishlist = window.localStorage.getItem(wishlistStorageKey);
      if (savedCart) {
        const parsed = JSON.parse(savedCart) as unknown;
        if (Array.isArray(parsed)) {
          const validLines = parsed.filter((line): line is CartLine =>
            Boolean(line) && typeof line === "object" &&
            typeof (line as CartLine).slug === "string" &&
            Number.isInteger((line as CartLine).quantity) &&
            (line as CartLine).quantity > 0,
          );
          setCart(validLines.flatMap((line) => {
            const item = products.find((entry) => entry.slug === line.slug);
            return item && item.stock > 0
              ? [{ slug: line.slug, quantity: Math.min(line.quantity, item.stock) }]
              : [];
          }));
        }
      }
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist) as unknown;
        if (Array.isArray(parsed)) setFavorites(parsed.filter((slug): slug is string => typeof slug === "string"));
      }
    } catch {
      window.localStorage.removeItem(cartStorageKey);
      window.localStorage.removeItem(wishlistStorageKey);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    window.localStorage.setItem(wishlistStorageKey, JSON.stringify(favorites));
  }, [cart, favorites, isHydrated]);

  useEffect(() => {
    if (!cartOpen && !zoomOpen && !menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setZoomOpen(false);
        setMenuOpen(false);
        setShopOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [cartOpen, zoomOpen, menuOpen]);

  const announce = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  };

  const selectProduct = (item: StoreProduct) => {
    setActiveSlug(item.slug);
    setGalleryIndex(0);
    setSelectedColor(0);
    setLength(1);
    setActiveTab("Details");
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);
    setShopOpen(false);
    setAccountOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToBag = () => {
    if (!product || product.stock <= 0) {
      announce("This fabric is currently out of stock.");
      return;
    }
    const alreadyInBag = cart.find((line) => line.slug === product.slug)?.quantity ?? 0;
    const canAdd = Math.max(0, product.stock - alreadyInBag);
    const amount = Math.min(length, canAdd);
    if (amount <= 0) {
      announce("You’ve reached the available stock for this fabric.");
      return;
    }
    setCart((previous) => {
      const existing = previous.find((line) => line.slug === product.slug);
      if (existing) {
        return previous.map((line) => line.slug === product.slug ? { ...line, quantity: line.quantity + amount } : line);
      }
      return [...previous, { slug: product.slug, quantity: amount }];
    });
    announce(`${product.name} added to your bag.`);
  };

  const toggleFavorite = (slug: string) => {
    const isSaved = favorites.includes(slug);
    setFavorites((previous) => isSaved ? previous.filter((item) => item !== slug) : [...previous, slug]);
    const name = products.find((item) => item.slug === slug)?.name ?? "Fabric";
    announce(isSaved ? `${name} removed from your wishlist.` : `${name} saved to your wishlist.`);
  };

  const setCartQuantity = (slug: string, nextQuantity: number) => {
    const item = products.find((entry) => entry.slug === slug);
    if (!item) return;
    if (nextQuantity <= 0) {
      setCart((previous) => previous.filter((line) => line.slug !== slug));
      return;
    }
    setCart((previous) => previous.map((line) =>
      line.slug === slug ? { ...line, quantity: Math.min(nextQuantity, item.stock) } : line,
    ));
  };

  const beginCheckout = async (email: string) => {
    setCheckoutMessage("");
    if (!checkoutReady) {
      setCheckoutMessage("Online checkout is not set up yet. Your bag is saved—please contact the store to arrange an order.");
      return;
    }
    if (!email.trim() || cartItems.length === 0) return;
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          items: cartItems.map(({ product: item, quantity }) => ({ slug: item.slug, quantity })),
        }),
      });
      const result = (await response.json()) as { authorizationUrl?: string; error?: string };
      if (!response.ok || !result.authorizationUrl) {
        throw new Error(result.error ?? "Checkout could not be started. Please try again.");
      }
      window.location.assign(result.authorizationUrl);
    } catch (error) {
      setCheckoutMessage(error instanceof Error ? error.message : "Checkout could not be started. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const handleNewsletter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterBusy(true);
    setNewsletterMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error ?? "Please try again.");
      setNewsletterMessage(result.message ?? "Thank you for subscribing.");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setNewsletterBusy(false);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    touchSwiped.current = false;
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    if (touchStartX.current === null || gallery.length < 2) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(distance) > 42) {
      touchSwiped.current = true;
      setGalleryIndex((previous) => (previous + (distance < 0 ? 1 : -1) + gallery.length) % gallery.length);
    }
    touchStartX.current = null;
  };

  const jumpToTab = (tab: DetailTab) => {
    setActiveTab(tab);
    document.getElementById("product-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!product) {
    return <main className="empty-catalog"><BrandLogo size="large" /><h1>Our fabric collection is being prepared.</h1><p>Please visit again soon.</p></main>;
  }

  const detailImage = product.slug === featured?.slug ? "/images/fabric-detail.jpg" : product.image;
  const trustItems: { icon: IconName; title: string; copy: string }[] = [
    { icon: "sparkle", title: "Quality fabrics", copy: "Carefully selected for lasting quality." },
    { icon: "truck", title: "Reliable delivery", copy: "Delivery options available across Nigeria." },
    { icon: "shield", title: "Secure payment", copy: checkoutReady ? "Checkout by Paystack, with verification." : "Payment setup will be required at launch." },
  ];

  return (
    <>
      <header className="site-header">
        <div className="announcement-bar">
          <p><span className="announcement-mark" />Premium Fabrics <span className="announcement-separator">•</span> Quality You Can Trust</p>
          <span className="currency-label">Prices in NGN <b>₦</b></span>
        </div>
        <div className="nav-shell">
          <button
            className={`icon-button menu-toggle ${menuOpen ? "is-active" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => { setMenuOpen((open) => !open); setShopOpen(false); setSearchOpen(false); }}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={23} />
          </button>
          <Link href="#top" className="brand-link" aria-label="Hafsat Ahmed Ala Textile Ventures home" onClick={() => setMenuOpen(false)}>
            <BrandLogo />
          </Link>
          <nav className="primary-nav" aria-label="Main navigation">
            <a href="#top">Home</a>
            <button className={`nav-dropdown-trigger ${shopOpen ? "is-active" : ""}`} onClick={() => { setShopOpen((open) => !open); setSearchOpen(false); setAccountOpen(false); }}>Shop <Icon name="chevron-down" size={13} /></button>
            <a href="#recommendations">New arrivals</a>
            <a href="#recommendations">Collections</a>
            <a href="#recommendations">Sale</a>
            <a href="#about">About us</a>
          </nav>
          <div className="nav-actions">
            <button className={`icon-button ${searchOpen ? "is-active" : ""}`} aria-label="Search fabrics" aria-expanded={searchOpen} onClick={() => { setSearchOpen((open) => !open); setShopOpen(false); setAccountOpen(false); }}><Icon name="search" size={21} /></button>
            <button className={`icon-button account-trigger ${accountOpen ? "is-active" : ""}`} aria-label="Customer account" aria-expanded={accountOpen} onClick={() => { setAccountOpen((open) => !open); setSearchOpen(false); setShopOpen(false); }}><Icon name="user" size={21} /></button>
            <button className="icon-button bag-trigger" aria-label={`Shopping bag with ${cartCount} items`} onClick={() => { setCartOpen(true); setCheckoutMessage(""); }}>
              <Icon name="bag" size={21} />
              <span className="bag-count">{isHydrated ? cartCount : 0}</span>
            </button>
          </div>
        </div>

        {shopOpen && (
          <div className="header-popover shop-popover">
            <div className="popover-title"><span className="eyebrow">Explore the collection</span><button className="text-link" onClick={() => setShopOpen(false)}>Close</button></div>
            <div className="category-menu">
              <button onClick={() => { document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" }); setShopOpen(false); }}><span>All fabrics</span><Icon name="arrow-right" size={16} /></button>
              {categories.map((category) => {
                const item = products.find((entry) => entry.category === category);
                return <button key={category} onClick={() => item && selectProduct(item)}><span>{category}</span><Icon name="arrow-right" size={16} /></button>;
              })}
            </div>
          </div>
        )}
        {searchOpen && (
          <div className="header-popover search-popover">
            <label htmlFor="catalog-search">Find a fabric</label>
            <div className="search-input-wrap"><Icon name="search" size={18} /><input id="catalog-search" type="search" placeholder="Search Ankara, lace, brocade…" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} /></div>
            <div className="search-results" aria-live="polite">
              {searchResults.length ? searchResults.map((item) => (
                <button key={item.slug} onClick={() => selectProduct(item)}>
                  <span className="search-result-thumb"><Image src={item.image} alt="" fill sizes="44px" /></span>
                  <span><strong>{item.name}</strong><small>{item.category} · {formatNaira(item.price)} / {item.quantityUnit}</small></span>
                  <Icon name="arrow-right" size={15} />
                </button>
              )) : <p className="search-empty">No fabrics found. Try another search.</p>}
            </div>
          </div>
        )}
        {accountOpen && (
          <div className="header-popover account-popover">
            <span className="eyebrow">Customer care</span>
            <h3>How can we help?</h3>
            <p>Customer accounts are not enabled yet. Your bag and wishlist are saved on this device.</p>
            <a href="#contact" onClick={() => setAccountOpen(false)}>Contact information <Icon name="arrow-right" size={15} /></a>
          </div>
        )}
        {menuOpen && (
          <div className="mobile-menu-panel">
            <div className="mobile-menu-top"><span className="eyebrow">Browse</span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><Icon name="close" /></button></div>
            <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
            {[
              ["Shop all fabrics", "#recommendations"],
              ["New arrivals", "#product"],
              ["Collections", "#recommendations"],
              ["Sale", "#recommendations"],
              ["About us", "#about"],
            ].map(([label, href]) => <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow-right" size={15} /></a>)}
            <div className="mobile-menu-categories"><span className="eyebrow">Shop by fabric</span>{categories.map((category) => <button key={category} onClick={() => { const item = products.find((entry) => entry.category === category); if (item) selectProduct(item); }}>{category}<Icon name="chevron-right" size={15} /></button>)}</div>
          </div>
        )}
      </header>

      <main id="top" className="store-main">
        <nav className="breadcrumb" aria-label="Breadcrumb"><a href="#top">Home</a><Icon name="chevron-right" size={13} /><a href="#recommendations">Fabrics</a><Icon name="chevron-right" size={13} /><span>{product.category}</span></nav>

        <section className="product-layout" id="product" aria-label={`${product.name} product information`}>
          <div className="product-gallery">
            <div className="thumbnail-rail" aria-label="Product image thumbnails">
              {gallery.map((image, index) => (
                <button
                  className={`thumbnail-button ${galleryIndex === index ? "is-selected" : ""}`}
                  key={`${product.slug}-${image}-${index}`}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={galleryIndex === index}
                >
                  <Image src={image} alt={`${product.name}, view ${index + 1}`} fill sizes="(max-width: 760px) 64px, 88px" />
                </button>
              ))}
              {gallery.length > 1 && <button className="gallery-next" aria-label="Next product image" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)}><Icon name="arrow-down" size={18} /></button>}
            </div>
            <button
              className="main-product-image"
              aria-label="Open a larger view of the fabric"
              onClick={() => {
                if (touchSwiped.current) {
                  touchSwiped.current = false;
                  return;
                }
                setZoomOpen(true);
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image src={currentImage} alt={`${product.name} — ${selectedColorName}, premium textile product photograph`} fill sizes="(max-width: 760px) 100vw, (max-width: 1180px) 53vw, 680px" priority />
              <span className="image-index">{galleryIndex + 1} <i /> {gallery.length}</span>
              <span className="zoom-button"><Icon name="zoom" size={18} /><span>Zoom</span></span>
            </button>
          </div>

          <div className="product-info">
            {product.isNew && <span className="arrival-badge"><i /> New arrival</span>}
            <p className="product-kicker">{product.category} · Selected with care</p>
            <h1>{product.name}</h1>
            <div className="product-price-row">
              <span className="product-price">{formatNaira(product.price)}</span>
              {product.compareAt && product.compareAt > product.price && <><span className="old-price">{formatNaira(product.compareAt)}</span><span className="discount-badge">{Math.round((1 - product.price / product.compareAt) * 100)}% off</span></>}
              <span className="price-unit">/ {product.quantityUnit}</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-stock-note"><span className={product.stock > 0 ? "stock-dot" : "stock-dot stock-dot--out"} />{product.stock > 0 ? `${product.stock} ${product.quantityUnit}${product.stock === 1 ? "" : "s"} available` : "Currently out of stock"}</div>

            <div className="product-divider" />
            <div className="option-heading"><span>Pattern</span><span>{selectedColorName}</span></div>
            <div className="swatch-list" role="group" aria-label="Available fabric colours and patterns">
              {product.colors.map((color, index) => (
                <button
                  key={`${color.name}-${color.hex}`}
                  className={`swatch ${selectedColor === index ? "is-selected" : ""}`}
                  style={{ "--swatch-color": color.hex } as React.CSSProperties}
                  aria-label={color.name}
                  aria-pressed={selectedColor === index}
                  title={color.name}
                  onClick={() => setSelectedColor(index)}
                ><span /></button>
              ))}
            </div>
            <div className="quantity-heading">
              <div><span>Cut length</span><small>Sold by the {product.quantityUnit}</small></div>
              <button className="text-link specifications-link" onClick={() => jumpToTab("Specifications")}><Icon name="ruler" size={15} /> Fabric specifications</button>
            </div>
            <div className="quantity-and-stock">
              <div className="quantity-control" aria-label={`Cut length in ${product.quantityUnit}s`}>
                <button aria-label="Decrease cut length" onClick={() => setLength((value) => Math.max(1, value - 1))} disabled={length <= 1}><Icon name="minus" size={15} /></button>
                <span>{length}</span>
                <button aria-label="Increase cut length" onClick={() => setLength((value) => Math.min(product.stock, value + 1))} disabled={length >= product.stock}><Icon name="plus" size={15} /></button>
              </div>
              <span className="quantity-total">{formatNaira(product.price * length)} <small>for {length} {product.quantityUnit}{length > 1 ? "s" : ""}</small></span>
            </div>
            <div className="purchase-actions">
              <button className="button button--navy add-to-bag" onClick={addToBag} disabled={product.stock <= 0}>
                <Icon name="bag" size={19} />{product.stock <= 0 ? "Out of stock" : "Add to Cart"}
              </button>
              <button className={`wishlist-button ${favorites.includes(product.slug) ? "is-favorite" : ""}`} onClick={() => toggleFavorite(product.slug)} aria-label={favorites.includes(product.slug) ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={favorites.includes(product.slug)}>
                <Icon name="heart" size={22} />
              </button>
            </div>
            <p className="small-purchase-note"><Icon name="shield" size={14} /> Your selection is saved securely in your bag.</p>
          </div>
        </section>

        <section className="trust-strip" aria-label="Store benefits">
          {trustItems.map((item) => (
            <div className="trust-item" key={item.title}>
              <span className="trust-icon"><Icon name={item.icon} size={20} /></span>
              <span><strong>{item.title}</strong><small>{item.copy}</small></span>
            </div>
          ))}
        </section>

        <section className="details-section" id="product-details" aria-label="Product details">
          <div className="details-copy">
            <div className="tabs" role="tablist" aria-label="Product information tabs">
              {detailTabs.map((tab) => (
                <button key={tab} role="tab" aria-selected={activeTab === tab} aria-controls="product-tab-panel" className={activeTab === tab ? "is-active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>
            <div id="product-tab-panel" className="tab-panel" role="tabpanel" aria-live="polite">
              {activeTab === "Details" && <>
                <p>{product.description}</p>
                <ul className="detail-highlights">
                  <li><Icon name="needle" size={16} /><span>Selected for its distinctive textile character.</span></li>
                  <li><Icon name="leaf" size={16} /><span>Available by the yard for flexible project lengths.</span></li>
                  <li><Icon name="sparkle" size={16} /><span>A considered choice for traditional and contemporary designs.</span></li>
                </ul>
              </>}
              {activeTab === "Materials" && <>
                <p className="tab-lead">Material and care information</p>
                <p>{product.specifications.Composition ?? "Please contact the store to confirm the exact fabric composition for this selection."}</p>
                <div className="care-note"><span className="eyebrow">Care instructions</span><p>{product.careInstructions ?? "Care guidance will be confirmed with the product before launch."}</p></div>
              </>}
              {activeTab === "Specifications" && <>
                <p className="tab-lead">Product specifications</p>
                <dl className="specification-list">
                  {productSpecifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                  <div><dt>Available stock</dt><dd>{product.stock} {product.quantityUnit}{product.stock === 1 ? "" : "s"}</dd></div>
                  <div><dt>Pattern options</dt><dd>{product.colors.map((color) => color.name).join(", ")}</dd></div>
                </dl>
              </>}
              {activeTab === "Shipping & Returns" && <div id="shipping-returns">
                <p className="tab-lead">Delivery and returns</p>
                <p>Delivery options and timing are confirmed with each order for Nigerian customers. Please contact the store before ordering if you need a delivery estimate or have a question about a fabric cut.</p>
                <p className="policy-placeholder">Final delivery, exchange, and return terms are being confirmed by the store. Please contact us before ordering; this section should be updated with the published policy before launch.</p>
              </div>}
            </div>
          </div>
          <figure className="detail-photo">
            <Image src={detailImage} alt={`Close-up of the weave and pattern of ${product.name}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
            <figcaption><span>A closer look</span><i />{product.category} textile</figcaption>
          </figure>
        </section>

        <section className="recommendations-section" id="recommendations">
          <div className="section-heading">
            <div><p className="eyebrow">Discover more</p><h2>You may also like</h2></div>
            <a href="#recommendations" className="view-all-link">View all <Icon name="arrow-right" size={16} /></a>
          </div>
          <div className="product-card-grid">
            {products.slice(0, 4).map((item) => (
              <article className={`product-card ${item.slug === product.slug ? "is-current" : ""}`} key={item.slug}>
                <button className="product-card-image" onClick={() => selectProduct(item)} aria-label={`View ${item.name}`}>
                  <Image src={item.image} alt={`${item.name} fabric`} fill sizes="(max-width: 560px) 45vw, (max-width: 900px) 42vw, 25vw" />
                  {item.isNew && <span className="card-tag">New arrival</span>}
                </button>
                <div className="product-card-content">
                  <div className="card-category">{item.category}</div>
                  <button className="product-card-name" onClick={() => selectProduct(item)}>{item.name}</button>
                  <div className="product-card-bottom"><span><strong>{formatNaira(item.price)}</strong><small>/ {item.quantityUnit}</small></span>
                    <button className={`card-wishlist ${favorites.includes(item.slug) ? "is-favorite" : ""}`} onClick={() => toggleFavorite(item.slug)} aria-label={favorites.includes(item.slug) ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`} aria-pressed={favorites.includes(item.slug)}><Icon name="heart" size={19} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="about">
        <div className="footer-newsletter">
          <div className="newsletter-copy"><span className="newsletter-icon"><Icon name="mail" size={22} /></span><span><p className="eyebrow">A note from our collection</p><h2>Good things, thoughtfully shared.</h2><p>Sign up for new fabrics, collection notes, and inspiration.</p></span></div>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" required maxLength={254} autoComplete="email" placeholder="Your email address" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} />
            <button type="submit" disabled={newsletterBusy}>{newsletterBusy ? "Joining…" : "Subscribe"}<Icon name="arrow-right" size={16} /></button>
            {newsletterMessage && <span className="newsletter-feedback" role="status">{newsletterMessage}</span>}
          </form>
        </div>
        <div className="footer-main" id="contact">
          <div className="footer-brand-column">
            <Link href="#top" className="footer-brand-link" aria-label="Hafsat Ahmed Ala Textile Ventures home"><BrandLogo size="large" /></Link>
            <p>Quality fabrics. Elegant style. Endless possibilities.</p>
            <div className="footer-socials" aria-label="Social media profiles">
              <span>Instagram <small>Profile link to be added</small></span>
              <span>Facebook <small>Profile link to be added</small></span>
              <span>TikTok <small>Profile link to be added</small></span>
            </div>
          </div>
          <FooterLinks title="Shop" links={[["All fabrics", "#recommendations"], ["New arrivals", "#product"], ["Best sellers", "#recommendations"], ["Special offers", "#recommendations"]]} />
          <FooterLinks title="Customer service" links={[["Contact us", "#contact-details"], ["Shipping information", "#shipping-returns"], ["Returns policy", "#shipping-returns"], ["Frequently asked questions", "#contact-details"]]} />
          <FooterLinks title="About" links={[["Our story", "#about"], ["Our commitment to quality", "#product-details"]]} />
          <div className="footer-contact" id="contact-details">
            <h3>Contact</h3>
            <p><span>Phone</span><b>[Phone number to be added]</b></p>
            <p><span>WhatsApp</span><b>[WhatsApp contact to be added]</b></p>
            <p><span>Email</span><b>[Business email to be added]</b></p>
            <p><span>Address</span><b>[Business address to be added]</b></p>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Hafsat Ahmed Ala Textile Ventures. All rights reserved.</span><span>Prices shown in Nigerian naira (₦).</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        subtotal={cartSubtotal}
        checkoutReady={checkoutReady}
        isCheckingOut={isCheckingOut}
        checkoutMessage={checkoutMessage}
        onClose={() => setCartOpen(false)}
        onRemove={(slug) => setCart((previous) => previous.filter((line) => line.slug !== slug))}
        onSetQuantity={setCartQuantity}
        onCheckout={(email) => void beginCheckout(email)}
        onContinueShopping={() => setCartOpen(false)}
      />

      {zoomOpen && (
        <div className="zoom-overlay" role="dialog" aria-modal="true" aria-label={`Large view of ${product.name}`} onMouseDown={() => setZoomOpen(false)}>
          <button className="icon-button zoom-close" onClick={() => setZoomOpen(false)} aria-label="Close image zoom"><Icon name="close" size={22} /></button>
          <div className="zoom-content" onMouseDown={(event) => event.stopPropagation()}>
            <Image src={currentImage} alt={`${product.name} enlarged textile detail`} fill sizes="95vw" />
          </div>
          <span className="zoom-caption">{product.name} · {galleryIndex + 1} / {gallery.length}</span>
        </div>
      )}

      {toast && <div className="toast-message" role="status"><span className="toast-check"><Icon name="check" size={15} /></span>{toast}<button aria-label="Dismiss notification" onClick={() => setToast("")}><Icon name="close" size={16} /></button></div>}
    </>
  );
}

function FooterLinks({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="footer-link-group">
      <h3>{title}</h3>
      {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
    </div>
  );
}
