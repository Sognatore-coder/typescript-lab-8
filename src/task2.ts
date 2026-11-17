// Задача 2. Кортежи и enum

export type RGBColor = [number, number, number];

export enum ColorName {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
  Black = "black",
}

const COLOR_TABLE: Record<ColorName, RGBColor> = {
  [ColorName.Red]: [255, 0, 0],
  [ColorName.Green]: [0, 128, 0],
  [ColorName.Blue]: [0, 0, 255],
  [ColorName.Yellow]: [255, 255, 0],
  [ColorName.Black]: [0, 0, 0],
};

function channelToHex(channel: number): string {
  if (!Number.isInteger(channel) || channel < 0 || channel > 255) {
    throw new RangeError(
      `Канал RGB должен быть целым числом от 0 до 255, получено: ${channel}`,
    );
  }
  return channel.toString(16).padStart(2, "0");
}

export function rgbToHex(color: RGBColor): string {
  const [red, green, blue] = color;
  return `#${channelToHex(red)}${channelToHex(green)}${channelToHex(blue)}`;
}

export function getColorInfo(name: ColorName): { rgb: RGBColor; hex: string } {
  const rgb: RGBColor = [...COLOR_TABLE[name]];
  return { rgb, hex: rgbToHex(rgb) };
}

for (const name of Object.values(ColorName)) {
  const { rgb, hex } = getColorInfo(name);
  console.log(`${name}: rgb(${rgb.join(", ")}) -> ${hex}`);
}

console.log("Ведущие нули:", rgbToHex([1, 2, 3]));

const invalidColors: RGBColor[] = [
  [256, 0, 0],
  [0, -1, 0],
  [10.5, 0, 0],
  [0, 0, Number.NaN],
];
for (const invalid of invalidColors) {
  try {
    rgbToHex(invalid);
  } catch (error) {
    if (error instanceof RangeError) {
      console.log(`RangeError для [${invalid.join(", ")}]: ${error.message}`);
    } else {
      throw error;
    }
  }
}
