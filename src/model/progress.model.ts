export interface Progress {
    currentIndex: number;
    total: number;
    interval: number;
    isPaused: boolean;
    isLoading: boolean;
    isMounted: boolean;
    status: 'playing' | 'paused' | 'stopped';
}