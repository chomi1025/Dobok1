import { createClient } from "@supabase/supabase-js";
import { prisma } from "../prisma";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// 1. 이미지 객체 타입 정의 (보통 file과 preview용 url을 같이 들고 있지?)
interface ImageFile {
  file: File;
  url?: string;
}

// 2. 상품 등록 body 타입 정의
interface CreateProductBody {
  name: string;
  description?: string;
  status?: string;
  origin: string;
  material: string;
  categoryId: number;
  price: number; // 기본 가격
  stock: number; // 기본 재고
  options: {
    color?: string | null;
    size?: string | null;
    price: number;
    stock: number;
    status?: string;
  }[];
}

// 이미지 업로드 함수
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

// 파일들을 스토리지에 업로드하는 함수
export const uploadFilesToStorage = async (
  thumbnail: ImageFile | null,
  images: ImageFile[],
) => {
  let thumbnailUrl = "";
  if (thumbnail?.file) {
    // compressImage 함수가 있다고 가정 (없으면 에러날 수 있으니 확인!)
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

// 상품 등록 함수
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
