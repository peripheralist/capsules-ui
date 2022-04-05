import Button from "../components/Button";

export type Tab<TabKey> = { key: TabKey; title?: string; color?: string };

export default function TabBar<Key extends string>({
  tabs,
  selectedTab,
  disabledTabs,
  onClickTab,
}: {
  tabs: Tab<Key>[];
  selectedTab: Key;
  disabledTabs?: Key[];
  onClickTab: (tab: Key) => void;
}) {
  const Tab = (tab: Tab<Key>) => {
    const isSelected = selectedTab === tab.key;
    const isDisabled = disabledTabs?.includes(tab.key);

    return (
      <Button
        key={tab.key}
        text={tab.title ?? tab.key}
        size="small"
        onClick={isDisabled ? undefined : () => onClickTab(tab.key)}
        underline={isSelected}
        isDisabled={isDisabled}
        style={{
          fontWeight: isSelected ? "bold" : "normal",
          textTransform: "uppercase",
          color: tab.color,
          paddingBottom: ".8rem",
          whiteSpace: "pre",
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "inline-flex",
        overflow: "auto",
        paddingLeft: 20,
        paddingRight: 20,
        gap: 20,
      }}
    >
      {tabs.map(Tab)}
    </div>
  );
}
