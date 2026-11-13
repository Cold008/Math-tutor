function makeQuestion(q, options, answer, explanation) {
  return { q, options, answer, explanation };
}

function createQuestionSet(count, builder) {
  const questions = [];
  for (let i = 1; i <= count; i += 1) {
    questions.push(builder(i));
  }
  return questions;
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const temp = x % y;
    x = y;
    y = temp;
  }

  return x;
}

function simplifyFraction(numerator, denominator) {
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
}

function formatFraction(numerator, denominator) {
  const result = simplifyFraction(numerator, denominator);
  return `${result.numerator}/${result.denominator}`;
}

function pickOptions(correct, wrong1, wrong2, wrong3) {
  return [wrong1, wrong2, correct, wrong3];
}

function generateWholeNumbersQuestions() {
  return createQuestionSet(50, (i) => {
    const a = 120 + (i * 17) % 90;
    const b = 35 + (i * 11) % 70;
    const c = 14 + (i * 7) % 30;
    const digit = 3 + (i % 6);
    const placeNames = ["ones", "tens", "hundreds", "thousands", "ten-thousands"];
    const place = placeNames[i % placeNames.length];
    const value = [1, 10, 100, 1000, 10000][i % 5];
    const number = 3000 + i * 97;

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `What is the place value of ${digit} in ${number}?`,
          pickOptions(`${digit} ${place}`, `${digit} ones`, `${digit} hundreds`, `${digit} thousands`),
          `${digit} ${place}`,
          `The digit ${digit} is in the ${place} place, so its place value is ${digit * value}.`
        );
      case 1:
        return makeQuestion(
          `Add ${a} and ${b}.`,
          pickOptions(String(a + b), String(a + b - 7), String(a + b + 15), String(a + b + 33)),
          String(a + b),
          `${a} + ${b} = ${a + b}.`
        );
      case 2:
        return makeQuestion(
          `Subtract ${b} from ${a + c}.`,
          pickOptions(String(a + c - b), String(a + c - b - 8), String(a + c - b + 11), String(a + c - b + 20)),
          String(a + c - b),
          `${a + c} - ${b} = ${a + c - b}.`
        );
      case 3:
        return makeQuestion(
          `Multiply ${a} by ${c}.`,
          pickOptions(String(a * c), String(a * c - 7), String(a * c + 11), String(a * c + 40)),
          String(a * c),
          `${a} × ${c} = ${a * c}.`
        );
      default:
        return makeQuestion(
          `Divide ${a * c} by ${c}.`,
          pickOptions(String(a), String(a - 2), String(a + 3), String(a + 15)),
          String(a),
          `${a * c} ÷ ${c} = ${a}.`
        );
    }
  });
}

