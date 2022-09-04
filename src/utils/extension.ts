enum ImageExt {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  GIF = 'gif',
  WEBP = 'webp',
  SVG = 'svg',
  TIF = 'tif',
  TIFF = 'tiff',
  BMP = 'bmp',
}

enum AudioExt {
  MP3 = 'mp3',
  WAV = 'wav',
  OGG = 'ogg',
}

export class Extension {
  private static readonly imageAllowedExtensions: NonNullable<ImageExt[]> = [
    ImageExt.PNG,
    ImageExt.JPG,
    ImageExt.BMP,
    ImageExt.GIF,
    ImageExt.SVG,
    ImageExt.TIF,
    ImageExt.TIFF,
    ImageExt.WEBP,
    ImageExt.JPEG,
  ];
  private static readonly audioAllowedExtensions: NonNullable<AudioExt[]> = [AudioExt.MP3, AudioExt.WAV, AudioExt.OGG];

  public static imageFileVerify(resource: string): Error | null {
    const extension = Extension.extract<ImageExt>(resource);
    if (!Extension.imageAllowedExtensions.includes(extension)) {
      return Error(`Image type [${extension}] not allowed to load!`);
    }

    return null;
  }

  public static audioFileVerify(resource: string): Error | null {
    const extension = Extension.extract<AudioExt>(resource);
    if (!Extension.audioAllowedExtensions.includes(extension)) {
      return new Error(`Audio type [${extension}] not allowed to load!`);
    }

    return null;
  }

  private static extract<T = unknown>(resource: string): T {
    const parts = resource.split('.');

    return (<unknown>parts[parts.length - 1].toLowerCase()) as T;
  }
}
