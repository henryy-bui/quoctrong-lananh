// Background music element, created when the app bundle loads (not when
// AudioPlayer mounts after the splash) so the file starts downloading
// during the loading screen and is ready by the first user interaction.
export const bgm = new Audio("/music.mp3");
bgm.loop = true;
bgm.preload = "auto";
bgm.volume = 0.15;
bgm.load();
