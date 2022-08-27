enum ImageExt {
  PNG = 'png',
  JPG = 'jpg',
}

enum AudioExt {
  MP3 = 'mp3',
  WAV = 'wav',
}

export class Extension {
  private static readonly imageAllowedExtensions: NonNullable<ImageExt[]> = [ImageExt.PNG, ImageExt.JPG];
  private static readonly audioAllowedExtensions: NonNullable<AudioExt[]> = [AudioExt.MP3, AudioExt.WAV];

  private static extract<T = unknown>(resource: string): T {
    const parts = resource.split('.');

    return (<unknown>parts[parts.length - 1].toLowerCase()) as T;
  }

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
}
