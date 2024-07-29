// utils/fileUtils.js

/**
 * Converts a Base64 string to a File object.
 * @param {string} base64 - The Base64 string.
 * @param {string} filename - The name of the file.
 * @returns {File} - The File object.
 */
export async function base64ToFile(base64, fileName) {
  const base64Data = base64.split(',')[1];
  const binaryString = window.atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'application/octet-stream' });
  return new File([blob], fileName, { type: blob.type });
}


function getFileExtension(mimeType) {
  const mimeTypeToExtension = {
    'application/pdf': '.pdf',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
  };

  return mimeTypeToExtension[mimeType] || '';
}


export function dataURLToFile(dataURL, fileName) {
  const [header, data] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const extension = getFileExtension(mime);
  fileName = fileName + extension;
  const binaryString = window.atob(data);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return new File([arrayBuffer], fileName, { type: mime });
}


/**
 * Converts a File object to a Base64 string.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} - A promise that resolves to the Base64 string.
 */
export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

