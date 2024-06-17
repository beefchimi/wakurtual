declare module '*.module.css' {
  // TODO: We shouldn't need this once `waku` properly
  // supports CSS modules. At the moment, this definition
  // is only loosely typed.
  const styles: Readonly<Record<string, string>>;
  export default styles;
}
