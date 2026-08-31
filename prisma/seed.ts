import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { vehicles, tourPackages } from "../src/lib/types/tour_package";
import { blogPosts } from "../src/lib/types/blog_data";
import { touristSpots } from "../src/lib/types/tourist_spots_data";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL,
});

// Default tenant (jogja) — seed ini isi data tenant utama
const TENANT_ID = 1;

async function main() {
  console.log("Seeding tenant...");
  await prisma.tenant.upsert({
    where: { slug: "jogja" },
    update: {},
    create: {
      slug: "jogja",
      name: "Claris & City Tour Jogja",
      whatsappNumber: "6285779536859",
    },
  });
  console.log("  tenant: jogja");

  console.log("Seeding vehicles...");
  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: {
        tenantId: TENANT_ID,
        name: v.name,
        capacity: v.capacity,
        priceIncrement: v.priceIncrement,
        image: v.image,
      },
      create: {
        id: v.id,
        tenantId: TENANT_ID,
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
      where: { tenantId_slug: { tenantId: TENANT_ID, slug: t.slug } },
      update: {},
      create: {
        tenantId: TENANT_ID,
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
      where: { tenantId_slug: { tenantId: TENANT_ID, slug: b.slug } },
      update: {},
      create: {
        tenantId: TENANT_ID,
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
      where: { tenantId_slug: { tenantId: TENANT_ID, slug: s.id } },
      update: {
        name: s.name,
        description: s.description,
        history: s.history ?? null,
        category: s.category,
        imageUrl: s.imageUrl,
        location: s.location,
      },
      create: {
        tenantId: TENANT_ID,
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
      where: { tenantId_email: { tenantId: TENANT_ID, email: adminEmail } },
      update: { password: hashed },
      create: { tenantId: TENANT_ID, email: adminEmail, password: hashed, name: "Admin" },
    });
    console.log(`  admin: ${adminEmail}`);
  } else {
    console.log("  SKIP — ADMIN_EMAIL / ADMIN_PASSWORD belum di-set di env");
  }

  console.log("Updating vehicle marketing fields...");
  const armadaData = [
    {
      name: "Toyota Calya",
      description: "Perfect for small families and groups, offering comfort and efficiency for city tours.",
      priceLabel: "Start from IDR 450K/day",
      features: ["Comfortable Seating", "Full AC", "Luggage Space", "Fuel Efficient"],
      sortOrder: 1,
    },
    {
      name: "Daihatsu Sigra",
      description: "Ideal for city exploration with excellent fuel economy and comfortable seating.",
      priceLabel: "Start from IDR 450K/day",
      features: ["Ergonomic Seats", "Climate Control", "Economic Drive", "Modern Features"],
      sortOrder: 2,
    },
    {
      name: "Toyota Avanza",
      description: "A versatile MPV perfect for family tours and longer journeys around Jogja.",
      priceLabel: "Start from IDR 500K/day",
      features: ["Premium Seats", "Easy Access", "Large Trunk", "Enhanced Safety"],
      sortOrder: 3,
    },
    {
      name: "Daihatsu Xenia",
      description: "Reliable and spacious, great for both city tours and longer trips.",
      priceLabel: "Start from IDR 500K/day",
      features: ["Quality Seating", "Smooth Ride", "Family Friendly", "Modern Features"],
      sortOrder: 4,
    },
    {
      name: "Toyota Hiace",
      description: "Ideal for larger groups, offering maximum comfort and space for extended tours.",
      priceLabel: "Start from IDR 1000K/day",
      features: ["Spacious Seating", "Dual Zone AC", "Extra Storage", "Group Friendly"],
      sortOrder: 5,
    },
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
        title: "Kenapa Milih Kami?",
        subtitle: "Bukan cuma jasa tour — kami pendamping perjalananmu di Jogja.",
        items: [
          {
            title: "Jalur Paling Tahu",
            description:
              "Bukan rute turis mainstream. Kami tau jalur sepi, spot foto rahasia, dan warung makan yang cuma anak Jogja yang tau.",
          },
          {
            title: "Waktumu Fleksibel",
            description: "Pengen bangun siang? No problem. Itinerary kami sesuaikan ritme liburanmu, bukan sebaliknya.",
          },
          {
            title: "Satu Kontak Semua Urusan",
            description:
              "Penjemputan, tiket, itinerary, sampe rekomendasi oleh-oleh — semua diurus satu tim, gak bolak-balik nelpon sana-sini.",
          },
          {
            title: "Harga Apa Adanya",
            description:
              "Gak ada biaya 'bensin tambahan' mendadak atau harga mendadak naik pas udah jalan. Yang dijelasin di awal, itu yang lo bayar.",
          },
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
      where: { tenantId_key: { tenantId: TENANT_ID, key: sc.key } },
      update: { content: sc.content },
      create: { tenantId: TENANT_ID, key: sc.key, label: sc.label, content: sc.content },
    });
  }
  console.log(`  ${siteContent.length} site content sections`);

  console.log("Seeding gallery items...");
  const galleryItems = [
    {
      title: "Borobudur Sunrise",
      category: "Cultural",
      image: "/images/borobudur.jpg",
      location: "Magelang",
      description: "Witness the magical sunrise at the world's largest Buddhist temple",
      sortOrder: 1,
    },
    {
      title: "Malioboro Night Market",
      category: "Urban",
      image: "/images/malioboro.jpg",
      location: "Yogyakarta",
      description: "Experience the vibrant night life and local delicacies",
      sortOrder: 2,
    },
    {
      title: "Prambanan Temple",
      category: "Cultural",
      image: "/images/prambanan.jpg",
      location: "Sleman",
      description: "Marvel at the ancient Hindu architecture",
      sortOrder: 3,
    },
    {
      title: "Merapi Jeep Tour",
      category: "Adventure",
      image: "/images/jeep-merapi.jpg",
      location: "Mount Merapi",
      description: "Adventure through volcanic landscapes",
      sortOrder: 4,
    },
    {
      title: "Pindul Cave Tubing",
      category: "Adventure",
      image: "/images/goa-pindul.jpeg",
      location: "Gunungkidul",
      description: "Float through stunning cave formations",
      sortOrder: 5,
    },
    {
      title: "Tugu Monument",
      category: "Urban",
      image: "/images/tugu.jpg",
      location: "Yogyakarta",
      description: "Visit the iconic symbol of Yogyakarta",
      sortOrder: 6,
    },
  ];
  for (const g of galleryItems) {
    await prisma.galleryItem.upsert({
      where: { id: g.sortOrder },
      update: {
        title: g.title,
        category: g.category,
        image: g.image,
        location: g.location,
        description: g.description,
      },
      create: {
        id: g.sortOrder,
        tenantId: TENANT_ID,
        title: g.title,
        category: g.category,
        image: g.image,
        location: g.location,
        description: g.description,
      },
    });
  }
  console.log(`  ${galleryItems.length} gallery items`);

  console.log("Seeding drivers...");
  const drivers = [
    {
      name: "Pak Budi",
      phone: "6281234567801",
      status: "tersedia",
      notes: "Sopir senior, 8 tahun pengalaman tour Jogja.",
    },
    {
      name: "Pak Slamet",
      phone: "6281234567802",
      status: "tersedia",
      notes: "Fasih bahasa Inggris, spesialis Borobudur.",
    },
    {
      name: "Mas Rizky",
      phone: "6281234567803",
      status: "tersedia",
      notes: "Hafal jalur sepi & hidden gems Gunungkidul.",
    },
  ];
  for (const d of drivers) {
    const existing = await prisma.driver.findFirst({ where: { phone: d.phone } });
    if (existing) {
      await prisma.driver.update({
        where: { id: existing.id },
        data: { name: d.name, phone: d.phone, status: d.status, notes: d.notes },
      });
    } else {
      await prisma.driver.create({
        data: { tenantId: TENANT_ID, name: d.name, phone: d.phone, status: d.status, notes: d.notes },
      });
    }
  }
  console.log(`  ${drivers.length} drivers`);

  console.log("Seeding sample bookings...");
  const pkgList = await prisma.tourPackage.findMany({ orderBy: { id: "asc" }, take: 4 });
  const driverList = await prisma.driver.findMany({ orderBy: { id: "asc" } });
  const sampleBookings = [
    {
      code: "CLR-A1B2C3D4",
      name: "Budi Santoso",
      phone: "6281234567891",
      email: "budi@gmail.com",
      pkg: 0,
      status: "selesai",
      payment: "dibayar",
      method: "transfer_manual",
      paid: true,
      driver: 0,
      total: 750000,
    },
    {
      code: "CLR-E5F6G7H8",
      name: "Siti Rahma",
      phone: "6281234567892",
      email: "siti@yahoo.com",
      pkg: 1,
      status: "selesai",
      payment: "dibayar",
      method: "cash",
      paid: true,
      driver: 1,
      total: 850000,
    },
    {
      code: "CLR-J9K0L1M2",
      name: "Andi Wijaya",
      phone: "6281234567893",
      email: null,
      pkg: 2,
      status: "dikonfirmasi",
      payment: "dibayar",
      method: "transfer_manual",
      paid: true,
      driver: null,
      total: 950000,
    },
    {
      code: "CLR-N3P4Q5R6",
      name: "Dewi Lestari",
      phone: "6281234567894",
      email: "dewi@gmail.com",
      pkg: 3,
      status: "baru",
      payment: "belum",
      method: null,
      paid: false,
      driver: null,
      total: null,
    },
    {
      code: "CLR-S7T8U9V1",
      name: "Joko Prasetyo",
      phone: "6281234567895",
      email: "joko@mail.com",
      pkg: 0,
      status: "batal",
      payment: "refunded",
      method: "QRIS",
      paid: true,
      driver: null,
      total: 700000,
    },
  ];
  for (const [i, sb] of sampleBookings.entries()) {
    const pkg = pkgList[sb.pkg];
    if (!pkg) continue;
    const base = pkg.basePrice;
    const driver = sb.driver != null ? driverList[sb.driver] : null;
    const tourDate = new Date(Date.now() - (sampleBookings.length - i) * 86400000).toISOString().slice(0, 10);
    await prisma.booking.upsert({
      where: { bookingCode: sb.code },
      update: {},
      create: {
        tenantId: TENANT_ID,
        bookingCode: sb.code,
        name: sb.name,
        phone: sb.phone,
        email: sb.email,
        packageSlug: pkg.slug,
        packageName: pkg.name,
        tourDate,
        tourTime: "08:00",
        pickupLocation: "Hotel area Malioboro",
        pax: 2,
        status: sb.status,
        totalPrice: sb.total ?? base,
        paymentStatus: sb.payment,
        paymentMethod: sb.method,
        paidAt: sb.paid ? new Date() : null,
        driverId: driver?.id ?? null,
        driverAssignedAt: sb.status === "selesai" || sb.status === "dikonfirmasi" ? new Date() : null,
        commission: 15000,
        commissionPaid: sb.status === "selesai",
        commissionPaidAt: sb.status === "selesai" ? new Date() : null,
        history: {
          create: [{ from: null, to: sb.status, note: "seed sample booking", changedBy: "system" }],
        },
      },
    });
  }
  console.log(`  ${sampleBookings.length} sample bookings`);

  console.log("Seeding reviews...");
  const doneBookings = await prisma.booking.findMany({
    where: { status: "selesai" },
    orderBy: { id: "asc" },
    take: 4,
  });
  const reviewData = [
    { rating: 5, comment: "Paket lengkap banget, pemandu sabar dan ramah. Borobudur sunrise-nya keren abis!" },
    { rating: 4, comment: "Tur nyaman, armada bersih, supir hafal jalan. Recommended buat keluarga." },
    { rating: 5, comment: "Pengalaman tak terlupakan! Itinerary fleksibel, gak diburu-buru." },
    { rating: 4, comment: "Harga sesuai, servis ramah. Next liburan ke Jogja pasti pesen di sini lagi." },
  ];
  let reviewCount = 0;
  for (let i = 0; i < reviewData.length && i < doneBookings.length; i++) {
    const bk = doneBookings[i];
    await prisma.review.upsert({
      where: { bookingId: bk.id },
      update: {
        rating: reviewData[i].rating,
        comment: reviewData[i].comment,
        packageId: bk.packageSlug ? (pkgList.find((p) => p.slug === bk.packageSlug)?.id ?? null) : null,
      },
      create: {
        bookingId: bk.id,
        packageId: bk.packageSlug ? (pkgList.find((p) => p.slug === bk.packageSlug)?.id ?? null) : null,
        rating: reviewData[i].rating,
        comment: reviewData[i].comment,
        verified: true,
      },
    });
    reviewCount++;
  }
  console.log(`  ${reviewCount} reviews`);

  console.log("Seed selesai ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
