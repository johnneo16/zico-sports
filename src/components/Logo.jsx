import './Logo.css';

const LOGO_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAIAAAAErfB6AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAASUVORK5CYII=';

const LOGO_SRC = `data:image/png;base64,${LOGO_B64}`;

/**
 * Zico Sports logo component.
 * @param {{ size?: number }} props
 */
export default function Logo({ size = 48 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Zico Sports"
      className="zico-logo"
      style={{ height: size, width: size }}
    />
  );
}
