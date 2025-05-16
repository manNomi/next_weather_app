import Layout from "./style/layout.module.css";

const GlobalLayout = (props: GlobalLayoutProps) => {
  const { children } = props;
  return (
    <div className={Layout.wrapper}>
      <div className={Layout.container}>{children}</div>
    </div>
  );
};

export default GlobalLayout;
