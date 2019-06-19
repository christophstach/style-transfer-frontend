function dataUrlToBlob(dataUrl: string): Blob {
  let bytes;

  if (dataUrl.split(',')[0].indexOf('base64') >= 0) {
    bytes = atob(dataUrl.split(',')[1]);
  } else {
    bytes = unescape(dataUrl.split(',')[1]);
  }

  const mime = dataUrl.split(',')[0].split(':')[1].split(';')[0];
  const intArray = new Uint8Array(bytes.length);

  for (let i = 0; i < bytes.length; i++) {
    intArray[i] = bytes.charCodeAt(i);
  }

  return new Blob([intArray], {type: mime});
}


export { dataUrlToBlob };
