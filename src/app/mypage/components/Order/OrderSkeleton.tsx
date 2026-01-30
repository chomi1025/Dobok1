export default function OrderSkeleton() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "90px",
            background: "#eee",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
      ))}
    </div>
  );
}
