declare let api: XenAPI;

declare global {
  interface Window {
    app: any /* Vuex store */;
  }
}

interface XenAPI {
  media: MediaAPI;
}

interface XenObservable {
  observeData: (callback: (data: unknown) => void) => void;
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
  observeElapsedTime: (callback: (elapsedTime: number) => void) => void;
}

const API = (): void => {
  api.media.observeElapsedTime(newElapsedTime => {
    return window.app.$store.commit('TRACK_PROGRESS', newElapsedTime);
  });

  api.media.observeData(
    ({ isPlaying, isStopped, nowPlaying, volume, queue }) => {
      window.app.$store.commit('MUSIC_DATA', {
        isPlaying,
        isStopped,
        nowPlaying,
        volume,
        queue
      });
    }
  );
};

export { API as default };
