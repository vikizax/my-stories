import { CSSProperties } from "react";

export interface Story {
    url: string;
    type: 'img' | 'video';
    title?: string;
    description?: string;
}

export interface StoryModel {
    stories: {
        static?: Story[];
        api?: (...params: any[]) => Promise<Story[]>
        mode: 'static' | 'api';
    }
    imageStyle?: CSSProperties;
    videoStyle?: CSSProperties;
    imageContainerStyle?: CSSProperties;
    videoContainerStyle?: CSSProperties;
    storyBodyStyle?: CSSProperties;
}