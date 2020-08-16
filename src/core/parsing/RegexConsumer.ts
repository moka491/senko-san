import execWithIndices, { RegExpExecIndicesArray } from "regexp-match-indices";

export class RegexConsumer {
  constructor(public text: string) {}

  get(regex: RegExp, indices: number[] = [0]): string[] {
    // uses match indices polyfill until the proposal https://github.com/tc39/proposal-regexp-match-indices is implemented
    let match = execWithIndices(regex, this.text);

    if (match) {
      let consumeRanges: RegExpExecIndicesArray = match.indices
        // filter out the match indices which we didn't request
        .filter((item, i) => indices.includes(i))
        // filter out the (nested) groups which are encapsulated completely in other groups.
        .filter(
          (range, index, self) =>
            range &&
            !self.some(
              (otherRange, otherIndex) =>
                otherRange &&
                index !== otherIndex &&
                otherRange[0] <= range[0] &&
                range[1] <= otherRange[1]
            )
        )
        // Sort by descending end index, so that removal can work
        .sort((a, b) => b[1] - a[1]);

      // Consume the found ranges
      for (const [start, end] of consumeRanges) {
        this.text = this.text.slice(0, start) + this.text.slice(end);
      }

      // Return array of matched strings found
      return indices.map((index) => match[index] || null);
    }

    // If nothing was found, return array of nulls so that array destructuring doesn't break
    return indices.map((index) => null);
  }
}
