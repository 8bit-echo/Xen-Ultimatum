declare global {
  interface Window {
    api: XenAPI;
  }
}

declare module api {
  declare let api: XenAPI;

  export interface XenAPI {
    media: MediaAPI;
  }

  interface XenObservable {
    observeData: () => void;
  }

  interface MediaAPI extends XenObservable {
    isStopped: boolean;
    isPlaying: boolean;
    nowPlaying: {
      title: string;
      artist: string;
      artwork: string[];
      elapsed: number;
      length: number;
    };
    volume: number;
    observeElapsedTime: (newElapsedTime: number) => void;
  }
}
