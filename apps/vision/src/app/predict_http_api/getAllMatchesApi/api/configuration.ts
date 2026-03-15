export class Configuration {
  basePath?: string;
  withCredentials?: boolean;

  selectHeaderAccept(_accepts: string[]): string | undefined {
    return _accepts.length ? _accepts[0] : undefined;
  }

  isJsonMime(mime: string): boolean {
    return mime === 'application/json' || mime.endsWith('+json');
  }
}
