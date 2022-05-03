import { atom } from 'recoil';
import { Progress } from '../../model/progress.model';

export const progressInitialState: Progress = {
    currentIndex: 0,
    total: 0,
    interval: 6000,
    isLoading: false,
    isMounted: false,
    isPaused: false,
    status: 'stopped'
}

const progressAtom = atom<Progress>({
    key: 'progress',
    default: progressInitialState,
})

export default progressAtom;