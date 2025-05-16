import Layout from "./style/layout.module.css";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={Layout.wrapper}>
      <div className={Layout.container}>{children}</div>
    </div>
  );
}
