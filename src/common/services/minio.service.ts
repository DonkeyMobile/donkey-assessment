import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: true,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
});

export default minioClient;