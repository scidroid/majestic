const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = Buffer.from(arr[1], "base64");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr[n];
  }

  return new File([u8arr], filename, { type: mime });
};

const uploadImage = async (image: File) => {
  const form = new FormData();

  form.append("file", image);
  form.append("upload_preset", "banner");

  const CDN_URL = "https://api.cloudinary.com/v1_1/ninjo/image/upload";

  const request = await fetch(CDN_URL, {
    method: "POST",
    body: form,
  });

  const response = await request.json();

  return response.secure_url;
};

export { base64ToFile, uploadImage };
