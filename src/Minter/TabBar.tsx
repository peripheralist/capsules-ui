export type Tab = "color" | "text" | "mint";

export default function TabBar({
  selectedTab,
  disabledTabs,
  onClickTab,
  color,
}: {
  selectedTab: Tab;
  disabledTabs?: Tab[];
  onClickTab: (tab: Tab) => void;
  color: string | undefined;
}) {
  const Tab = (tab: Tab, i: number) => {
    const isSelected = selectedTab === tab;

    let text: string;
    switch (tab) {
      case "color":
        text = color ?? "COLOR";
        break;
      case "text":
        text = "TEXT";
        break;
      case "mint":
        text = "MINT";
        break;
    }

    let underline = "";
    for (let i = 0; i < text.length + 3; i++) {
      underline += "_";
    }

    const isDisabled = disabledTabs?.includes(tab);

    return (
      <div
        style={{
          position: "relative",
          fontWeight: isSelected ? "bold" : "normal",
          textTransform: "uppercase",
          color: tab === "color" ? color : undefined,
          paddingBottom: ".8rem",
          cursor: isDisabled ? "default" : "pointer",
          opacity: isDisabled ? 0.5 : 1,
        }}
        onClick={isDisabled ? undefined : () => onClickTab(tab)}
      >
        {i}. {text}
        {isSelected && (
          <div style={{ position: "absolute", bottom: 0 }}>{underline}</div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "inline-flex",
        fontSize: "1.2rem",
        gap: "2.4rem",
      }}
    >
      {Tab("color", 1)}
      {Tab("text", 2)}
      {Tab("mint", 3)}
    </div>
  );
}
