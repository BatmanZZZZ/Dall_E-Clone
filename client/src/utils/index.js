import { surpriseMePrompts } from "../constants";
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
  let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  let randomPrompt = surpriseMePrompts[randomIndex];

  // Check if the randomly selected prompt is the same as the current prompt
  // If they are the same, generate a new random index again until a different prompt is found
  while (randomPrompt === prompt) {
    randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    randomPrompt = surpriseMePrompts[randomIndex];
  }

  return randomPrompt;
}

export async function downloadImage(_id,photo){
  FileSaver.saveAs(photo,`download-${_id}.jpg`);
}



