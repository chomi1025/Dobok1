export const compressImage = async (
  file: File, // 1. 입력받는 파일은 File 객체
  maxWidth: number = 1200,
  maxHeight: number = 1200,
  quality: number = 0.5,
): Promise<File> => {
  // 2. 결과물도 File 객체를 약속(Promise)함
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      // e.target.result가 string | ArrayBuffer인데 Image.src는 string을 원함
      if (e.target?.result) {
        image.src = e.target.result as string;
      }
    };

    image.onload = () => {
      const canvas = document.createElement("canvas");
      let width = image.width;
      let height = image.height;

      // 비율 유지하면서 리사이즈 로직
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas Context를 가져올 수 없습니다."));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);

      // 3. Blob 생성 및 File 객체로 변환
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Blob 생성 실패"));
            return;
          }
          // 압축된 결과를 다시 File 객체로 만들어서 반환
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
          });
          resolve(compressedFile);
        },
        "image/jpeg",
        quality,
      );
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
