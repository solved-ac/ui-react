// eslint-disable-next-line react/no-typos
import 'react'

/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SvgrComponent
  extends React.FunctionComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

type CustomProp = { [key in `--${string}`]: string | undefined }
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CSSProperties extends CustomProp {}
}
