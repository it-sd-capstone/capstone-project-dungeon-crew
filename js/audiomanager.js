"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundEffect = exports.Music = exports.AudioManager = void 0;
require("jquery");
class AudioManager {
    constructor() {
    }
    static addMusic(name, element) {
        let mus = new Music(name, element);
        this.music.push(mus);
        return mus;
    }
    static addSoundEffect(name, element) {
        let snd = new SoundEffect(name, element);
        this.sfx.push(snd);
        return snd;
    }
    static findMusic(name) {
        let result = null;
        for (let i = 0; i < this.music.length; i++) {
            if (this.music[i].name == name) {
                result = this.music[i];
                break;
            }
        }
        return result;
    }
    static stopAllMusic() {
        for (let i = 0; i < this.music.length; i++) {
            this.music[i].stop();
        }
    }
    static findSoundEffect(name) {
        let result = null;
        for (let i = 0; i < this.sfx.length; i++) {
            if (this.sfx[i].name == name) {
                result = this.sfx[i];
                break;
            }
        }
        return result;
    }
    static stopAllSoundEffects() {
        for (let i = 0; i < this.sfx.length; i++) {
            this.sfx[i].stop();
        }
    }
    static stopAllSounds() {
        this.stopAllMusic();
        this.stopAllSoundEffects();
    }
    static importAudio() {
        let musicElements = $(".music");
        let sfxElements = $(".sfx");
        for (let i = 0; musicElements.length; i++) {
            this.addMusic(musicElements[i].id, musicElements[i]);
        }
        for (let i = 0; sfxElements.length; i++) {
            this.addSoundEffect(sfxElements[i].id, sfxElements[i]);
        }
    }
}
exports.AudioManager = AudioManager;
class Music {
    constructor(name, element) {
        this.element = element;
        this.name = name;
        this.element.loop = true;
    }
    play() {
        AudioManager.stopAllMusic();
        this.element.play();
    }
    stop() {
        this.element.pause();
        this.element.currentTime = 0;
    }
}
exports.Music = Music;
class SoundEffect {
    constructor(name, element) {
        this.element = element;
        this.name = name;
        this.element.loop = false;
    }
    play() {
        this.element.play();
    }
    stop() {
        this.element.pause();
        this.element.currentTime = 0;
    }
}
exports.SoundEffect = SoundEffect;
