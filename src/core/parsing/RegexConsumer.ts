export class RegexConsumer {
  constructor(public text: string) {}

  get(regex: RegExp, groupIndex: number = 0): string {
    let match = this.text.match(regex);

    // consume from input
    if (match && match[groupIndex]) {
      const matchedText = match[groupIndex];

      this.text =
        this.text.substring(0, match.index) +
        this.text.substring(match.index + match[0].length);

      return matchedText;
    }
  }
}