function generateFractionsQuestions() {
  return createQuestionSet(50, (i) => {
    const numerator = 2 + (i % 7);
    const denominator = 3 + ((i * 2) % 9);
    const simplified = simplifyFraction(numerator, denominator);
    const decimal = (numerator / denominator).toFixed(2);
    const addNum = 2 + (i % 6);
    const addDen = 4 + (i % 5);
    const commonDen = addDen * 2;
    const sum = (addNum / addDen) + (1 / 2);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Simplify ${numerator}/${denominator}.`,
          pickOptions(formatFraction(simplified.numerator, simplified.denominator), formatFraction(numerator + 1, denominator), formatFraction(numerator, denominator + 1), formatFraction(numerator + 2, denominator + 1)),
          formatFraction(simplified.numerator, simplified.denominator),
          `Divide both numerator and denominator by ${gcd(numerator, denominator)}.`
        );
      case 1:
        return makeQuestion(
          `Add ${addNum}/${addDen} + 1/2.`,
          pickOptions(formatFraction(Math.round((sum * commonDen)), commonDen), formatFraction(addNum + 1, addDen + 1), formatFraction(addNum, addDen + 2), formatFraction(addNum + 2, addDen)),
          formatFraction(Math.round((sum * commonDen)), commonDen),
          `1/2 = ${commonDen / 2}/${commonDen}, so the sum is ${formatFraction(Math.round((sum * commonDen)), commonDen)}.`
        );
      case 2:
        return makeQuestion(
          `Write ${decimal} as a fraction.`,
          pickOptions("3/4", "2/5", "1/2", "5/8"),
          "3/4",
          `${decimal} = 75/100 = 3/4.`
        );
      case 3:
        return makeQuestion(
          `Which fraction is equivalent to 1/2?`,
          pickOptions(`${numerator}/${numerator * 2}`, `${numerator + 1}/${numerator + 3}`, `${denominator}/${denominator + 1}`, `${numerator}/${denominator}`),
          `${numerator}/${numerator * 2}`,
          `Any fraction that simplifies to 1/2 is equivalent.`
        );
      default:
        return makeQuestion(
          `Which is greater: ${decimal} or ${((numerator / denominator) - 0.1).toFixed(2)}?`,
          pickOptions(decimal, ((numerator / denominator) - 0.1).toFixed(2), "They are equal", "Cannot compare"),
          decimal,
          `${decimal} is larger than ${((numerator / denominator) - 0.1).toFixed(2)}.`
        );
    }
  });
}

function generateRatioPercentageQuestions() {
  return createQuestionSet(50, (i) => {
    const amount = 100 + i * 25;
    const percent = 10 + (i * 7) % 45;
    const ratioA = 4 + (i % 5);
    const ratioB = 6 + ((i + 2) % 7);
    const itemCost = 150 + i * 35;
    const discount = Math.round(itemCost * (15 / 100));
    const fare = (amount * percent) / 100;

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `What is ${percent}% of ${amount}?`,
          pickOptions(String(fare), String(fare - 10), String(fare + 12), String(fare + 28)),
          String(fare),
          `${percent}% of ${amount} = ${amount} × ${percent}/100 = ${fare}.`
        );
      case 1:
        return makeQuestion(
          `Simplify the ratio ${ratioA}:${ratioB}.`,
          pickOptions(`${ratioA / 2}:${ratioB / 2}`, `${ratioA}:${ratioB}`, `${ratioA + 1}:${ratioB + 1}`, `${ratioB}:${ratioA}`),
          `${ratioA / 2}:${ratioB / 2}`,
          `Divide both numbers by 2.`
        );
      case 2:
        return makeQuestion(
          `A shirt costs ₦${itemCost} and is reduced by 15%. What is the discount?`,
          pickOptions(`₦${discount}`, `₦${Math.round(itemCost * 0.1)}`, `₦${Math.round(itemCost * 0.25)}`, `₦${Math.round(itemCost * 0.3)}`),
          `₦${discount}`,
          `15% of ₦${itemCost} is ₦${discount}.`
        );
      case 3:
        return makeQuestion(
          `If 3 notebooks cost ₦${itemCost}, what is the cost of 5 notebooks?`,
          pickOptions(`₦${(itemCost / 3) * 5}`, `₦${(itemCost / 3) * 5 - 80}`, `₦${(itemCost / 3) * 5 + 50}`, `₦${(itemCost / 3) * 5 + 100}`),
          `₦${(itemCost / 3) * 5}`,
          `One notebook costs ₦${itemCost / 3}, so 5 notebooks cost ₦${(itemCost / 3) * 5}.`
        );
      default:
        return makeQuestion(
          `Express ${percent}% as a fraction in simplest form.`,
          pickOptions(`${percent}/100`, `${percent}/10`, `1/${percent}`, `${percent}/50`),
          `${percent}/100`,
          `${percent}% = ${percent}/100 in simplest form.`
        );
    }
  });
}

function generateAlgebraQuestions() {
  return createQuestionSet(50, (i) => {
    const a = 2 + (i % 8);
    const b = 5 + (i % 9);
    const c = 3 + (i % 6);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Simplify ${a}x + ${b}x.`,
          pickOptions(`${a + b}x`, `${a * b}x`, `${a + b}x²`, `${a + b}`),
          `${a + b}x`,
          `Add the coefficients because the variables are like terms.`
        );
      case 1:
        return makeQuestion(
          `If x = ${c}, find 2x + ${b}.`,
          pickOptions(String((2 * c) + b), String((2 * c) + b - 2), String((2 * c) + b + 3), String((2 * c) + b + 7)),
          String((2 * c) + b),
          `2(${c}) + ${b} = ${(2 * c) + b}.`
        );
      case 2:
        return makeQuestion(
          `Solve x + ${b} = ${b + 9}.`,
          pickOptions(String(9), String(8), String(10), String(11)),
          String(9),
          `Subtract ${b} from both sides: x = ${b + 9} - ${b} = 9.`
        );
      case 3:
        return makeQuestion(
          `What is the next number in the pattern 2, 5, 8, 11, __?`,
          pickOptions(String(14), String(12), String(13), String(15)),
          String(14),
          `The rule is +3 each time.`
        );
      default:
        return makeQuestion(
          `Which expression means a number multiplied by 3 and then increased by ${a}?`,
          pickOptions(`3n + ${a}`, `n + ${a}`, `${a}n`, `3 + n + ${a}`),
          `3n + ${a}`,
          `Multiply the unknown by 3 and then add ${a}.`
        );
    }
  });
}

function generateGeometryQuestions() {
  return createQuestionSet(50, (i) => {
    const angle = 30 + (i * 13) % 70;
    const otherAngle = 20 + (i * 9) % 55;
    const total = 180 - angle - otherAngle;

    switch (i % 5) {
      case 0:
        return makeQuestion(
          "How many degrees are in a straight angle?",
          pickOptions("180°", "90°", "45°", "360°"),
          "180°",
          `A straight angle measures 180°.`
        );
      case 1:
        return makeQuestion(
          "The sum of the interior angles of a triangle is:",
          pickOptions("180°", "90°", "270°", "360°"),
          "180°",
          "The interior angles of any triangle add up to 180°."
        );
      case 2:
        return makeQuestion(
          `What type of angle is ${angle}°?`,
          pickOptions(angle < 90 ? "Acute" : angle < 180 ? "Obtuse" : "Reflex", "Right", "Acute", "Reflex"),
          angle < 90 ? "Acute" : angle < 180 ? "Obtuse" : "Reflex",
          `${angle}° is a ${angle < 90 ? "small" : angle < 180 ? "wide" : "reflex"} angle.`
        );
      case 3:
        return makeQuestion(
          `If one angle is ${angle}° and another is ${otherAngle}°, what is the third angle?`,
          pickOptions(`${total}°`, `${total + 5}°`, `${total - 10}°`, `${total + 20}°`),
          `${total}°`,
          `Triangle angles add up to 180°, so the third angle is 180° - ${angle}° - ${otherAngle}° = ${total}°.`
        );
      default:
        return makeQuestion(
          "Which shape has four equal sides and four right angles?",
          pickOptions("Square", "Rectangle", "Triangle", "Parallelogram"),
          "Square",
          "A square has all equal sides and every angle is 90°."
        );
    }
  });
}

