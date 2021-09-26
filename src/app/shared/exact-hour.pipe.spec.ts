import {ExactHourPipe} from "./exact-hour.pipe";

describe('ExactHourPipe', () => {
  describe('Isolated ExactHourPipeTests', () => {

    const pipe = new ExactHourPipe;

    it('Should return only minutes if less then 60', () => {
      const minute = 50;
      const expectedValue = '50m';
      expect(pipe.transform(minute)).toBe(expectedValue);
    })

    it('Should return only hours if completely divisible by 60', () => {
      const minute = 120;
      const expectedValue = '2h';
      expect(pipe.transform(minute)).toBe(expectedValue);
    })

    it('Should return full time format if devides with the remaindes by 60', () => {
      const minute = 83;
      const expectedValue = '1h 23m';
      expect(pipe.transform(minute)).toBe(expectedValue);
    })

    it('Should return value like "immediately" if equal or less then 0', () => {
      const minute = -1;
      const expectedValue = 'immediately';
      expect(pipe.transform(minute)).toBe(expectedValue);
    })
  })
})
