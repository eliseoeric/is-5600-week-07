// node-src/src/script/seed.ts
import cuid from "cuid";
import db from "../db";
import { clearAll, insertMany } from "../products";

function makeProduct(n: number) {
  // demo "price" uses likes in this lab
  const likes = 8 + (n % 20);
  const tagA = ["texture", "abstract", "minimal", "pattern", "geometric"][n % 5];
  const tagB = ["blue", "gold", "smoke", "city", "nature"][n % 5];

  const img = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";

  return {
    _id: cuid(),
    description: `sample #${n}`,
    alt_description: `sample ${tagA} / ${tagB}`,
    likes,
    urls: { regular: img, small: img, thumb: img },
    links: { self: "https://unsplash.com/photos/sample", html: "https://unsplash.com/photos/sample" },
    user: { id: "u1", first_name: "Demo", last_name: "User", portfolio_url: "", username: "demo" },
    tags: [{ title: tagA }, { title: tagB }],
  };
}

async function run() {
  try {
    // ensure DB is connected (db.ts handles connecting)
    await clearAll();
    const items = Array.from({ length: 36 }, (_, i) => makeProduct(i + 1));
    await insertMany(items);
    console.log(`Seeded ${items.length} products.`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await db.disconnect();
  }
}

run();