function generateMensurationQuestions() {
  return createQuestionSet(50, (i) => {
    const length = 4 + (i % 9);
    const breadth = 3 + ((i * 2) % 8);
    const side = 5 + (i % 11);
    const height = 2 + ((i + 3) % 9);
    const base = 6 + (i % 12);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Find the perimeter of a rectangle ${length} cm by ${breadth} cm.`,
          pickOptions(`${2 * (length + breadth)} cm`, `${2 * length} cm`, `${length * breadth} cm`, `${(length + breadth) * 2 + 3} cm`),
          `${2 * (length + breadth)} cm`,
          `Perimeter = 2(l + b) = 2(${length} + ${breadth}) = ${2 * (length + breadth)} cm.`
        );
      case 1:
        return makeQuestion(
          `Find the area of a rectangle ${length} cm by ${breadth} cm.`,
          pickOptions(`${length * breadth} cm²`, `${length + breadth} cm²`, `${2 * (length + breadth)} cm²`, `${length * breadth + 8} cm²`),
          `${length * breadth} cm²`,
          `Area = length × breadth = ${length} × ${breadth} = ${length * breadth} cm².`
        );
      case 2:
        return makeQuestion(
          `Find the perimeter of a square of side ${side} cm.`,
          pickOptions(`${4 * side} cm`, `${3 * side} cm`, `${side * side} cm`, `${side + 4} cm`),
          `${4 * side} cm`,
          `A square has four equal sides, so perimeter = 4 × ${side} = ${4 * side} cm.`
        );
      case 3:
        return makeQuestion(
          `A triangle has base ${base} cm and height ${height} cm. Find its area.`,
          pickOptions(`${(base * height) / 2} cm²`, `${base * height} cm²`, `${base + height} cm²`, `${(base + height) / 2} cm²`),
          `${(base * height) / 2} cm²`,
          `Area of triangle = 1/2 × base × height = 1/2 × ${base} × ${height} = ${(base * height) / 2} cm².`
        );
      default:
        return makeQuestion(
          `Find the volume of a cuboid ${length} cm by ${breadth} cm by ${height} cm.`,
          pickOptions(`${length * breadth * height} cm³`, `${length + breadth + height} cm³`, `${length * breadth} cm³`, `${(length * breadth * height) / 2} cm³`),
          `${length * breadth * height} cm³`,
          `Volume = length × breadth × height = ${length} × ${breadth} × ${height} = ${length * breadth * height} cm³.`
        );
    }
  });
}

function generateSetQuestions() {
  return createQuestionSet(50, (i) => {
    const setA = [2, 4, 6, 8, 10, 12].slice(0, 2 + (i % 4));
    const setB = [3, 6, 9, 12, 15].slice(0, 2 + ((i + 1) % 4));
    const union = Array.from(new Set([...setA, ...setB])).sort((x, y) => x - y);
    const intersection = setA.filter((value) => setB.includes(value));
    const complement = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((value) => !setA.includes(value));

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `If A = {${setA.join(', ')}} and B = {${setB.join(', ')}}, what is A ∩ B?`,
          pickOptions(`{${intersection.join(', ')}}`, `{${union.join(', ')}}`, `{${setA.join(', ')}}`, `{${setB.join(', ')}}`),
          `{${intersection.join(', ')}}`,
          `The intersection contains elements common to both sets.`
        );
      case 1:
        return makeQuestion(
          `If A = {${setA.join(', ')}} and B = {${setB.join(', ')}}, what is A ∪ B?`,
          pickOptions(`{${union.join(', ')}}`, `{${intersection.join(', ')}}`, `{${setA.join(', ')}}`, `{${setB.join(', ')}}`),
          `{${union.join(', ')}}`,
          `The union includes everything in both sets.`
        );
      case 2:
        return makeQuestion(
          "Which of the following is a well-defined set?",
          pickOptions("A set of days of the week", "A set of pretty colours", "A set of tall people", "A set of nice cars"),
          "A set of days of the week",
          `A set of days of the week is defined clearly and can be listed.`
        );
      case 3:
        return makeQuestion(
          "A set with no elements is called:",
          pickOptions("Empty set", "Universal set", "Finite set", "Subset"),
          "Empty set",
          `An empty set contains no members.`
        );
      default:
        return makeQuestion(
          `If U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and A = {${setA.join(', ')}}, find A'.`,
          pickOptions(`{${complement.join(', ')}}`, `{${setA.join(', ')}}`, `{${setB.join(', ')}}`, `{1, 3, 5}`),
          `{${complement.join(', ')}}`,
          `The complement contains elements in the universal set that are not in A.`
        );
    }
  });
}

