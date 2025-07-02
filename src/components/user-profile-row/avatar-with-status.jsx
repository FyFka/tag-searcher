import Image from "next/image";

export const AvatarWithStatus = ({ avatar, username, status = "online" }) => {
  return (
    <div className="h-8 w-8 relative">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="absolute contain-paint block pointer-events-none w-auto"
        aria-hidden="true"
      >
        <mask id=":r7:" width="32" height="32">
          <circle cx="16" cy="16" r="16" fill="#fff"></circle>
          <rect color="#000" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect>
        </mask>
        <foreignObject x="0" y="0" width="32" height="32" mask="url(#:r7:)">
          <div className="grid w-full h-full">
            <Image
              alt={`${username} avatar`}
              className="-indent-96 w-8 h-8 min-w-8 min-h-8 rounded-full"
              width={32}
              height={32}
              src={avatar}
              unoptimized
            />
          </div>
        </foreignObject>
        <g transform="scale(1) translate(14.5, 17)">
          {status === "online" && (
            <svg width="25" height="15" viewBox="0 0 25 15">
              <mask id=":rc:">
                <rect x="7.5" y="5" width="10" height="10" rx="5" ry="5" fill="#fff"></rect>
                <rect x="12.5" y="10" width="0" height="0" rx="0" ry="0" fill="#000"></rect>
                <polygon
                  points="-2.16506,-2.5 2.16506,0 -2.16506,2.5"
                  fill="#000"
                  transform="scale(0) translate(13.125 10)"
                  style={{ transformOrigin: "13.125px 10px" }}
                ></polygon>
                <circle fill="#000" cx="12.5" cy="10" r="0"></circle>
              </mask>
              <rect fill="#43a25a" width="25" height="15" mask="url(#:rc:)"></rect>
            </svg>
          )}
          {status === "idle" && (
            <svg width="25" height="15" viewBox="0 0 25 15">
              <mask id=":r8:">
                <rect x="7.5" y="5" width="10" height="10" rx="5" ry="5" fill="#fff"></rect>
                <rect x="6.25" y="3.75" width="7.5" height="7.5" rx="3.75" ry="3.75" fill="#000"></rect>
                <polygon
                  points="-2.16506,-2.5 2.16506,0 -2.16506,2.5"
                  fill="#000"
                  transform="scale(0) translate(13.125 10)"
                  style={{ transformOrigin: "13.125px 10px" }}
                ></polygon>
                <circle fill="#000" cx="12.5" cy="10" r="0"></circle>
              </mask>
              <rect fill="#ca9654" width="25" height="15" mask="url(#:r8:)"></rect>
            </svg>
          )}
          {status === "dnd" && (
            <svg width="25" height="15" viewBox="0 0 25 15">
              <mask id=":ra:">
                <rect x="7.5" y="5" width="10" height="10" rx="5" ry="5" fill="#fff"></rect>
                <rect x="8.75" y="8.75" width="7.5" height="2.5" rx="1.25" ry="1.25" fill="#000"></rect>
                <polygon
                  points="-2.16506,-2.5 2.16506,0 -2.16506,2.5"
                  fill="#000"
                  transform="scale(0) translate(13.125 10)"
                  style={{ transformOrigin: "13.125px 10px" }}
                ></polygon>
                <circle fill="#000" cx="12.5" cy="10" r="0"></circle>
              </mask>
              <rect fill="#d83a42" width="25" height="15" mask="url(#:ra:)"></rect>
            </svg>
          )}
        </g>
      </svg>
    </div>
  );
};
