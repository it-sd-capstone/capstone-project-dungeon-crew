import 'jquery'
export class AudioManager {
    public constructor() {
    }

    private static music: Music[];
    private static sfx: SoundEffect[];

    public static addMusic(name: string, element: HTMLElement) : Music { // adds a music track
        let mus = new Music(name,element as HTMLAudioElement);
        this.music.push(mus);
        return mus;
    }

    public static addSoundEffect(name: string, element: HTMLElement) : SoundEffect { // adds a sound effect
        let snd = new SoundEffect(name,element as HTMLAudioElement);
        this.sfx.push(snd);
        return snd;
    }

    public static findMusic(name: string) : Music { // finds a music class by name
        let result = null;
        for (let i = 0; i < this.music.length; i++) {
            if (this.music[i].name == name) {
                result = this.music[i];
                break;
            }
        }
        return result;
    }

    public static stopAllMusic() : void {
        for (let i = 0; i < this.music.length; i++) {
            this.music[i].stop();
        }
    }

    public static findSoundEffect(name: string) : SoundEffect { // finds a music class by name
        let result = null;
        for (let i = 0; i < this.sfx.length; i++) {
            if (this.sfx[i].name == name) {
                result = this.sfx[i];
                break;
            }
        }
        return result;
    }

    public static stopAllSoundEffects() : void {
        for (let i = 0; i < this.sfx.length; i++) {
            this.sfx[i].stop();
        }
    }

    public static stopAllSounds() : void {
        this.stopAllMusic();
        this.stopAllSoundEffects();
    }

    public static importAudio() : void {
        let musicElements = $(".music");
        let sfxElements = $(".sfx");

        for (let i = 0; musicElements.length; i++) {
            this.addMusic(musicElements[i].id,musicElements[i]);
        }

        for (let i = 0; sfxElements.length; i++) {
            this.addSoundEffect(sfxElements[i].id, sfxElements[i]);
        }
    }
}

export class Music {
    constructor(
        name: string,
        element: HTMLAudioElement
    ) {
        this.element = element;
        this.name = name;

        this.element.loop = true;
    }
    element: HTMLAudioElement;
    name: string;

    play() : void { // stop all other music and start playing this track
        AudioManager.stopAllMusic();
        this.element.play();
    }

    stop() : void { // stop this track
        this.element.pause();
        this.element.currentTime = 0;
    }
}

export class SoundEffect {
    constructor(
        name: string,
        element: HTMLAudioElement
    ) {
        this.element = element;
        this.name = name;

        this.element.loop = false;
    }
    element: HTMLAudioElement;
    name: string;

    play() : void { // play this sound effect
        this.element.play();
    }

    stop() : void { // stop this sound effect
        this.element.pause();
        this.element.currentTime = 0;
    }
}