import './styles/main.scss';
import Bar from './scripts/bar';
import { getAudio, printAudio } from './scripts/allVoices';

getAudio().then(result => printAudio(result));
new Bar(bar);