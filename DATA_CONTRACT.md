# Claris & Travel — Data Contract

> Semua data yang dikonsumsi Frontend (Server/Client Component) harus lewat `src/lib/data.ts`. Jangan akses Prisma langsung dari komponen.

---

## 1. Prisma Models (Database)

| Model | Tabel | Key Fields |
|-------|-------|-----------|
| `TourPackage` | `tour_packages` | id, slug, name, basePrice, duration, touristType, isPopular, thumbnail, features[], images[], vehicles (M:N), itinerary |
| `Vehicle` | `vehicles` | id, name, capacity, priceIncrement, image, description, features[], priceLabel, sortOrder — juga punya marketing fields buat homepage |
| `Itinerary` | `itineraries` | day, title, destinations (nested) |
| `ItineraryDestination` | `itinerary_destinations` | name, description, time |
| `BlogPost` | `blog_posts` | slug, title, excerpt, contentMd, coverImage, date |
| `TouristSpot` | `tourist_spots` | slug, name, description, history?, category?, imageUrl, location? |
| `Booking` | `bookings` | name, phone, email?, packageSlug?, vehicleName?, tourDate?, pax, message?, status |
| `AdminUser` | `admin_users` | email, password (hashed) |
| `SiteContent` | `site_contents` | key (unique), label, content (JSON) — hero, reason, pickup, promo, footer |
| `GalleryItem` | `gallery_items` | title, category, image, location?, description?, sortOrder |

## 2. Data Layer — `src/lib/data.ts`

| Function | Returns | Fallback |
|----------|---------|----------|
| `getTourPackages()` | `TourPackage[]` | hardcoded TS |
| `getTourPackageBySlug(slug)` | `TourPackage \| undefined` | hardcoded |
| `getBlogPosts()` | `BlogPost[]` | hardcoded |
| `getBlogPostBySlug(slug)` | `BlogPost \| undefined` | hardcoded |
| `getTouristSpots()` | `TouristSpot[]` | hardcoded |
| `getGalleryItems()` | `GalleryItem[]` | `[]` |
| `getSiteContent<T>(key)` | `T \| null` | `null` |
| `getVehiclesMarketing()` | `VehicleMarketing[]` | `[]` |

## 3. TypeScript Types

### TourPackage
```ts
interface TourPackage {
  id: number; slug: string; name: string;
  basePrice: number; duration: string; touristType: 'local' | 'international';
  isPopular: boolean; thumbnail: string; features: string[]; images: string[];
  description: string;
  vehicles: VehicleType[]; itinerary: DailyItinerary[];
}
```

### VehicleType (extended with marketing)
```ts
interface VehicleType {
  id: number; name: string; capacity: string;
  priceIncrement: number; image: string;
  description?: string; features?: string[]; priceLabel?: string;
}
```

### BlogPost
```ts
interface BlogPost {
  slug: string; title: string; excerpt: string;
  date: string; coverImage: string; content: string;
}
```

### TouristSpot
```ts
interface TouristSpot {
  id: string; name: string; description: string;
  history?: string; imageUrl: string; location: string; category: string;
}
```

### SiteContent (JSON shapes)
```ts
// key: "hero" → { title, subtitle, ctaText, ctaLink, image }
// key: "reason" → { title, subtitle, items: [{ title, description }] }
// key: "pickup" → { title, subtitle, features: [{ title, description }] }
// key: "promo" → { title, subtitle }
// key: "footer" → { address, phone, email, whatsapp, instagram, facebook, youtube }
```