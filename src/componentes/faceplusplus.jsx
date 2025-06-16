
const API_KEY = "BywWZn409EB8nMs2uKxpm4ikMpQCcySY";
const API_SECRET = "-Cu1xLoyMMoOvn8pNhAqnAVhcYeQPrOQ";

export async function detectarRostro(imageBase64) {
  const formData = new FormData();
  formData.append("api_key", API_KEY);
  formData.append("api_secret", API_SECRET);
  formData.append("image_base64", imageBase64.replace(/^data:image\/\w+;base64,/, ""));
  formData.append("return_attributes", "gender,age,smiling");

  const response = await fetch("https://api-us.faceplusplus.com/facepp/v3/detect", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
}



export async function compararRostros(image1, image2) {
  const formData = new FormData();
  formData.append("api_key", API_KEY);
  formData.append("api_secret", API_SECRET);
  formData.append("image_base64_1", image1.replace(/^data:image\/\w+;base64,/, ""));
  formData.append("image_base64_2", image2.replace(/^data:image\/\w+;base64,/, ""));

  const response = await fetch("https://api-us.faceplusplus.com/facepp/v3/compare", {
    method: "POST",
    body: formData
  });

  return await response.json();
}

/// Nuevo 23