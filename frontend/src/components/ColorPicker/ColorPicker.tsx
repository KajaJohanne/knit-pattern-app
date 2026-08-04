import "./ColorPicker.css";

type ColorPickerProps = {
  selectedColor: string;
  onSelectColor: (color: string) => void;
};

export function ColorPicker({
  selectedColor,
  onSelectColor,
}: ColorPickerProps) {
  const colors = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
    "#ff6bff",
    "#ff9f43",
    "#00d2d3",
    "#f368e0",
    "#54a0ff",
    "#5f27cd",
    "#ff4757",
    "#2ed573",
    "#1e90ff",
    "#ff6348",
    "#a29bfe",
    "#ffffff",
    "#2d3436",
    "#fd79a8",
    "#00b894",
    "#0984e3",
  ];

  return (
    <div>
      <h1>Her skal man kunne velge farge</h1>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-item ${selectedColor === color ? "active" : ""}`}
          style={{ background: color }}
          onClick={() => onSelectColor(color)}
          title={color}
        />
      ))}
    </div>
  );
}
