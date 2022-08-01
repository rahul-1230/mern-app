const sharp = require("sharp");

async function resizeImage() {
  try {
    await sharp("image.png")
      .resize({
        width: 150,
        height: 97
      })
      .toFile("resized-image.png");
  } catch (error) {
    console.log(error);
  }
}

resizeImage();


var metaData = async function () {
  
  try{
  const metadata = await sharp("image1.png").metadata();
  return metaData;
  }
  catch(err){
    console.log(err);
  }
}
console.log(metaData);