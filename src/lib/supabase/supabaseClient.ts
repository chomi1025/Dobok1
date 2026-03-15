import { createClient } from "@supabase/supabase-js";
import { prisma } from "../prisma";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

interface ImageFile {
  file: File;
  url?: string;
}

interface CreateProductBody {
  name: string;
  description?: string;
  status?: string;
  origin: string;
  material: string;
  categoryId: number;
  price: number;
  stock: number;
  options: {
    color?: string | null;
    size?: string | null;
    price: number;
    stock: number;
    status?: string;
  }[];
}

export const uploadImage = async (
  file: Blob | File,
  bucket: string,
): Promise<string> => {
  const ext = (file as File).name?.split(".").pop() || "jpg";
  const safeFileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const path = `${safeFileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
};

export const uploadFilesToStorage = async (
  thumbnail: ImageFile | null,
  images: ImageFile[],
) => {
  let thumbnailUrl = "";
  if (thumbnail?.file) {
    const compressedThumbnail = await (window as any).compressImage(
      thumbnail.file,
      800,
      800,
      0.7,
    );
    thumbnailUrl = await uploadImage(compressedThumbnail, "thumbnails");
  }

  const imagesUrls = await Promise.all(
    images.map(async (img) => {
      if (img.file) {
        const compressed = await (window as any).compressImage(
          img.file,
          1200,
          1200,
          0.7,
        );
        const url = await uploadImage(compressed, "details");
        return { ...img, url };
      }
      return img;
    }),
  );

  return { thumbnailUrl, imagesUrls };
};

export const createProduct = async (
  body: CreateProductBody,
  thumbnail: ImageFile | null,
  images: ImageFile[],
) => {
  const { thumbnailUrl, imagesUrls } = await uploadFilesToStorage(
    thumbnail,
    images,
  );

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      thumbnail: thumbnailUrl,
      images: imagesUrls.map((i) => i.url as string).filter(Boolean),
      origin: body.origin,
      material: body.material,
      categoryId: body.categoryId,
      options: {
        create:
          body.options && body.options.length > 0
            ? body.options.map((opt) => ({
                price: opt.price,
                stock: opt.stock,
                color: opt.color || null,
                size: opt.size || null,
                status: opt.status || "판매중",
              }))
            : [
                {
                  price: body.price,
                  stock: body.stock,
                  color: null,
                  size: null,
                },
              ],
      },
    },
  });

  return product;
};
