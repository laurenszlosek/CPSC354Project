//Create Audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const c3 = new Audio('PianoNotes/C.mp3');
const e3 = new Audio('PianoNotes/E.mp3');
const g3 = new Audio('PianoNotes/G.mp3');

function playNote(note, durationInSeconds, startTime) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "triangle";//we will need to make this to sound like the instrument of our choice
  oscillator.frequency.setValueAtTime(noteFrequencies[note], audioContext.currentTime + startTime);

  //ADSR envelope
  const now = audioContext.currentTime;
  const attackTime = 1; //attack time in seconds 
  const decayTime = 1; //decay time in seconds
  const sustainLevel = 1; //Sustain level (0 to 1)
  const releaseTime = 1; //release time in seconds

  

  oscillator.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime + startTime);

  oscillator.frequency.exponentialRampToValueAtTime(noteFrequencies[note], now + startTime + attackTime);

  oscillator.frequency.exponentialRampToValueAtTime(noteFrequencies[note] * sustainLevel, now + startTime + attackTime + decayTime);
  oscillator.stop(audioContext.currentTime + startTime + durationInSeconds);
}

function playMelody(melody) {//accepts a melody and plays it
  const startTime = audioContext.currentTime;

  const promises = melody.map((noteInfo) => {//ensures the notes play at the correct time
    return new Promise((resolve) => {
      playNote(noteInfo.note, noteInfo.duration, noteInfo.startTime);
      setTimeout(() => resolve(), noteInfo.duration * 1000);
    });
  });

  return Promise.all(promises).then(() => {
    console.log("Melody finished.");
  });
}

// Example melody
const melody = [
  { note: "C3", duration: 4, startTime: 0 },
  { note: "E3", duration: 3, startTime: 1 },
  { note: "G3", duration: 2, startTime: 2 },
  // { note: "C5", duration: 0.5, startTime: 0.5 },
  // { note: "E5", duration: 0.5, startTime: 0.5 },
  // { note: "G5", duration: 0.5, startTime: 0.5 },
];

const playButton = document.getElementById("playButton");
  playButton.addEventListener("click", function () {
    // playMelody(melody).then(() => {
    //   console.log("Playback completed.");
    // });
    c3.currentTime = 0;
    e3.currentTime = 0;
    g3.currentTime = 0;

    c3.playbackRate = 0.4;
    e3.playbackRate = 0.4;
    g3.playbackRate = 0.4;

    c3.play();
    e3.play();
    g3.play();
  });
  
//define the frequencies of the notes
//we might want to include Fb, E#, B#, and Cb in the future just to be more exhaustive
const noteFrequencies = {
  "C0": 16.35,
  "C#0": 17.32,
  "Db0": 17.32,
  "D0": 18.35,
  "D#0": 19.45,
  "Eb0": 19.45,
  "E0": 20.60,
  "F0": 21.83,
  "F#0": 23.12,
  "Gb0": 23.12,
  "G0": 24.50,
  "G#0": 25.96,
  "Ab0": 25.96,
  "A0": 27.50,
  "A#0": 29.14,
  "Bb0": 29.14,
  "B0": 30.87,

  "C1": 32.70,
  "C#1": 34.65,
  "Db1": 34.65,
  "D1": 36.71,
  "D#1": 38.89,
  "Eb1": 38.89,
  "E1": 41.20,
  "F1": 43.65,
  "F#1": 46.25,
  "Gb1": 46.25,
  "G1": 49.00,
  "G#1": 51.91,
  "Ab1": 51.91,
  "A1": 55.00,
  "A#1": 58.27,
  "Bb1": 58.27,
  "B1": 61.74,

  "C2": 65.41,
  "C#2": 69.30,
  "Db2": 69.30,
  "D2": 73.42,
  "D#2": 77.78,
  "Eb2": 77.78,
  "E2": 82.41,
  "F2": 87.31,
  "F#2": 92.50,
  "Gb2": 92.50,
  "G2": 98.00,
  "G#2": 103.83,
  "Ab2": 103.83,
  "A2": 110.00,
  "A#2": 116.54,
  "Bb2": 116.54,
  "B2": 123.47,

  "C3": 130.81,
  "C#3": 138.59,
  "Db3": 138.59,
  "D3": 146.83,
  "D#3": 155.56,
  "Eb3": 155.56,
  "E3": 164.81,
  "F3": 174.61,
  "F#3": 185.00,
  "Gb3": 185.00,
  "G3": 196.00,
  "G#3": 207.65,
  "Ab3": 207.65,
  "A3": 220.00,
  "A#3": 233.08,
  "Bb3": 233.08,
  "B3": 246.94,

  "C4": 261.63, 
  "C#4": 277.18, 
  "Db4": 277.18,
  "D4": 293.66,
  "D#4": 311.13,
  "Eb4": 311.13,
  "E4": 329.63, 
  "F4": 349.23,
  "F#4": 369.99,
  "Gb4": 369.99,
  "G4": 392.00,
  "G#4": 415.30,
  "Ab4": 415.30,
  "A4": 440.00,
  "A#4": 466.16,
  "Bb4": 466.16,
  "B4": 493.88,

  "C5": 523.25,
  "C#5": 554.37,
  "Db5": 554.37,
  "D5": 587.33,
  "D#5": 622.25,
  "Eb5": 622.25,
  "E5": 659.26,
  "F5": 698.46,
  "F#5": 739.99,
  "Gb5": 739.99,
  "G5": 783.99,
  "G#5": 830.61,
  "Ab5": 830.61,
  "A5": 880.00,
  "A#5": 932.33,
  "Bb5": 932.33,
  "B5": 987.77,

  "C6": 1046.50,
  "C#6": 1108.73,
  "Db6": 1108.73,
  "D6": 1174.66,
  "D#6": 1244.51,
  "Eb6": 1244.51,
  "E6": 1318.51,
  "F6": 1396.91,
  "F#6": 1479.98,
  "Gb6": 1479.98,
  "G6": 1567.98,
  "G#6": 1661.22,
  "Ab6": 1661.22,
  "A6": 1760.00,
  "A#6": 1864.66,
  "Bb6": 1864.66,
  "B6": 1975.53,

  "C7": 2093.00,
  "C#7": 2217.46,
  "Db7": 2217.46,
  "D7": 2349.32,
  "D#7": 2489.02,
  "Eb7": 2489.02,
  "E7": 2637.02,
  "F7": 2793.83,
  "F#7": 2959.96,
  "Gb7": 2959.96,
  "G7": 3135.96,
  "G#7": 3322.44,
  "Ab7": 3322.44,
  "A7": 3520.00,
  "A#7": 3729.31,
  "Bb7": 3729.31,
  "B7": 3951.07,

  "C8": 4186.01,
  "C#8": 4434.92,
  "Db8": 4434.92,
  "D8": 4698.64,
  "D#8": 4978.03,
  "Eb8": 4978.03,
  "E8": 5274.04,
  "F8": 5587.65,
  "F#8": 5919.91,
  "Gb8": 5919.91,
  "G8": 6271.93,
  "G#8": 6644.88,
  "Ab8": 6644.88,
  "A8": 7040.00,
  "A#8": 7458.62,
  "Bb8": 7458.62,
  "B8": 7902.13,
};

