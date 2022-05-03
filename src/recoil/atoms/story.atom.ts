import { atom } from 'recoil';
import { StoryModel } from '../../model/story.model';

export const StorynitialState: StoryModel =
{
    stories: {
        mode: 'static',
        static: []
    }
}
const storyAtom = atom<StoryModel>({
    key: 'storyAtom',
    default: StorynitialState
});

export default storyAtom;

