import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { vehicles, tourPackages } from "../src/lib/types/tour_package";
import { blogPosts } from "../src/lib/types/blog_data";
import { touristSpots } from "../src/lib/types/tourist_spots_data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding vehicles...");
  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: {
        name: v.name,
        capacity: v.capacity,
        priceIncrement: v.priceIncrement,
        image: v.image,
      },
      create: {
        id: v.id,
        name: v.name,
        capacity: v.capacity,
        priceIncrement: v.priceIncrement,
        image: v.image,
      },
    });
  }
  console.log(`  ${vehicles.length} vehicles`);

  console.log("Seeding tour packages...");
  for (const t of tourPackages) {
    await prisma.tourPackage.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        name: t.name,
        description: t.description,
        basePrice: t.basePrice,
        duration: t.duration,
        touristType: t.touristType,
        isPopular: t.isPopular ?? false,
        thumbnail: t.thumbnail,
        features: t.features,
        images: t.images,
        vehicles: { connect: t.vehicles.map((v) => ({ id: v.id })) },
        itinerary: {
          create: t.itinerary.map((day) => ({
            day: day.day,
            title: day.title,
            destinations: {
              create: day.destinations.map((d) => ({
                name: d.name,
                description: d.description,
                time: d.time,
              })),
            },
          })),
        },
      },
    });
  }
  console.log(`  ${tourPackages.length} packages`);

  console.log("Seeding blog posts...");
  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        contentMd: b.content,
        coverImage: b.coverImage,
        date: new Date(b.date),
      },
    });
  }
  console.log(`  ${blogPosts.length} blog posts`);

  console.log("Seeding tourist spots...");
  for (const s of touristSpots) {
    await prisma.touristSpot.upsert({
      where: { slug: s.id },
      update: {
        name: s.name,
        description: s.description,
        history: s.history ?? null,
        category: s.category,
        imageUrl: s.imageUrl,
        location: s.location,
      },
      create: {
        slug: s.id,
        name: s.name,
        description: s.description,
        history: s.history ?? null,
        category: s.category,
        imageUrl: s.imageUrl,
        location: s.location,
      },
    });
  }
  console.log(`  ${touristSpots.length} tourist spots`);

  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { password: hashed },
      create: { email: adminEmail, password: hashed, name: "Admin" },
    });
    console.log(`  admin: ${adminEmail}`);
  } else {
    console.log("  SKIP — ADMIN_EMAIL / ADMIN_PASSWORD belum di-set di env");
  }

  console.log("Updating vehicle marketing fields...");
  const armadaData = [
    { name: "Toyota Calya", description: "Perfect for small families and groups, offering comfort and efficiency for city tours.", priceLabel: "Start from IDR 450K/day", features: ["Comfortable Seating", "Full AC", "Luggage Space", "Fuel Efficient"], sortOrder: 1 },
    { name: "Daihatsu Sigra", description: "Ideal for city exploration with excellent fuel economy and comfortable seating.", priceLabel: "Start from IDR 450K/day", features: ["Ergonomic Seats", "Climate Control", "Economic Drive", "Modern Features"], sortOrder: 2 },
    { name: "Toyota Avanza", description: "A versatile MPV perfect for family tours and longer journeys around Jogja.", priceLabel: "Start from IDR 500K/day", features: ["Premium Seats", "Easy Access", "Large Trunk", "Enhanced Safety"], sortOrder: 3 },
    { name: "Daihatsu Xenia", description: "Reliable and spacious, great for both city tours and longer trips.", priceLabel: "Start from IDR 500K/day", features: ["Quality Seating", "Smooth Ride", "Family Friendly", "Modern Features"], sortOrder: 4 },
    { name: "Toyota Hiace", description: "Ideal for larger groups, offering maximum comfort and space for extended tours.", priceLabel: "Start from IDR 1000K/day", features: ["Spacious Seating", "Dual Zone AC", "Extra Storage", "Group Friendly"], sortOrder: 5 },
  ];
  for (const a of armadaData) {
    await prisma.vehicle.updateMany({
      where: { name: a.name },
      data: { description: a.description, priceLabel: a.priceLabel, features: a.features, sortOrder: a.sortOrder },
    });
  }
  console.log(`  ${armadaData.length} vehicles updated with marketing`);

  console.log("Seeding site content...");
  const siteContent = [
    {
      key: "hero",
      label: "Hero Section",
      content: {
        title: "Jelajahi Keajaiban Yogyakarta",
        subtitle: "Tur budaya autentik, candi megah, dan hidden gems — ditemani pemandu lokal profesional.",
        ctaText: "Lihat Paket Tour",
        ctaLink: "/tours-pricing",
        image: "/hero.png",
      },
    },
    {
      key: "reason",
      label: "Reason Section",
      content: {
        title: "Kenapa Claris & Travel?",
        subtitle: "Kami buat pengalaman Jogja Anda tak terlupakan",
        items: [
          { title: "Pemandu Lokal", description: "Pemandu asli Jogja dengan pengetahuan mendalam soal sejarah, budaya, dan hidden gems." },
          { title: "Pengalaman Personal", description: "Setiap tour kami sesuaikan dengan minat Anda, agar petualangan di Jogja maksimal." },
          { title: "Praktis & Nyaman", description: "Dari penjemputan bandara sampai rekomendasi kuliner — semua kami urus." },
          { title: "Harga Terbaik", description: "Harga kompetitif tanpa biaya tersembunyi, plus akses pengalaman lokal eksklusif." },
        ],
      },
    },
    {
      key: "pickup",
      label: "Pickup Features",
      content: {
        title: "Layanan Kami",
        subtitle: "Kenyamanan Anda adalah prioritas kami",
        features: [
          { title: "Layanan 24/7", description: "Siap melayani Anda kapan pun, siang atau malam" },
          { title: "Aman & Terpercaya", description: "Sopir berlisensi dan kendaraan berasuransi" },
          { title: "Sopir Multibahasa", description: "Chauffeur profesional berbahasa Inggris" },
        ],
      },
    },
    {
      key: "promo",
      label: "Tour Promo Section",
      content: {
        title: "Popular Tours",
        subtitle: "Most booked packages by our guests",
      },
    },
    {
      key: "footer",
      label: "Footer Configuration",
      content: {
        address: "123 Malioboro Street, Yogyakarta, Indonesia",
        phone: "+62 857 7953 6859",
        email: "info@claristour.com",
        instagram: "https://www.instagram.com/clarisandcitytour_jgj/",
        facebook: "https://www.facebook.com/alexa.deby.5/",
        youtube: "https://www.youtube.com/@Clarisandcitytour",
        whatsapp: "6285779536859",
      },
    },
  ];
  for (const sc of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: sc.key },
      update: { content: sc.content },
      create: { key: sc.key, label: sc.label, content: sc.content },
    });
  }
  console.log(`  ${siteContent.length} site content sections`);

  console.log("Seeding gallery items...");
  const galleryItems = [
    { title: "Borobudur Sunrise", category: "Cultural", image: "/images/borobudur.jpg", location: "Magelang", description: "Witness the magical sunrise at the world's largest Buddhist temple", sortOrder: 1 },
    { title: "Malioboro Night Market", category: "Urban", image: "/images/malioboro.jpg", location: "Yogyakarta", description: "Experience the vibrant night life and local delicacies", sortOrder: 2 },
    { title: "Prambanan Temple", category: "Cultural", image: "/images/prambanan.jpg", location: "Sleman", description: "Marvel at the ancient Hindu architecture", sortOrder: 3 },
    { title: "Merapi Jeep Tour", category: "Adventure", image: "/images/jeep-merapi.jpg", location: "Mount Merapi", description: "Adventure through volcanic landscapes", sortOrder: 4 },
    { title: "Pindul Cave Tubing", category: "Adventure", image: "/images/goa-pindul.jpeg", location: "Gunungkidul", description: "Float through stunning cave formations", sortOrder: 5 },
    { title: "Tugu Monument", category: "Urban", image: "/images/tugu.jpg", location: "Yogyakarta", description: "Visit the iconic symbol of Yogyakarta", sortOrder: 6 },
  ];
  for (const g of galleryItems) {
    await prisma.galleryItem.upsert({
      where: { id: g.sortOrder },
      update: { title: g.title, category: g.category, image: g.image, location: g.location, description: g.description },
      create: { id: g.sortOrder, title: g.title, category: g.category, image: g.image, location: g.location, description: g.description },
    });
  }
  console.log(`  ${galleryItems.length} gallery items`);

  console.log("Seed selesai ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
