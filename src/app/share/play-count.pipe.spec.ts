import { PlayCountPipe } from './pipes/play-count.pipe';

describe('PlayCountPipe', () => {
  it('create an instance', () => {
    const pipe = new PlayCountPipe();
    expect(pipe).toBeTruthy();
  });
});