function generateStatisticsQuestions() {
  return createQuestionSet(50, (i) => {
    const values = [4, 6, 8, 10, 12].map((value) => value + (i % 5));
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const median = [...values].sort((a, b) => a - b)[2];
    const mode = 3 + (i % 5);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Find the mean of ${values.join(', ')}.`,
          pickOptions(String(mean), String(mean - 1), String(mean + 1), String(mean + 3)),
          String(mean),
          `Add the numbers and divide by ${values.length}.`
        );
      case 1:
        return makeQuestion(
          `Find the median of ${values.join(', ')}.`,
          pickOptions(String(median), String(median - 2), String(median + 2), String(median + 5)),
          String(median),
          `Arrange the numbers in order and take the middle value.`
        );
      case 2:
        return makeQuestion(
          `The mode of 1, ${mode}, 4, ${mode}, 6, ${mode}, 8 is:`,
          pickOptions(String(mode), "1", "4", "8"),
          String(mode),
          `${mode} occurs more times than any other value.`
        );
      case 3:
        return makeQuestion(
          "A fair coin is tossed once. What is the probability of getting a tail?",
          pickOptions("1/2", "1/4", "1/3", "3/4"),
          "1/2",
          `A coin has 2 equally likely outcomes, so the probability of tail is 1/2.`
        );
      default:
        return makeQuestion(
          "A fair die is thrown once. What is the probability of getting an even number?",
          pickOptions("1/2", "1/3", "1/6", "2/3"),
          "1/2",
          `Even numbers are 2, 4 and 6, which is 3 of 6 outcomes.`
        );
    }
  });
}

function generateNumberBaseQuestions() {
  return createQuestionSet(50, (i) => {
    const value = 4 + (i * 3) % 21;
    const power = 2 + (i % 4);
    const binary = (i % 8).toString(2);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Evaluate ${value}².`,
          pickOptions(String(value * value), String(value * value - 10), String(value * value + 15), String(value * value + 30)),
          String(value * value),
          `${value}² = ${value} × ${value} = ${value * value}.`
        );
      case 1:
        return makeQuestion(
          `Simplify ${2 ** power} × ${2 ** (power - 1)}.`,
          pickOptions(String(2 ** (2 * power - 1)), String(2 ** (2 * power)), String(2 ** (power - 1)), String(2 ** (power + 3))),
          String(2 ** (2 * power - 1)),
          `When multiplying powers with the same base, add the indices.`
        );
      case 2:
        return makeQuestion(
          `Convert ${binary}₂ to base ten.`,
          pickOptions(String(parseInt(binary, 2)), String(parseInt(binary, 2) - 1), String(parseInt(binary, 2) + 2), String(parseInt(binary, 2) + 5)),
          String(parseInt(binary, 2)),
          `${binary} in base 2 is ${parseInt(binary, 2)} in base 10.`
        );
      case 3:
        return makeQuestion(
          "What is the value of 10³?",
          pickOptions("1000", "100", "10000", "100000"),
          "1000",
          `10³ = 10 × 10 × 10 = 1000.`
        );
      default:
        return makeQuestion(
          `Simplify 5⁶ ÷ 5².`,
          pickOptions("5⁴", "5³", "5⁸", "5¹²"),
          "5⁴",
          `When dividing powers with the same base, subtract the indices.`
        );
    }
  });
}

function generateFactorisationQuestions() {
  return createQuestionSet(50, (i) => {
    const a = 2 + (i % 7);
    const b = 4 + (i % 9);
    const c = 3 + (i % 5);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Simplify ${a}x + ${b}x.`,
          pickOptions(`${a + b}x`, `${a * b}x`, `${a + b}x²`, `${a + b}`),
          `${a + b}x`,
          `Add the coefficients because they are like terms.`
        );
      case 1:
        return makeQuestion(
          `Factorise ${a}x + ${a * b}.`,
          pickOptions(`${a}(x + ${b})`, `${b}(x + ${a})`, `${a + b}(x)`, `${a}x + ${b}`),
          `${a}(x + ${b})`,
          `The common factor is ${a}.`
        );
      case 2:
        return makeQuestion(
          `Expand ${a}(x + ${b}).`,
          pickOptions(`${a}x + ${a * b}`, `${a}x + ${b}`, `${a + b}x`, `${a}x² + ${b}`),
          `${a}x + ${a * b}`,
          `Multiply every term inside the bracket by ${a}.`
        );
      case 3:
        return makeQuestion(
          `If x = ${c}, find x² + ${a}x.`,
          pickOptions(String((c * c) + (a * c)), String((c * c) + (a * c) - 2), String((c * c) + (a * c) + 7), String((c * c) + (a * c) + 12)),
          String((c * c) + (a * c)),
          `${c}² + ${a}(${c}) = ${c * c} + ${a * c}.`
        );
      default:
        return makeQuestion(
          `Which of the following is a like term to ${b}y?`,
          pickOptions(`${b + 2}y`, `${b + 2}y²`, `${b}x`, `${b + 3}`),
          `${b + 2}y`,
          `Like terms must have the same variable part.`
        );
    }
  });
}

function generateEquationQuestions() {
  return createQuestionSet(50, (i) => {
    const a = 3 + (i % 9);
    const b = 5 + (i % 7);
    const c = 2 + (i % 6);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Solve x + ${b} = ${b + 8}.`,
          pickOptions("8", "7", "9", "10"),
          "8",
          `Subtract ${b} from both sides.`
        );
      case 1:
        return makeQuestion(
          `Solve ${a}x = ${a * 6}.`,
          pickOptions("6", "4", "5", "7"),
          "6",
          `Divide both sides by ${a}.`
        );
      case 2:
        return makeQuestion(
          `Solve 2x - ${b} = ${b + 4}.`,
          pickOptions(String((b + 4 + b) / 2), String((b + 4 + b) / 2 - 1), String((b + 4 + b) / 2 + 2), String((b + 4 + b) / 2 + 5)),
          String((b + 4 + b) / 2),
          `Add ${b} to both sides, then divide by 2.`
        );
      case 3:
        return makeQuestion(
          "Which inequality is true?",
          pickOptions(`${a + 2} < ${a + 5}`, `${a + 5} < ${a + 2}`, `${a} > ${a + 1}`, `${a + 3} = ${a + 5}`),
          `${a + 2} < ${a + 5}`,
          `${a + 2} is always less than ${a + 5}.`
        );
      default:
        return makeQuestion(
          `Solve x/3 = ${c + 4}.`,
          pickOptions(String((c + 4) * 3), String((c + 4) * 3 - 2), String((c + 4) * 3 + 3), String((c + 4) * 3 + 5)),
          String((c + 4) * 3),
          `Multiply both sides by 3.`
        );
    }
  });
}

