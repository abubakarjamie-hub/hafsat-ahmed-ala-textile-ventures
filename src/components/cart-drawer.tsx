"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { formatNaira, type StoreProduct } from "@/lib/products";
import { Icon } from "@/components/icon";

export type CartViewItem = {
  product: StoreProduct;
  quantity: number;
};

type CartDrawerProps = {
  open: boolean;
  items: CartViewItem[];
  subtotal: number;
  checkoutReady: boolean;
  isCheckingOut: boolean;
  checkoutMessage: string;
  onClose: () => void;
  onRemove: (slug: string) => void;
  onSetQuantity: (slug: string, quantity: number) => void;
  onCheckout: (email: string) => void;
  onContinueShopping: () => void;
};

export function CartDrawer({
  open,
  items,
  subtotal,
  checkoutReady,
  isCheckingOut,
  checkoutMessage,
  onClose,
  onRemove,
  onSetQuantity,
  onCheckout,
  onContinueShopping,
}: CartDrawerProps) {
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCheckout(email.trim());
  };

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside
        className="cart-drawer"
        aria-label="Shopping bag"
        aria-modal="true"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Your bag <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          </div>
          <button className="icon-button close-drawer" onClick={onClose} aria-label="Close shopping bag">
            <Icon name="close" size={21} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-bag">
            <span className="empty-bag-icon"><Icon name="bag" size={27} /></span>
            <h3>Your bag is waiting</h3>
            <p>Explore our considered collection of fabrics and find a material for your next design.</p>
            <button className="button button--navy" onClick={onContinueShopping}>Continue shopping <Icon name="arrow-right" size={17} /></button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {items.map(({ product, quantity }) => (
                <article className="cart-line" key={product.slug}>
                  <div className="cart-line-image">
                    <Image src={product.image} alt={product.name} fill sizes="86px" />
                  </div>
                  <div className="cart-line-copy">
                    <div className="cart-line-top">
                      <div>
                        <span className="cart-category">{product.category}</span>
                        <h3>{product.name}</h3>
                      </div>
                      <button className="text-icon-button remove-line" onClick={() => onRemove(product.slug)} aria-label={`Remove ${product.name} from bag`}>
                        <Icon name="trash" size={17} />
                      </button>
                    </div>
                    <p className="cart-unit-price">{formatNaira(product.price)} <span>/ {product.quantityUnit}</span></p>
                    <div className="cart-line-bottom">
                      <div className="quantity-control quantity-control--small" aria-label={`Quantity of ${product.name}`}>
                        <button aria-label="Decrease quantity" onClick={() => onSetQuantity(product.slug, quantity - 1)} disabled={quantity <= 1}><Icon name="minus" size={14} /></button>
                        <span>{quantity}</span>
                        <button aria-label="Increase quantity" onClick={() => onSetQuantity(product.slug, quantity + 1)} disabled={quantity >= product.stock}><Icon name="plus" size={14} /></button>
                      </div>
                      <strong>{formatNaira(product.price * quantity)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-subtotal"><span>Subtotal</span><strong>{formatNaira(subtotal)}</strong></div>
              <p className="cart-delivery-note">Delivery and any applicable charges are confirmed before payment.</p>
              <form className="checkout-form" onSubmit={handleSubmit}>
                <label htmlFor="checkout-email">Email address</label>
                <input
                  id="checkout-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  maxLength={254}
                />
                <button className="button button--navy checkout-button" type="submit" disabled={isCheckingOut}>
                  {isCheckingOut ? <><span className="loading-ring loading-ring--light" /> Preparing secure checkout…</> : <>Continue to checkout <Icon name="arrow-right" size={17} /></>}
                </button>
              </form>
              <p className="payment-setup-note" role="status">
                <Icon name="shield" size={15} />
                {checkoutReady ? "Secure payment will be confirmed by Paystack." : "Online checkout requires payment gateway setup. Your bag is saved for later."}
              </p>
              {checkoutMessage && <p className="checkout-feedback" role="alert">{checkoutMessage}</p>}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
