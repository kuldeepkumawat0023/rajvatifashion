'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, Heart, Share2, Minus, Plus, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';

// Placeholder data based on HTML prototype
const productData = {
  name: 'Nargis Square Neck Kurti',
  price: 899,
  originalPrice: 1199,
  sku: 'NARGIS-01',
  reviews: 124,
  rating: 4.8,
  description: 'Beautifully crafted Nargis Square Neck Kurti in premium cotton. Perfect for festive occasions and daily wear alike. The intricate design and comfortable fit make it a must-have in your ethnic wardrobe.',
  features: [
    '100% Pure Premium Cotton',
    'Square neck design with detailing',
    '3/4th Sleeves',
    'Regular fit',
    'Machine washable'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  images: [
    '/assets/images/pro-image.jpg', // Placeholder URLs
    '/assets/images/pro-image-2.jpg',
    '/assets/images/pro-image-3.jpg',
  ]
};

const relatedProducts = [
  { id: 2, name: 'Leher Straight Sleeves Kurti', price: 749, originalPrice: 1199, badge: 'New In', slug: 'leher-straight-sleeves-kurti' },
  { id: 3, name: 'Anaya Floral Print Kurti', price: 849, originalPrice: 1099, badge: 'Sale', slug: 'anaya-floral-print-kurti' },
  { id: 4, name: 'Meera Embroidered Kurti', price: 999, originalPrice: 1399, badge: 'Best Seller', slug: 'meera-embroidered-kurti' },
  { id: 5, name: 'Priya Cotton Kurti', price: 699, originalPrice: 999, badge: 'New In', slug: 'priya-cotton-kurti' },
];

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const discount = Math.round(
    ((productData.originalPrice - productData.price) / productData.originalPrice) * 100
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-6 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-primary">Kurtis</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{productData.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Left: Product Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4 h-full max-h-[700px]">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-auto custom-scrollbar md:w-20 lg:w-24 flex-shrink-0">
            {productData.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-[3/4] w-20 md:w-full rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-primary' : 'border-transparent hover:border-border'
                }`}
              >
                <Image
                  src={productData.images[i]}
                  alt={`Thumbnail ${i}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 aspect-[3/4] md:aspect-auto rounded-2xl bg-muted overflow-hidden">
            <Image
              src={productData.images[activeImage]}
              alt={productData.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Best Seller
              </span>
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              <button className="w-10 h-10 bg-surface/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                <Heart size={18} className="text-on-surface-variant hover:text-primary transition-colors" />
              </button>
              <button className="w-10 h-10 bg-surface/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                <Share2 size={18} className="text-on-surface-variant hover:text-primary transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
            {productData.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(productData.rating) ? 'fill-accent text-accent' : 'text-border fill-border'}
                />
              ))}
            </div>
            <span className="text-sm text-primary font-medium hover:underline cursor-pointer">
              {productData.reviews} Reviews
            </span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span className="text-sm text-on-surface-variant">
              SKU: {productData.sku}
            </span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="font-bold text-3xl text-primary">₹{productData.price}</span>
            <span className="text-lg text-on-surface-variant line-through mb-1">₹{productData.originalPrice}</span>
            <span className="bg-accent text-secondary text-xs font-bold px-2.5 py-1 rounded-full mb-1.5 shadow-sm">
              {discount}% OFF
            </span>
          </div>

          {/* Offers */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
              <span className="text-lg">✨</span> Available Offers
            </h4>
            <ul className="text-sm text-on-surface-variant space-y-1.5">
              <li><strong className="text-foreground">RAJVATI10</strong> — Get 10% off on your first order</li>
              <li><strong className="text-foreground">FESTIVE200</strong> — Flat ₹200 off on orders above ₹2000</li>
            </ul>
          </div>

          <div className="w-full h-px bg-border my-6"></div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Select Size</h4>
              <button className="text-sm text-primary font-medium hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg font-medium text-sm transition-all flex items-center justify-center border ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-on-primary shadow-md'
                      : 'border-border text-on-surface-variant hover:border-primary/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h4 className="font-semibold text-foreground mb-3">Quantity</h4>
            <div className="flex items-center w-32 bg-surface border border-border rounded-lg p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded text-on-surface-variant hover:bg-muted"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center font-semibold text-foreground">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded text-on-surface-variant hover:bg-muted"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 gradient-button py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all">
              Add to Cart
            </button>
            <button className="flex-1 bg-secondary text-on-secondary py-4 rounded-xl font-bold text-base hover:bg-secondary/90 shadow-lg hover:-translate-y-0.5 transition-all">
              Buy It Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface">
              <Truck className="text-primary" size={24} />
              <div className="text-xs">
                <strong className="block text-foreground text-sm">Free Shipping</strong>
                <span className="text-on-surface-variant">Above ₹1299</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface">
              <ShieldCheck className="text-primary" size={24} />
              <div className="text-xs">
                <strong className="block text-foreground text-sm">Quality Checked</strong>
                <span className="text-on-surface-variant">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs (Description, Details, Reviews) */}
      <div className="mb-16">
        <div className="flex border-b border-border mb-6 overflow-x-auto no-scrollbar">
          {['description', 'details', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-semibold text-sm transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'reviews' && ` (${productData.reviews})`}
            </button>
          ))}
        </div>

        <div className="min-h-[200px]">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none text-on-surface-variant">
              <p className="leading-relaxed text-base">{productData.description}</p>
              <h4 className="text-foreground font-semibold mt-6 mb-3">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {productData.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {[
                { label: 'Fabric', value: '100% Cotton' },
                { label: 'Pattern', value: 'Printed' },
                { label: 'Neckline', value: 'Square Neck' },
                { label: 'Sleeve Length', value: '3/4th Sleeves' },
                { label: 'Occasion', value: 'Daily, Festive' },
                { label: 'Wash Care', value: 'Machine Wash Cold' },
              ].map((detail, i) => (
                <div key={i} className="flex py-3 border-b border-border/50">
                  <span className="w-1/3 font-medium text-foreground text-sm">{detail.label}</span>
                  <span className="w-2/3 text-on-surface-variant text-sm">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-on-surface-variant text-sm">
              <p>Reviews will be loaded from the API.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t border-border pt-16">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-2">
            You May Also Like
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
