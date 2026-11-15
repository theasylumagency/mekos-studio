import type { Locale } from "./site";

type Localized = Record<Locale, string>;
export type CatalogChoice = { name: Localized; image: string };
export type ColorChoice = CatalogChoice & { hex: string };
export type Model = { id: string; name: Localized; variants: ColorChoice[] };

function color(ka: string, en: string, hex: string) {
  return { name: { ka, en }, hex };
}

const colors = {
  pearl: color("თეთრი მარგალიტი", "Pearl white", "#f5f0e4"),
  fuchsia: color("ფუქსია", "Fuchsia", "#e34398"),
  peach: color("რბილი ატმისფერი", "Soft peach", "#efddcf"),
  rose: color("ცქრიალა ვარდისფერი", "Bright pink", "#f4b3c1"),
  red: color("მარჯნისფერი წითელი", "Coral red", "#f33f3e"),
  orange: color("ესპანური ნარინჯისფერი", "Spanish orange", "#e86902"),
  purple: color("სამეფო იისფერი", "Royal purple", "#5c3d8b"),
  ivory: color("თბილი სპილოსძვლისფერი", "Warm ivory", "#e6d8c5"),
  black: color("ნახშირისფერი შავი", "Charcoal black", "#2a2a2a"),
  yellow: color("მკვეთრი ყვითელი", "Bright yellow", "#fde910"),
  green: color("ტყის მწვანე", "Forest green", "#3e6140"),
  sky: color("ცისფერი", "Sky blue", "#a9cddd"),
};

type ColorKey = keyof typeof colors;

function model(id: string, ka: string, en: string, variants: [number | string, ColorKey][]): Model {
  return {
    id,
    name: { ka, en },
    variants: variants.map(([file, key]) => ({
      ...colors[key],
      image: `/studio/models/${typeof file === "number" ? `${id}_${file}` : file}.webp`,
    })),
  };
}

export const models = [
  model("m41", "რბილი სხივი", "Soft Light", [[11, "pearl"], [4, "fuchsia"], [5, "peach"]]),
  model("m43", "მშვიდი დინამიკა", "Quiet Motion", [[6, "rose"], [1, "red"], [2, "orange"], [3, "purple"]]),
  model("m44", "ახალი დილა", "New Morning", [[11, "pearl"], [2, "orange"], [8, "ivory"]]),
  model("m3", "ცეცხლის მაგია", "Fire Magic", [[1, "red"], [3, "purple"], [6, "orange"], [9, "black"]]),
  model("m5", "თეთრი ჩრდილი", "White Shadow", [[11, "pearl"], [1, "red"], [2, "orange"], [3, "purple"], [8, "ivory"]]),
  model("m6", "სხვა სამოთხე", "Another Paradise", [[1, "red"], [2, "orange"], [3, "purple"], [5, "peach"]]),
  model("m7", "სიცოცხლის რიტმი", "Rhythm of Life", [[10, "yellow"], [2, "orange"], [7, "green"], [11, "pearl"], [9, "black"]]),
  model("m50", "ნაზი ძალა", "Gentle Strength", [[11, "pearl"], [2, "orange"], [6, "rose"], [7, "green"], [9, "black"]]),
  model("m48", "შინაგანი აყვავება", "Inner Bloom", [[6, "rose"], [1, "red"], [10, "yellow"], [7, "green"], [11, "pearl"]]),
  model("m11", "დალილა", "Delilah", [[2, "orange"], [3, "purple"], [7, "green"]]),
  model("m49", "ქრომის დინება", "Chrome Flow", [[6, "rose"], [1, "red"], [9, "black"]]),
  model("m23", "ცივი ჩარჩო", "Cold Frame", [[1, "red"], [2, "orange"], [7, "green"], [11, "pearl"], [9, "black"]]),
  model("m25", "ნეონის სული", "Neon Spirit", [[2, "orange"], [3, "purple"], [11, "pearl"]]),
  model("m26", "სუფთა სილუეტი", "Clean Silhouette", [[1, "red"], [3, "purple"], [6, "rose"], [11, "pearl"], [9, "black"]]),
  model("m29", "ღრმა ტონი", "Deep Tone", [[2, "orange"], [3, "purple"], [4, "fuchsia"], [6, "rose"], [8, "ivory"]]),
  model("m30", "ველური ხაზი", "Wild Line", [[2, "orange"], [7, "green"]]),
  model("m45", "ფოთლებს მიღმა", "Beyond the Leaves", [[1, "red"], ["m47_11", "pearl"], [6, "rose"], [2, "orange"]]),
  model("m42", "მკვეთრი გრძნობა", "Sharp Feeling", [[5, "rose"], [1, "red"], [11, "pearl"]]),
];

function reference(file: string, ka: string, en: string): CatalogChoice {
  return { name: { ka, en }, image: `/studio/refs/${file}.webp` };
}

export const references = [
  reference("tulip_n", "ტიტა", "Tulip"),
  reference("vardi", "ვარდი", "Rose"),
  reference("anemone", "ანემონე", "Anemone"),
  reference("orqidea", "ორქიდეა", "Orchid"),
  reference("antorium", "ანთურიუმი", "Anthurium"),
  reference("magnolia", "მაგნოლია", "Magnolia"),
  reference("pion", "პიონი", "Peony"),
  reference("chiti", "სამოთხის ჩიტი", "Bird of Paradise"),
  reference("hydrangea", "ჰორტენზია", "Hydrangea"),
  reference("lyly", "ლილია", "Lily"),
  reference("kala", "კალა", "Calla Lily"),
  reference("gerbera", "გერბერა", "Gerbera"),
  reference("poppy", "ყაყაჩო", "Poppy"),
  reference("chamomile", "გვირილა", "Chamomile"),
];

function roll(file: string, key: ColorKey): ColorChoice {
  return { ...colors[key], image: `/studio/rolls/${file}.webp` };
}

export const rollColors = [
  roll("roll1", "peach"), roll("roll2", "ivory"), roll("roll3", "rose"),
  roll("roll4", "pearl"), roll("roll5", "green"), roll("roll6", "red"),
  roll("roll1_1", "black"), roll("roll1_2", "fuchsia"), roll("roll1_3", "sky"),
  roll("roll1_4", "yellow"), roll("roll1_5", "purple"), roll("roll1_6", "orange"),
];