function generateCoordinateQuestions() {
  return createQuestionSet(50, (i) => {
    const x = 2 + (i % 7);
    const y = 3 + ((i * 2) % 8);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          "What is the point at the origin?",
          pickOptions("(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"),
          "(0, 0)",
          `The origin is where the x-axis and y-axis meet.`
        );
      case 1:
        return makeQuestion(
          `If a point is (${x}, ${y}), what is the x-coordinate?`,
          pickOptions(String(x), String(y), "0", "1"),
          String(x),
          `The first number in an ordered pair is the x-coordinate.`
        );
      case 2:
        return makeQuestion(
          `Which direction do you move first to plot (${x}, ${y})?`,
          pickOptions(`Right ${x}, then up ${y}`, `Up ${y}, then right ${x}`, `Left ${x}, then up ${y}`, `Down ${y}, then right ${x}`),
          `Right ${x}, then up ${y}`,
          `The first coordinate is x and the second is y.`
        );
      case 3:
        return makeQuestion(
          "Which axis is horizontal?",
          pickOptions("x-axis", "y-axis", "Diagonal line", "Vertical line"),
          "x-axis",
          `The x-axis runs from left to right.`
        );
      default:
        return makeQuestion(
          `What is the coordinate of a point ${x} units right of the origin and ${y} units up?`,
          pickOptions(`(${x}, ${y})`, `(${y}, ${x})`, `(0, ${x + y})`, `(${x + y}, 0)`),
          `(${x}, ${y})`,
          `Right is x and up is y.`
        );
    }
  });
}

function generatePolygonQuestions() {
  return createQuestionSet(50, (i) => {
    const angleA = 30 + (i % 8) * 10;
    const angleB = 40 + ((i + 2) % 9) * 10;
    const angleC = 180 - angleA - angleB;

    switch (i % 5) {
      case 0:
        return makeQuestion(
          "What is the sum of angles in a quadrilateral?",
          pickOptions("360°", "180°", "270°", "450°"),
          "360°",
          `The interior angles of a quadrilateral add up to 360°.`
        );
      case 1:
        return makeQuestion(
          `If one angle is ${angleA}° and another is ${angleB}°, what is the third angle in a triangle?`,
          pickOptions(`${angleC}°`, `${angleC + 10}°`, `${angleC - 10}°`, `${angleC + 20}°`),
          `${angleC}°`,
          `Triangle angles add up to 180°.`
        );
      case 2:
        return makeQuestion(
          "What is the name of a triangle with all sides equal?",
          pickOptions("Equilateral", "Scalene", "Isosceles", "Right-angled"),
          "Equilateral",
          `An equilateral triangle has all sides and angles equal.`
        );
      case 3:
        return makeQuestion(
          "Two angles that add up to 180° are called:",
          pickOptions("Supplementary", "Complementary", "Adjacent", "Vertical"),
          "Supplementary",
          `Supplementary angles add up to 180°.`
        );
      default:
        return makeQuestion(
          `Which polygon has ${3 + (i % 5)} sides?`,
          pickOptions(["Triangle", "Quadrilateral", "Pentagon", "Hexagon"][i % 4], "Triangle", "Quadrilateral", "Pentagon"),
          ["Triangle", "Quadrilateral", "Pentagon", "Hexagon"][i % 4],
          `A polygon with ${3 + (i % 5)} sides is called a ${["Triangle", "Quadrilateral", "Pentagon", "Hexagon"][i % 4]}.`
        );
    }
  });
}

