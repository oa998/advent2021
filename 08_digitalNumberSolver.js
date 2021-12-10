const strToUniqueArray = (s) => [...new Set(s.split(""))];

class Solver {
  constructor(line) {
    // sort all words alphabetically from the start
    this.words = line.split(/\W+/g).map((w) => w.split("").sort().join(""));
    this.finalFour = this.words.slice(-4);
    /*     
          000
        1     2
        1     2
          333
        4     5
        4     5
          666
    */
    this.mapping = ["T", "TL", "TR", "M", "BL", "BR", "B"];
    this.solution = Array(7).fill();
    this.maskMap = {
      ["1110111"]: "0",
      ["0010010"]: "1",
      ["1011101"]: "2",
      ["1011011"]: "3",
      ["0111010"]: "4",
      ["1101011"]: "5",
      ["1101111"]: "6",
      ["1010010"]: "7",
      ["1111111"]: "8",
      ["1111011"]: "9",
    };
  }

  getDigit = (word) => {
    let mask = this.solution
      .map((s) => (word.includes(s) ? "1" : "0"))
      .join("");
    return this.maskMap[mask];
  };

  // if letters are provided, set. else retrieve
  __solution = (index, letters) => {
    if (!letters) {
      return this.solution[index];
    }
    if (typeof letters === "string") {
      letters = letters.split("");
    }
    this.solution[index] = letters;
  };

  T = (letters) => this.__solution(0, letters);
  TL = (letters) => this.__solution(1, letters);
  TR = (letters) => this.__solution(2, letters);
  M = (letters) => this.__solution(3, letters);
  BL = (letters) => this.__solution(4, letters);
  BR = (letters) => this.__solution(5, letters);
  B = (letters) => this.__solution(6, letters);

  len(v) {
    if (typeof v === "number") {
      return this.words.filter((w) => w.length === v);
    }
    if (typeof v === "string" || Array.isArray(v)) {
      return v.length;
    }
  }

  // returns letters not in both
  o = (v1, v2) => {
    if (typeof v1 === "string") {
      v1 = strToUniqueArray(v1);
    }
    if (typeof v2 === "string") {
      v2 = strToUniqueArray(v2);
    }
    let outside;
    if (v1.length > v2.length) {
      outside = v1.filter((v) => !v2.includes(v));
    } else {
      outside = v2.filter((v) => !v1.includes(v));
    }
    return outside;
  };

  // return if there are 'count' or more leters not in common
  hasO = (v1, v2, count = 1) => {
    return this.o(v1, v2).length >= count;
  };

  // returns letters in both
  i = (v1, v2) => {
    if (typeof v1 === "string") {
      v1 = strToUniqueArray(v1);
    }
    if (typeof v2 === "string") {
      v2 = strToUniqueArray(v2);
    }
    let inside;
    if (v1.length > v2.length) {
      inside = v1.filter((v) => v2.includes(v));
    } else {
      inside = v2.filter((v) => v1.includes(v));
    }
    return inside;
  };

  // return if there are 'count' or more leters in common
  hasI = (v1, v2, count = 1) => {
    return this.i(v1, v2).length >= count;
  };

  one = () => this.len(2).pop();
  four = () => this.len(4).pop();
  seven = () => this.len(3).pop();
  eight = () => "abcdefg";
  seen = () => strToUniqueArray(this.solution.flatMap((ary) => ary).join(""));

  solve = () => {
    const eight = this.eight();
    const one = this.one();
    const seven = this.seven();
    const top = this.o(one, seven); // single letter that's in "7" but not in "1"
    this.T(top); // solved top spot
    this.TR(one); // top-right is one of 2 possible answers
    this.BR(one); // bottom-right is one of 2 possible answers
    const four = this.four();
    const TL_M = this.o(one, four); // all letters that are in "4" but not in "1"
    this.TL(TL_M); // top-left is one of 2 possible answers
    this.M(TL_M); // middle is one of 2 possible answers
    const nine = this.len(6).find((w) => this.hasI(w, four, 4)); // nine is any letter that has length of 6 and contains the "4"
    this.B(this.o(nine, this.seen())); // solved bottom. Only character in "9" but not one we've seen in the other numbers yet.
    this.BL(this.o(eight, this.seen())); // solved bottom-left. Only character not present in a "9"

    const three = this.len(5).find(
      (w) =>
        this.hasI(w, one, 2) && this.hasI(w, this.T()) && this.hasI(w, this.B())
    ); // "3" is six-digits, contains the "1", contains the character in the top spot, contains the character in the bottom spot
    this.M(this.i(three, this.M())); // solved middle. Of the 2 characters in the middle solution so far, the one that is inside the "3" is in the middle spot
    this.TL(this.o(this.M(), this.TL())); // solved top-left. Of the 2 characters in the top-left solution so far, the one that is not in the middle spot

    const five = this.len(5).find(
      (w) => this.hasI(w, this.TL()) && this.i(w, one).length == 1
    ); // "5" is five-digits, contains the top-left character and has a single letter in common with the "1"
    this.BR(this.i(five, one)); // solved bottom-right. Whatever character that is common between the "1" and the "5" is the answer
    this.TR(this.o(this.BR(), one)); // solved top-right. Whatever character that is not common between the "1" and the "5" is the answer

    const ans = Number(
      this.finalFour.map((word) => this.getDigit(word)).join("")
    );
    return ans;
  };
}

export default Solver;
