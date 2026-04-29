export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  formData.append("upload_preset", "dobok1_preset");
  formData.append("folder", "Dobok1/products");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Cloudinary 업로드 실패:", errorData);
    throw new Error("이미지 업로드 중 오류가 발생했습니다.");
  }

  const data = await response.json();
  return data.secure_url;
};