function generateVolumeQuestions() {
  return createQuestionSet(50, (i) => {
    const length = 3 + (i % 7);
    const width = 2 + ((i + 2) % 6);
    const height = 4 + ((i + 1) % 5);
    const base = 5 + (i % 10);
    const triangleHeight = 2 + (i % 8);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Find the volume of a cuboid ${length} cm by ${width} cm by ${height} cm.`,
          pickOptions(`${length * width * height} cm³`, `${length + width + height} cm³`, `${length * width} cm³`, `${(length * width * height) / 2} cm³`),
          `${length * width * height} cm³`,
          `Volume = length × width × height.`
        );
      case 1:
        return makeQuestion(
          `What is the perimeter of a rectangle ${length} cm by ${width} cm?`,
          pickOptions(`${2 * (length + width)} cm`, `${length * width} cm`, `${length + width} cm`, `${length * 2} cm`),
          `${2 * (length + width)} cm`,
          `Perimeter = 2(l + b).`
        );
      case 2:
        return makeQuestion(
          `Area of a triangle with base ${base} cm and height ${triangleHeight} cm is:`,
          pickOptions(`${(base * triangleHeight) / 2} cm²`, `${base * triangleHeight} cm²`, `${base + triangleHeight} cm²`, `${base * triangleHeight * 2} cm²`),
          `${(base * triangleHeight) / 2} cm²`,
          `Area = 1/2 × base × height.`
        );
      case 3:
        return makeQuestion(
          `Find the area of a square of side ${length + 2} cm.`,
          pickOptions(`${(length + 2) ** 2} cm²`, `${2 * (length + 2)} cm²`, `${(length + 2) * 3} cm²`, `${(length + 2) + 5} cm²`),
          `${(length + 2) ** 2} cm²`,
          `Area = side × side.`
        );
      default:
        return makeQuestion(
          `How many cm³ are in a cube of side ${length} cm?`,
          pickOptions(`${length ** 3} cm³`, `${length * 3} cm³`, `${length ** 2} cm³`, `${length * height} cm³`),
          `${length ** 3} cm³`,
          `Volume of a cube = side³.`
        );
    }
  });
}

function generateRatioProportionQuestions() {
  return createQuestionSet(50, (i) => {
    const amount = 100 + i * 40;
    const percent = 5 + (i % 35);
    const first = 2 + (i % 5);
    const second = 4 + ((i + 2) % 9);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Find ${percent}% of ₦${amount}.`,
          pickOptions(`₦${(amount * percent) / 100}`, `₦${(amount * percent) / 100 - 20}`, `₦${(amount * percent) / 100 + 15}`, `₦${(amount * percent) / 100 + 35}`),
          `₦${(amount * percent) / 100}`,
          `${percent}% means ${percent}/100 of the amount.`
        );
      case 1:
        return makeQuestion(
          `If 4 pencils cost ₦${amount}, what is the cost of 7 pencils?`,
          pickOptions(`₦${(amount / 4) * 7}`, `₦${(amount / 4) * 7 - 30}`, `₦${(amount / 4) * 7 + 50}`, `₦${(amount / 4) * 7 + 80}`),
          `₦${(amount / 4) * 7}`,
          `Find the cost of one pencil first.`
        );
      case 2:
        return makeQuestion(
          `A number is increased by 25%. If it was ${amount}, what is the new value?`,
          pickOptions(String(amount + amount * 0.25), String(amount + amount * 0.25 - 10), String(amount + amount * 0.25 + 15), String(amount + amount * 0.25 + 25)),
          String(amount + amount * 0.25),
          `25% of ${amount} is ${amount * 0.25}.`
        );
      case 3:
        return makeQuestion(
          `Simplify the ratio ${first * 5}:${second * 5}.`,
          pickOptions(`${first}:${second}`, `${second}:${first}`, `${first + 1}:${second}`, `${first}:${second + 1}`),
          `${first}:${second}`,
          `Divide both numbers by 5.`
        );
      default:
        return makeQuestion(
          `What fraction is ${percent}%?`,
          pickOptions(`${percent}/100`, `${percent}/10`, `${percent}/50`, `${percent}/5`),
          `${percent}/100`,
          `Percent means out of 100.`
        );
    }
  });
}

function generateProbabilityStatisticsQuestions() {
  return createQuestionSet(50, (i) => {
    const numbers = [2, 5, 7, 8, 11].map((value) => value + (i % 3));
    const meanValue = numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
    const medianValue = [...numbers].sort((a, b) => a - b)[2];
    const red = 2 + (i % 5);
    const blue = 3 + ((i + 1) % 6);

    switch (i % 5) {
      case 0:
        return makeQuestion(
          `Find the mean of ${numbers.join(', ')}.`,
          pickOptions(String(meanValue), String(meanValue + 1), String(meanValue + 2), String(meanValue + 4)),
          String(meanValue),
          `Add the values and divide by the number of values.`
        );
      case 1:
        return makeQuestion(
          `What is the median of ${numbers.join(', ')}?`,
          pickOptions(String(medianValue), String(medianValue - 1), String(medianValue + 1), String(medianValue + 3)),
          String(medianValue),
          `Arrange the values in order and take the middle value.`
        );
      case 2:
        return makeQuestion(
          `A bag contains ${red} red balls and ${blue} blue balls. What is the probability of picking a blue ball?`,
          pickOptions(`${blue}/${red + blue}`, `${red}/${red + blue}`, "1/2", `${(red + blue)}/${red}`),
          `${blue}/${red + blue}`,
          `There are ${red + blue} balls in total and ${blue} are blue.`
        );
      case 3:
        return makeQuestion(
          "The mode of 1, 3, 3, 5, 7, 3, 9 is:",
          pickOptions("3", "1", "5", "9"),
          "3",
          `3 occurs more often than any other number.`
        );
      default:
        return makeQuestion(
          "A fair die is tossed once. What is the probability of getting an odd number?",
          pickOptions("1/2", "1/3", "2/3", "5/6"),
          "1/2",
          `Odd numbers are 1, 3 and 5, which are 3 out of 6 outcomes.`
        );
    }
  });
}

