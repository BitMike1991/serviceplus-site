import { NextResponse } from "next/server";

// Rate limit: simple in-memory store (resets on deploy)
const rateLimits = new Map();
const MAX_PER_IP = 5; // 5 generations per hour per IP
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimits.get(ip);

  if (!record || now - record.start > WINDOW_MS) {
    rateLimits.set(ip, { start: now, count: 1 });
    return true;
  }

  if (record.count >= MAX_PER_IP) return false;
  record.count++;
  return true;
}

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Vous avez atteint la limite. Réessayez dans une heure ou appelez-nous pour une consultation gratuite.",
        },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get("image");
    const color = formData.get("color");

    if (!imageFile || !color) {
      return NextResponse.json(
        { error: "Image et couleur requises" },
        { status: 400 }
      );
    }

    // Validate file size (4MB max for OpenAI)
    if (imageFile.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image trop grande. Maximum 4 Mo." },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Format accepté : PNG, JPEG ou WebP" },
        { status: 400 }
      );
    }

    // Build prompt
    const prompt = `Change the color of the kitchen cabinets to ${color}. Keep everything else in the image exactly the same — countertops, appliances, walls, floor, lighting. Only change the cabinet color. The result should look realistic and professional, as if the cabinets were professionally refinished with an epoxy coating in ${color}.`;

    // Call OpenAI Images Edit API
    const openaiForm = new FormData();
    openaiForm.append("model", "gpt-image-1");
    openaiForm.append("image", imageFile);
    openaiForm.append("prompt", prompt);
    openaiForm.append("size", "1024x1024");
    openaiForm.append("n", "1");

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: openaiForm,
      }
    );

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error("OpenAI API error:", openaiResponse.status, errorData);
      return NextResponse.json(
        {
          error:
            "Erreur lors de la génération. Réessayez avec une autre photo.",
        },
        { status: 502 }
      );
    }

    const result = await openaiResponse.json();

    // Return the generated image URL
    const imageUrl = result.data?.[0]?.url || result.data?.[0]?.b64_json;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Aucune image générée. Réessayez." },
        { status: 500 }
      );
    }

    // If b64_json, return as data URL; otherwise return the URL
    const isBase64 = !imageUrl.startsWith("http");
    return NextResponse.json({
      image: isBase64 ? `data:image/png;base64,${imageUrl}` : imageUrl,
    });
  } catch (error) {
    console.error("Visualize API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez." },
      { status: 500 }
    );
  }
}
