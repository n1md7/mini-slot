export declare global {
  interface Window {
    CrazyGames: {
      SDK: {
        getEnvironment: () => Promise<'local' | 'crazygames' | 'disabled'>;
        ad: {
          requestAd: (
            type: 'rewarded' | 'midgame',
            callbacks: {
              adFinished: () => void;
              adStarted: () => void;
              adError: (error: string) => void;
            },
          ) => void;
          hasAdblock: () => Promise<unknown>;
        };
        user: Object;
        banner: {
          requestBanner: (options: Record<string, any>) => Promise<void>;
          clearBanner: (name: string) => Promise<void>;
          clearAllBanners: () => Promise<void>;
        };
        game: {
          /**
           * The happytime() method can be called on various player achievements (beating a boss, reaching a highscore, etc.).
           * It makes the website celebrate (for example by launching some confetti). There is no need to call this when a level
           * is completed, or an item is obtained.
           */
          happytime: () => Promise<void>;
          /**
           * The gameplayStop() function has to be called on every game break (entering a menu, switching level, pausing the game, ...)
           * don't forget to call gameplayStart() when the gameplay resumes.
           */
          gameplayStop: () => Promise<void>;
          /**
           * The gameplayStart() function has to be called whenever the player starts playing or resumes playing after a break
           * (menu/loading/achievement screen, game paused, etc.).
           */
          gameplayStart: () => Promise<void>;
          /**
           * The sdkGameLoadingStart() function has to be called whenever you start loading your game.
           */
          sdkGameLoadingStart: () => Promise<void>;
          /**
           * The sdkGameLoadingStop() function has to be called when the loading is complete and eventually the gameplay starts.
           */
          sdkGameLoadingStop: () => Promise<void>;
        };
      };
    };
  }
}