const syllabusData = {
  jss1: {
    title: "JSS1 Mathematics",
    topics: [
      {
        name: "Whole Numbers and Place Value",
        summary: "Understand numbers, digits, place value, and how to add, subtract, multiply, and divide accurately.",
        keyPoints: [
          "A digit has a value according to its place in a number.",
          "The value of 7 in 7,432 is 7,000 because it is in the thousands place.",
          "Use place value to read, compare, and solve real-life number problems.",
          "Carry and borrow carefully when adding and subtracting large numbers."
        ],
        questions: generateWholeNumbersQuestions()
      },
      {
        name: "Fractions and Decimals",
        summary: "Develop skills in simplifying fractions, equivalent fractions, decimal places, and converting between fractions and decimals.",
        keyPoints: [
          "A fraction shows part of a whole.",
          "Equivalent fractions have the same value but different numerators and denominators.",
          "Decimals are based on tenths, hundredths, and thousandths.",
          "To convert a fraction to a decimal, divide the numerator by the denominator."
        ],
        questions: generateFractionsQuestions()
      },
      {
        name: "Ratio, Percentage and Everyday Arithmetic",
        summary: "Use ratio and percentage in shopping, profit-and-loss, taxes, and comparing quantities.",
        keyPoints: [
          "A ratio compares two quantities in the same unit.",
          "Percent means out of 100.",
          "20% of 250 = 50 because 20/100 × 250 = 50.",
          "Ratio and percentage are useful in discounts and profit calculations."
        ],
        questions: generateRatioPercentageQuestions()
      },
      {
        name: "Basic Algebra and Number Patterns",
        summary: "Learn to use letters to represent numbers, form expressions, and identify patterns in sequences.",
        keyPoints: [
          "Variables like x and y stand for unknown numbers.",
          "An algebraic expression combines numbers and symbols.",
          "Number patterns follow rules such as +3, ×2, or -5.",
          "Solve simple equations by doing the inverse operation."
        ],
        questions: generateAlgebraQuestions()
      },
      {
        name: "Geometry and Angles",
        summary: "Study shapes, line types, angle properties, and the basics of plane geometry.",
        keyPoints: [
          "A straight angle measures 180°.",
          "A right angle measures 90°.",
          "The sum of angles in a triangle is 180°.",
          "Perpendicular lines meet at 90° and parallel lines never intersect."
        ],
        questions: generateGeometryQuestions()
      },
      {
        name: "Mensuration: Perimeter and Area",
        summary: "Measure lengths around shapes and the spaces inside them using standard formulas.",
        keyPoints: [
          "Perimeter is the total distance around a shape.",
          "Area is the space covered by a 2D shape.",
          "Area of rectangle = length × breadth.",
          "Perimeter of a square = 4 × side."
        ],
        questions: generateMensurationQuestions()
      },
      {
        name: "Sets and Venn Diagrams",
        summary: "Represent collections of objects, define sets, and sort elements using Venn diagrams.",
        keyPoints: [
          "A set is a well-defined collection of objects.",
          "Members inside a set are called elements.",
          "Venn diagrams help show relationships between sets.",
          "The union contains all elements from both sets, while intersection contains common elements."
        ],
        questions: generateSetQuestions()
      },
      {
        name: "Statistics and Probability Basics",
        summary: "Collect and interpret data using mean, median, mode, and simple probability.",
        keyPoints: [
          "The mean is the average of numbers.",
          "The mode is the value that appears most often.",
          "Probability tells us how likely an event is to happen.",
          "Probability of an event = number of favourable outcomes ÷ total outcomes."
        ],
        questions: generateStatisticsQuestions()
      }
    ]
  },
  jss2: {
    title: "JSS2 Mathematics",
    topics: [
      {
        name: "Number Bases and Indices",
        summary: "Explore base 2, base 10, calculations with powers, and index laws for multiplication and division.",
        keyPoints: [
          "The base tells the value of each place in a number system.",
          "Base 10 uses digits 0 to 9.",
          "Indices show repeated multiplication, for example 3² = 3 × 3 = 9.",
          "Laws of indices include a^m × a^n = a^(m+n)."
        ],
        questions: generateNumberBaseQuestions()
      },
      {
        name: "Algebraic Expressions and Factorisation",
        summary: "Work with variables, simplify expressions, and factor common terms correctly.",
        keyPoints: [
          "Like terms can be combined by adding or subtracting their coefficients.",
          "Examples of algebraic expressions: 3x + 5, x² - 2x + 1.",
          "Factorisation turns an expression into a product of factors.",
          "Common factorisation examples: 3x + 6 = 3(x + 2)."
        ],
        questions: generateFactorisationQuestions()
      },
      {
        name: "Linear Equations and Inequalities",
        summary: "Solve one-step and multi-step equations and understand inequality symbols.",
        keyPoints: [
          "Use inverse operations to solve equations.",
          "< means less than, > means greater than, and ≤ and ≥ include equality.",
          "The solution of an equation is the value that makes the statement true.",
          "Always do the same operation to both sides of the equation."
        ],
        questions: generateEquationQuestions()
      },
      {
        name: "Coordinates and Graphs",
        summary: "Plot points on the Cartesian plane and relate them to simple linear graphs.",
        keyPoints: [
          "The horizontal axis is x and the vertical axis is y.",
          "A point is written as (x, y).",
          "The origin is (0, 0).",
          "A straight line graph shows a linear relationship between x and y."
        ],
        questions: generateCoordinateQuestions()
      },
      {
        name: "Angles, Polygons and Triangles",
        summary: "Study angle facts for parallel lines and the properties of polygons and triangles.",
        keyPoints: [
          "The sum of angles on a straight line is 180°.",
          "Angles in a triangle total 180°.",
          "A quadrilateral has interior angles totalling 360°.",
          "Regular polygons have equal sides and equal angles."
        ],
        questions: generatePolygonQuestions()
      },
      {
        name: "Mensuration: Area, Perimeter and Volume",
        summary: "Use formulas to calculate surface measurements and the capacity of 3D shapes.",
        keyPoints: [
          "Volume measures the amount of space inside a 3D object.",
          "Volume of a cuboid = length × width × height.",
          "Perimeter is around a 2D shape, while area is its surface inside.",
          "Use units such as cm² and cm³ correctly."
        ],
        questions: generateVolumeQuestions()
      },
      {
        name: "Ratio, Proportion and Percentages",
        summary: "Solve proportional relationships and use percentages in profit, loss, discount, and tax situations.",
        keyPoints: [
          "A proportion shows that two ratios are equal.",
          "Percentages can be converted to fractions or decimals.",
          "If 2 pens cost ₦200, then 5 pens cost ₦500.",
          "Use proportional reasoning in many everyday and business calculations."
        ],
        questions: generateRatioProportionQuestions()
      },
      {
        name: "Statistics and Probability",
        summary: "Represent data in tables and charts and solve probability questions from real life.",
        keyPoints: [
          "Mean = sum of numbers divided by the number of values.",
          "The median is the middle value in an ordered set.",
          "Probability is based on equally likely outcomes.",
          "Graphs and charts help interpret information quickly."
        ],
        questions: generateProbabilityStatisticsQuestions()
      },
      {
        name: "Sets and Venn Diagrams",
        summary: "Use set notation to describe groups and solve simple problems with union and intersection.",
        keyPoints: [
          "The union contains all elements in either set.",
          "The intersection contains common elements only.",
          "The complement contains elements not in the set.",
          "Venn diagrams make set relationships easy to see."
        ],
        questions: generateSetQuestions()
      }
    ]
  }
};

