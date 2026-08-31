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
    <div className="bg-background-blue/30 p-3 rounded-lg">
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-2 gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`h-6 w-12 rounded-lg cursor-pointer border-2 transition-transform hover:scale-105 color-item ${
              selectedColor === color
                ? "border-background-blue scale-105"
                : "border-background-blue/20"
            }`}
            style={{ background: color }}
            onClick={() => onSelectColor(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
