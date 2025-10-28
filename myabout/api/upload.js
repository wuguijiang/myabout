// api/upload.js
import { put } from '@vercel/blob';

export default async function handler(request, response) {
  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return response.status(405).json({ error: '只允许 POST 请求' });
  }

  try {
    // 获取文件名参数
    const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
    const filename = searchParams.get('filename');

    if (!filename) {
      return response.status(400).json({ error: '缺少文件名参数' });
    }

    // 读取请求体中的文件数据
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // 上传到 Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
    });

    // 返回图片的 URL
    return response.status(200).json({ url: blob.url });
  } catch (error) {
    console.error('上传失败:', error);
    return response.status(500).json({ error: '上传失败: ' + error.message });
  }
}