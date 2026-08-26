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

  console.log("Seed selesai ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
