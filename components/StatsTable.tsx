import { calculateStatModifier } from "@/lib/calculateStatModifier";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Props {
  stats: Record<string, number>;
  savingThrowProficiencies?: string[];
  proficiencyBonus?: number;
}

function transformObject<T>(obj: Record<string, T>): [string[], T[]] {
  const predefinedOrder = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  // Separate keys into predefined and others
  const allKeys = Object.keys(obj);
  const predefinedKeys = predefinedOrder.filter((key) => allKeys.includes(key));
  const otherKeys = allKeys.filter((key) => !predefinedOrder.includes(key)).sort(); // ABC order for remaining keys

  // Combine keys in correct order
  const orderedKeys = [...predefinedKeys, ...otherKeys];
  const values = orderedKeys.map((key) => obj[key]);

  return [orderedKeys, values];
}

export default function StatsTable({
  stats,
  savingThrowProficiencies = [],
  proficiencyBonus = 0,
}: Props) {
  const [keys, values] = transformObject(stats);

  console.log(savingThrowProficiencies);

  return (
    <div className="rounded-md border w-full overflow-x-auto mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center"></TableHead>
            {keys.map((key, index) => (
              <TableHead className="text-center capitalize" key={index}>
                {key}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="h-12 text-center">Value</TableCell>
            {values.map((value, index) => (
              <TableCell key={index} className="h-12 text-center">
                {value}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="h-12 text-center">Modifier</TableCell>
            {values.map((value, index) => (
              <TableCell key={index} className="h-12 text-center">
                {calculateStatModifier(value)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="h-12 text-center">Saving Throw</TableCell>
            {values.map((value, index) => {
              calculateStatModifier(value);
              return (
                <TableCell key={index} className="h-12 text-center">
                  {savingThrowProficiencies.some((st) =>
                    keys[index].toLocaleUpperCase().includes(st)
                  )
                    ? calculateStatModifier(value, proficiencyBonus)
                    : calculateStatModifier(value)}
                  {/* {calculateStatModifier(
                  keys[index] in savingThrowProficiencies ? value + proficiencyBonus : value
                )} */}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
