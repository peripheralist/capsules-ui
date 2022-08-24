export default function Modal({
  visible,
  onClose,
  children,
  centered,
  shaded,
}: {
  visible: boolean | undefined;
  onClose: VoidFunction;
  children?: JSX.Element | JSX.Element[];
  centered?: boolean;
  shaded?: boolean;
}) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: shaded ? "#000000aa" : undefined,
        overflow: "auto",
      }}
      onClick={onClose}
    >
      {centered ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : (
        <span onClick={(e) => e.stopPropagation()}>{children}</span>
      )}
    </div>
  );
}
