import { PrimarySettings, LineMapping, PrimaryMapping } from '../codegenerator';

function RectWithStroke({
  x,
  y,
  width,
  height,
  strokeWidth,
  opacity,
  strokeOpacity,
  name,
  stroke = true,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  opacity?: number;
  strokeOpacity?: number;
  name?: string;
  stroke?: boolean;
}) {
  return (
    <g name={name}>
      {stroke ? (
        <g filter="url(#constantOpacity)">
          <g
            fill="black"
            opacity={strokeOpacity}
            // shapeRendering="crispEdges"
          >
            <rect
              x={x - strokeWidth}
              y={y - strokeWidth}
              width={strokeWidth}
              height={height + strokeWidth * 2}
              name="left"
            />
            <rect
              x={x + width}
              y={y - strokeWidth}
              width={strokeWidth}
              height={height + strokeWidth * 2}
              name="right"
            />
            <rect
              x={x}
              y={y - strokeWidth}
              height={strokeWidth}
              width={width}
              name="top"
            />
            <rect
              x={x}
              y={y + height}
              height={strokeWidth}
              width={width}
              name="bottom"
            />
          </g>
        </g>
      ) : null}
      <rect x={x} y={y} width={width} height={height} opacity={opacity} />
    </g>
  );
}

export default function CrosshairSVG({
  settings,
  crosshairColor,
  center_dot_offset,
  strokeWidth,
  inner_line_left_x,
  inner_line_right_x,
  inner_line_left_y,
  inner_line_right_y,
  inner_line_vertical_length,
  inner_line_horizontal_length,
  inner_line_top_y,
  inner_line_bottom_y,
  inner_line_horizontal_x,
  outer_line_left_x,
  outer_line_right_x,
  outer_line_left_y,
  outer_line_right_y,
  outer_line_vertical_length,
  outer_line_horizontal_length,
  outer_line_top_y,
  outer_line_bottom_y,
  outer_line_horizontal_x,
}: {
  settings: any;
  crosshairColor: string;
  center_dot_offset: number;
  strokeWidth: number;
  inner_line_left_x: number;
  inner_line_right_x: number;
  inner_line_left_y: number;
  inner_line_right_y: number;
  inner_line_vertical_length: number;
  inner_line_horizontal_length: number;
  inner_line_top_y: number;
  inner_line_bottom_y: number;
  inner_line_horizontal_x: number;
  outer_line_left_x: number;
  outer_line_right_x: number;
  outer_line_left_y: number;
  outer_line_right_y: number;
  outer_line_bottom_y: number;
  outer_line_vertical_length: number;
  outer_line_horizontal_length: number;
  outer_line_top_y: number;
  outer_line_horizontal_x: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      viewBox={'0 0 200 200'}
    >
      <filter id="constantOpacity2">
        <feComponentTransfer>
          <feFuncA
            type="table"
            tableValues={`0 ${settings[PrimaryMapping.OUTLINE_OPACITY]} ${
              settings[PrimaryMapping.OUTLINE_OPACITY]
            }`}
          />
        </feComponentTransfer>
      </filter>
      <g
        style={{ transform: 'translate(50%,50%)' }}
        stroke="black"
        strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
        strokeWidth={0}
        fill={crosshairColor}
        filter='url("#constantOpacity")'
      >
        {settings[PrimaryMapping.CENTER_DOT] ? (
          <RectWithStroke
            x={-center_dot_offset}
            y={-center_dot_offset}
            width={settings[PrimaryMapping.CENTER_DOT_THICKNESS]}
            height={settings[PrimaryMapping.CENTER_DOT_THICKNESS]}
            strokeWidth={strokeWidth}
            opacity={settings[PrimaryMapping.CENTER_DOT_OPACITY]}
            strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
            name="center-dot"
            stroke={settings[PrimaryMapping.OUTLINES]}
          />
        ) : null}
        {settings.inner_lines[LineMapping.SHOW] &&
        settings.inner_lines[LineMapping.THICKNESS] > 0 ? (
          <g name="inner-line">
            <g name="inner-line-vertical">
              <RectWithStroke
                x={inner_line_left_x}
                y={inner_line_left_y}
                width={inner_line_vertical_length}
                height={settings.inner_lines[LineMapping.THICKNESS]}
                strokeWidth={strokeWidth}
                opacity={settings.inner_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="inner-line-left"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
              <RectWithStroke
                x={inner_line_right_x}
                y={inner_line_right_y}
                width={inner_line_vertical_length}
                height={settings.inner_lines[LineMapping.THICKNESS]}
                strokeWidth={strokeWidth}
                opacity={settings.inner_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="inner-line-right"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
            </g>
            <g name="inner-line-horizontal">
              <RectWithStroke
                x={inner_line_horizontal_x}
                y={inner_line_top_y}
                width={settings.inner_lines[LineMapping.THICKNESS]}
                height={inner_line_horizontal_length}
                strokeWidth={strokeWidth}
                opacity={settings.inner_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="inner-line-top"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
              <RectWithStroke
                x={inner_line_horizontal_x}
                y={inner_line_bottom_y}
                width={settings.inner_lines[LineMapping.THICKNESS]}
                height={inner_line_horizontal_length}
                strokeWidth={strokeWidth}
                opacity={settings.inner_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="inner-line-bottom"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
            </g>
          </g>
        ) : null}

        {settings.outer_lines[LineMapping.SHOW] &&
        settings.outer_lines[LineMapping.THICKNESS] > 0 ? (
          <g name="outer-line">
            <g name="outer-line-vertical">
              <RectWithStroke
                x={outer_line_left_x}
                y={outer_line_left_y}
                width={outer_line_vertical_length}
                height={settings.outer_lines[LineMapping.THICKNESS]}
                strokeWidth={strokeWidth}
                opacity={settings.outer_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="outer-line-left"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
              <RectWithStroke
                x={outer_line_right_x}
                y={outer_line_right_y}
                width={outer_line_vertical_length}
                height={settings.outer_lines[LineMapping.THICKNESS]}
                strokeWidth={strokeWidth}
                opacity={settings.outer_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="outer-line-right"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
            </g>
            <g name="outer-line-horizontal">
              <RectWithStroke
                x={outer_line_horizontal_x}
                y={outer_line_top_y}
                width={settings.outer_lines[LineMapping.THICKNESS]}
                height={outer_line_horizontal_length}
                strokeWidth={strokeWidth}
                opacity={settings.outer_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="outer-line-top"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
              <RectWithStroke
                x={outer_line_horizontal_x}
                y={outer_line_bottom_y}
                width={settings.outer_lines[LineMapping.THICKNESS]}
                height={outer_line_horizontal_length}
                strokeWidth={strokeWidth}
                opacity={settings.outer_lines[LineMapping.OPACITY]}
                strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                name="outer-line-bottom"
                stroke={settings[PrimaryMapping.OUTLINES]}
              />
            </g>
          </g>
        ) : null}
      </g>
    </svg>
  );
}