const state = {
  grade: "jss1",
  selectedTopic: "Whole Numbers and Place Value"
};

const statsContainer = document.getElementById("statsContainer");
const topicsContainer = document.getElementById("topicsContainer");
const topicDetails = document.getElementById("topicDetails");
const classButtons = document.querySelectorAll(".class-btn");

function getGradeData() {
  return syllabusData[state.grade];
}

function totalQuestionsForGrade(grade) {
  return syllabusData[grade].topics.reduce((total, topic) => total + topic.questions.length, 0);
}

function renderStats() {
  const gradeData = getGradeData();
  const totalTopics = gradeData.topics.length;
  const totalQuestions = totalQuestionsForGrade(state.grade);

  statsContainer.innerHTML = `
    <div class="stat-card">
      <span class="label">Class</span>
      <span class="value">${state.grade.toUpperCase()}</span>
    </div>
    <div class="stat-card">
      <span class="label">Topics</span>
      <span class="value">${totalTopics}</span>
    </div>
    <div class="stat-card">
      <span class="label">Questions</span>
      <span class="value">${totalQuestions}</span>
    </div>
    <div class="stat-card">
      <span class="label">Syllabus</span>
      <span class="value">100%</span>
    </div>
  `;
}

function setActiveTopic(topicName) {
  state.selectedTopic = topicName;
  renderTopicList();
  renderTopicDetails();
}

function renderTopicList() {
  const gradeData = getGradeData();
  topicsContainer.innerHTML = gradeData.topics
    .map((topic) => {
      const activeClass = topic.name === state.selectedTopic ? "active" : "";
      return `
        <button class="topic-btn ${activeClass}" data-topic="${topic.name}">
          <span class="topic-title">${topic.name}</span>
          <span class="topic-meta">${topic.questions.length} practice questions</span>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".topic-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTopic(button.dataset.topic);
    });
  });
}

function renderTopicDetails() {
  const gradeData = getGradeData();
  const topic = gradeData.topics.find((entry) => entry.name === state.selectedTopic) || gradeData.topics[0];

  const questionMarkup = topic.questions
    .map((item, index) => {
      const optionsMarkup = item.options
        .map((option) => `<li class="option-item">${option}</li>`)
        .join("");

      return `
        <article class="question-card">
          <h4>${index + 1}. ${item.q}</h4>
          <ul class="options">${optionsMarkup}</ul>
          <button class="answer-toggle" type="button">Reveal Answer</button>
          <div class="answer-box">
            <strong>Answer:</strong> ${item.answer}<br>
            <strong>Explanation:</strong> ${item.explanation}
          </div>
        </article>
      `;
    })
    .join("");

  topicDetails.innerHTML = `
    <div class="topic-header">
      <h2>${topic.name}</h2>
      <p>${topic.summary}</p>
    </div>

    <div class="topic-layout">
      <aside class="card">
        <h3>Key Learning Points</h3>
        <ul class="key-points">
          ${topic.keyPoints.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </aside>

      <div class="question-block">
        <div class="card">
          <h3>Practice Questions & Answers</h3>
          ${questionMarkup}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const answerBox = button.nextElementSibling;
      answerBox.classList.toggle("visible");
      button.textContent = answerBox.classList.contains("visible") ? "Hide Answer" : "Reveal Answer";
    });
  });
}

function setGrade(grade) {
  state.grade = grade;
  const gradeData = getGradeData();
  state.selectedTopic = gradeData.topics[0].name;
  classButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.grade === grade);
  });
  renderStats();
  renderTopicList();
  renderTopicDetails();
}

classButtons.forEach((button) => {
  button.addEventListener("click", () => setGrade(button.dataset.grade));
});

renderStats();
renderTopicList();
renderTopicDetails();

